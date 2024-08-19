"use client"

import React, { use, useEffect, useRef, useState } from 'react'
//@ts-ignore
import TypeWriterEffect from 'react-typewriter-effect';


interface ResultType {
  mockId: number,
  jsonMockResponse: string,
  jobPosition: string,
  jobDescription: string,
  jobExperience: string,
  createdBy: string,
  createdAt: Date,
}

type Message = {
  text: string;
  facialExpression: string;
  animation: string;
};

let text: Message[] = [];

import QuestionSection from './__components/QuestionSection'
import RecordAndSection from './__components/RecordAndSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'

import { Canvas } from '@react-three/fiber'
import {Experience} from '@/components/Experience'
import { Loader } from '@react-three/drei'

import { Progress } from "@/components/ui/progress"
import { useChat } from '@/hooks/useChat';
import { Leva } from 'leva';
import { toast } from 'sonner';
import { chatSession } from '@/lib/GeminiAi';



export default function StartInterview({params}: {params: any}) {
    const [interviewData, setInterviewData] = useState<ResultType | null>(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState<string[]| any>(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
    const [stop, setStop] = useState(false)
    const [startType, setType] = useState(false)
    const [questionNo, setQuestionNo] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null)
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
    const [userAnswer, setUserAnwer] = useState('')
    const [Loading, setLoading] = useState(false)

    const [progress, setProgress] = useState(6.6)

      const input = useRef(null);
      //@ts-ignore
      const { chat, loading, message, messages } = useChat();
      
      


     const sendMessage = () => {
  
      let text:any = [
        {
          text: mockInterviewQuestions[activeQuestionIndex].question,
          facialExpression: "smile",
          animation: "Talking_1",
          },
      ]

    

      if (!loading && !message) {
        chat(text);
        //@ts-ignore
       
      }
    };

   

    useEffect(() => {
      GetInterviewDetails()
     
 
    },[])

    const GetInterviewDetails = async() => {
        const response = await axios.get(`/api/mockId?mockId=${params.interviewId}`)

        const jsonResponse = await JSON.parse(response.data.result.jsonMockResponse)
    


        setMockInterviewQuestions(jsonResponse)
   
        setInterviewData(response.data.result)
        
    }

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
          const ws = new WebSocket(`wss://api.deepgram.com/v1/listen?model=nova-2&filler_words=true&numerals=true&smart_format=true&endpointing=3000`, ['token', token]);

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

    const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex]?.question},
    User Answer: ${userAnswer} , Depends on question and user answer for given interview question
    please give us rating for answer and feedback as area of improvement if any
    in just 3 to 5 lines to improve it in JSON format with rating field and feedback field
    `;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResponse = (await result.response.text()).replace('```json', '').replace('```', '');
    const JsonFeedbackResponse = JSON.parse(mockJsonResponse);

    const response = await axios.post('/api/userAnswer', {
        data: {
            mockId: interviewData?.mockId,
            question: mockInterviewQuestions[activeQuestionIndex].Question,
            correctAnswer: mockInterviewQuestions[activeQuestionIndex].Answer,
            userAnswer: userAnswer,
            feedback: JsonFeedbackResponse.feedback,
            rate: JsonFeedbackResponse.rating,
            userEmail: "sushensame@gmail.com" || "",
        }
    });

    if (response) {
        toast("User answer recorded successfully");
        setUserAnwer('');
    }

    setLoading(false)
};
   

useEffect(() => {
  if (!isRecording && userAnswer.length > 1) {
      UpdateUserAnswer();
  }
}, [userAnswer]);

   useEffect(() => {
    if(messages[0]) {
     console.log(messages[0].stop)
      setType(true)
     
    }
   
   },[messages, message])

   useEffect(() => {
    if(startType) {
      setTimeout(() => {
       setActiveQuestionIndex(activeQuestionIndex+1)
      
      },2000)
    }
   },[messages])

   useEffect(() => {
    console.log(activeQuestionIndex)
   })

   
  return (
    <div className='h-screen bg-white  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]'>
    <Loader />
    <Leva hidden />
      <Canvas shadows  camera={{ position: [0, 0, 2], fov: 15 }}>
        <Experience  />
      </Canvas>

      <div className='fixed top-5  w-screen'>
     <h1 className='text-black ml-10 text-3xl'> {`${questionNo}/15`}</h1>
      
      <Progress value={progress} className='ml-10 w-[80%] sm:w-[30%] md:w-[20%]' />
   
      </div>
      <div className='fixed h-screen flex items-center w-2/5 right-0  top-0  text-black'>
        <div className='mx-5'>
           {mockInterviewQuestions && startType &&  <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display' }, { color: "red"}}
            startDelay={1000}
            cursorColor="black"
          
            text={mockInterviewQuestions[activeQuestionIndex].question}
            typeSpeed={1}
            
            
          />
         
          }
        </div>
      </div>
        <div className='fixed bottom-3 left-1/2 transform -translate-x-1/2'>
        <div className="flex items-center w-30 justify-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          
          <button
            disabled={loading || message}
            onClick={() => {
              sendMessage()
              setProgress(progress+6.6)
              setType(false)
              setQuestionNo(questionNo+1)
            }}
            className={`bg-pink-500 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            {activeQuestionIndex== 0 ? "Start" : "Submit and Continue"}
          </button>
        </div>
        </div>
      <div className='fixed bottom-2  left-14 h-fit'>
    <RecordAndSection  
            mockInterviewQuestion={mockInterviewQuestions}
            activeQuestionIndex= {activeQuestionIndex}
            interviewData = {interviewData}
            /> 
            </div>
      
      
    <div className='hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10  '>
            {/* <QuestionSection mockInterviewQuestion={mockInterviewQuestions}
            activeQuestionIndex= {activeQuestionIndex} /> */}

           
           
        
        </div>
        <div className=' hidden justify-end gap-6 text-black'>
          { activeQuestionIndex > 0 &&  <Button onClick={() => {
            setActiveQuestionIndex(activeQuestionIndex-1)
          }}>
                Previous Question
            </Button> }
    {activeQuestionIndex!== (mockInterviewQuestions?.length || 0) -1 &&   <Button onClick={() => {
        setActiveQuestionIndex(activeQuestionIndex+1)
    }}>
                Next Question
            </Button>   }
            {  activeQuestionIndex!== (mockInterviewQuestions?.length || 0) -4 &&  
            <Link href={'/dashboard/interview/'+ interviewData?.mockId+ '/feedback'} >
              <Button >
                End Interview
            </Button> 
            </Link>
}
        </div>
    </div>
    </div>
  )
}



