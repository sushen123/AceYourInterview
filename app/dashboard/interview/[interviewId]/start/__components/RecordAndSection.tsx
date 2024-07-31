"use client"

import { FileBadge, Mic2, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { chatSession } from '@/lib/GeminiAi';
import { useUser } from '@clerk/nextjs'
import axios from 'axios'

export default function RecordAndSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnwer] = useState('')
    const { user } = useUser()
    const [loading, setLoading] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)


        const getMedia = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log(stream)
            const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            setMediaRecorder(recorder);
        };


    const startRecording = () => {
      getMedia()
        if (mediaRecorder) {
            const token:string = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || ""
            const headers:any = {
              Authorization: `Token ${token}`
            }
            const ws = new WebSocket(`wss://api.deepgram.com/v1/listen?model=nova-2&filler_words=true&numerals=true&smart_format=true&endpointing=500`, ['token', token]);

            ws.onopen = () => {
                console.log('Connected to Deepgram WebSocket');
                mediaRecorder.start(250);
                mediaRecorder.ondataavailable = async (event) => {
                    if (event.data.size > 0) {
                        const audioData = await event.data.arrayBuffer();
                        ws.send(audioData);
                    }
                };
            };

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                console.log('Transcript received:', message); // Log the received message
                if (message.channel && message.channel.alternatives[0]) {
                    const transcript = message.channel.alternatives[0].transcript;
                    setUserAnwer(prevAnswer => prevAnswer + transcript);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
            };

            setWebSocket(ws);
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
        if (webSocket) {
            webSocket.send(JSON.stringify({ type: 'CloseStream' }));
            webSocket.close();
        }
    };

    const StartStopRecording = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const UpdateUserAnswer = async () => {
        console.log(userAnswer);
        setLoading(true);

        const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question},
        User Answer: ${userAnswer} , Depends on question and user answer for given interview question
        please give us rating for answer and feedback as area of improvement if any
        in just 3 to 5 lines to improve it in JSON format with rating field and feedback field
        `;

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResponse = (await result.response.text()).replace('```json', '').replace('```', '');
        const JsonFeedbackResponse = JSON.parse(mockJsonResponse);

        const response = await axios.post('/api/userAnswer', {
            data: {
                mockId: interviewData.mockId,
                question: mockInterviewQuestion[activeQuestionIndex].Question,
                correctAnswer: mockInterviewQuestion[activeQuestionIndex].Answer,
                userAnswer: userAnswer,
                feedback: JsonFeedbackResponse.feedback,
                rate: JsonFeedbackResponse.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress || "",
            }
        });

        if (response) {
            toast("User answer recorded successfully");
            setUserAnwer('');
        }

        setLoading(false);
    };

    useEffect(() => {
        if (!isRecording && userAnswer.length > 1) {
            UpdateUserAnswer();
        }
    }, [userAnswer]);

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col justify-center my-20 items-center bg-black rounded-lg'>
                <Webcam mirrored={true} style={{
                    height: 300,
                    width: '100%',
                    zIndex: 10
                }} />
            </div>
            <Button disabled={loading} onClick={StartStopRecording} variant={'outline'} className='my-10'>
                {isRecording ?
                    <h2 className='text-red-600 flex gap-2'>
                        <Mic2 />Stop Recording...
                    </h2> :
                    <>
                        Record Answer
                    </>
                }
            </Button>
        </div>
    );
}
