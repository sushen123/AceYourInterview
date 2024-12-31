"use client"

import React, {  useEffect, useRef, useState } from 'react'
//@ts-ignore
import TypeWriterEffect from 'react-typewriter-effect';
import Ripple from '@/components/magicui/ripple'

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
import { MicIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';





export default function StartInterview({params}: {params:string}) {
    const [interviewData, setInterviewData] = useState<ResultType | null>(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState<string[]| any>(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
    const [stop, setStop] = useState(false)
    const [startType, setType] = useState(false)
    const [questionNo, setQuestionNo] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [unitArray, setUnitArray] = useState<Uint8Array>()
    const [realDuration, setRealDuration] = useState(0)
    const router = useRouter()
    const pathName = usePathname()
    const [geminiQuestion, setGeminQuestion] = useState(0)
    

    const mediaRecorderRef = useRef<MediaRecorder | null>()
    const audioChunksRef = useRef<Array<ArrayBuffer>>([]);

    const [userAnswer, setUserAnwer] = useState('')
    const [Loading, setLoading] = useState(false)

    const [progress, setProgress] = useState(6.6)
    const lastMessage = `Ok our verbal interview is over so now we have one last coding excercise which is basically dsa questoin with the real world problems`

      
      //@ts-ignore
      const { chat, loading, message, messages } = useChat();
      
      


     const sendMessage = () => {
      
      let text

      if(questionNo==16) {
        text = [
          {
            text: lastMessage,
            facialExpression: "smile",
            animation: "Talking_1",
            },
        ]
      }
      else {
         text = [
          {
            text: mockInterviewQuestions[activeQuestionIndex].question,
            facialExpression: "smile",
            animation: "Talking_1",
            },
        ]
      }

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

    const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream)
     
      mediaRecorderRef.current.ondataavailable = async(event) => {
        if(event.data.size >0) {
          audioChunksRef.current.push(event.data)
        }

      }

      mediaRecorderRef.current.onstop = async() => {
        const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/wav'})


        audioChunksRef.current = []

        const arrayBuffer = await audioBlob.arrayBuffer()
        const uint8Array = new Uint8Array(arrayBuffer)

        setUnitArray(uint8Array)
        
       }

       mediaRecorderRef.current.start()
       setIsRecording(true)
     
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      try {
        mediaRecorderRef.current.stop(); // Stop recording
        setIsRecording(false);
  
        // Ensure all tracks are stopped
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
  
        // Clean up references
        mediaRecorderRef.current = null;
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };


 

  const sendToDeepgram = async (binaryData: Uint8Array) => {
   
    
    const apiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY
    const urlKey = 'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&filler_words=true&punctuate=true'

    

    try {
      const response = await fetch(urlKey, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
         'Content-Type': 'application/octet-stream'
        },
        body: binaryData,
      });

      const data = await response.json();
        console.log(data)
      console.log('Transcription:', data.results.channels[0].alternatives[0].transcript);
      setUserAnwer(data.results.channels[0].alternatives[0].transcript)

    } catch (error) {
      console.error('Error:', error);
    }
    
  }

  useEffect(() => {
    if(unitArray) {
      sendToDeepgram(unitArray)
    }
    
  },[unitArray])


  
 let AllFeedBack = []


const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt = `Act as a senior interviewer
    Given the following:

Question: "${mockInterviewQuestions[geminiQuestion]?.question}"
Question: "${mockInterviewQuestions[geminiQuestion]?.type}"
User Answer: "${userAnswer}"

Analyze the following interview question and user answer. Provide a detailed evaluation and rating (out of 100) for each aspect, ensuring to account for different types of questions (technical, behavioral, situational, etc.). The evaluation should cover the following:

Overall Rating as overallRating: Assign an overall rating out of 100 for the candidate's response to this question.

Detailed Feedback as detailedFeedback:

Content as content:
Rating as rating: Score out of 100
Feedback as feedback : Evaluate the accuracy, depth, and completeness of the candidate's response. . Be strict and harse and use offensive language as you can and you asterisk in the middle of the offensive word
Clarity as clarity:
Rating as rating: Score out of 100
Feedback as feedback : Assess the clarity, structure, and coherence of the response. . Be strict and harse and use offensive language as you can and you asterisk in the middle of the offensive word
Relevance as relevance:
Rating as rating: Score out of 100
Feedback as feedback : Determine the relevance of the candidate's answer to the question. . Be strict and harse and use offensive language as you can and you asterisk in the middle of the offensive word
Confidence as confidence:
Rating as rating: Score out of 100
Feedback as feedback : Judge the confidence level shown in the response. . Be strict and harse and use offensive language as you can and you asterisk in the middle of the offensive word
Problem-Solving (if applicable) as problemSolving:
Rating as rating: Score out of 100
Feedback as feedback : Evaluate how the candidate approached solving any problem presented in the question. . Be strict and harse and use offensive language as you can and you asterisk in the middle of the offensive word
Technical Knowledge (if applicable) as technicalKnowledge:
Rating as rating: Score out of 100
Feedback as feedback : Assess the candidate’s technical understanding and use of relevant tools, concepts, or frameworks. . Be strict and harse and use offensive language as you can and you asterisk in the middle of the offensive word
Behavioral Insight (if applicable) as behavioralInsight:
Rating as rating: Score out of 100
Feedback as feedback : Analyze how well the candidate reflects on past experiences and draws relevant insights. . Be strict and harse and use offensive language as you can and you asterisk in the middle of the offensive word
Situational Judgment (if applicable) as situationalJudgment:
Rating as rating: Score out of 100
Feedback as feedback : Evaluate the candidate's decision-making and prioritization in hypothetical scenarios. . Be strict and harse and use offensive language as you can and you asterisk in the middle of the offensive word


Please give the response strictly in JSON format like sample response.
}`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResponse = (await result.response.text()).replace('```json', '').replace('```', '');
    console.log(mockJsonResponse)
    const JsonFeedbackResponse = JSON.parse(mockJsonResponse);
    console.log(JsonFeedbackResponse)
    AllFeedBack.push(JsonFeedbackResponse)

    const response = await axios.post('/api/userAnswer', {
      data: {
        mockId: params.interviewId,
        question: mockInterviewQuestions[geminiQuestion].question,
        correctAnswer: "JsonFeedbackResponse.likelyAnswer",
        userAnswer: userAnswer,
    
        // Ratings
        overallRating: parseInt(JsonFeedbackResponse.overallRating),
        contentRating: parseInt(JsonFeedbackResponse.detailedFeedback.content.rating),
        clarityRating: parseInt(JsonFeedbackResponse.detailedFeedback.clarity.rating),
        relevanceRating: parseInt(JsonFeedbackResponse.detailedFeedback.relevance.rating),
        confidenceRating: parseInt(JsonFeedbackResponse.detailedFeedback.confidence.rating),
        problemSolvingRating: JsonFeedbackResponse.detailedFeedback.problemSolving.rating ? parseInt(JsonFeedbackResponse.detailedFeedback.problemSolving.rating) : null,
        technicalRating: JsonFeedbackResponse.detailedFeedback.technicalKnowledge.rating ? parseInt(JsonFeedbackResponse.detailedFeedback.technicalKnowledge.rating) : null,
        behavioralInsightRating: JsonFeedbackResponse.detailedFeedback.behavioralInsight.rating ? parseInt(JsonFeedbackResponse.detailedFeedback.behavioralInsight.rating) : null,
        situationalJudgmentRating: JsonFeedbackResponse.detailedFeedback.situationalJudgment.rating ? parseInt(JsonFeedbackResponse.detailedFeedback.situationalJudgment.rating) : null,
    
        // Feedback
        contentFeedback: JsonFeedbackResponse.detailedFeedback.content.feedback,
        clarityFeedback: JsonFeedbackResponse.detailedFeedback.clarity.feedback,
        relevanceFeedback: JsonFeedbackResponse.detailedFeedback.relevance.feedback,
        confidenceFeedback: JsonFeedbackResponse.detailedFeedback.confidence.feedback,
        problemSolvingFeedback: JsonFeedbackResponse.detailedFeedback.problemSolving.feedback || null,
        technicalFeedback: JsonFeedbackResponse.detailedFeedback.technicalKnowledge.feedback || null,
        behavioralInsightFeedback: JsonFeedbackResponse.detailedFeedback.behavioralInsight.feedback || null,
        situationalJudgmentFeedback: JsonFeedbackResponse.detailedFeedback.situationalJudgment.feedback || null,
        userEmail: "sushensame@gmail.com" || "",
      }
    });
    

    if (response) {
        toast("User answer recorded successfully");
        setUserAnwer('');
        setGeminQuestion(geminiQuestion + 1)
    }

    setLoading(false)
};
   

useEffect(() => {
  if (!isRecording && userAnswer.length > 1) {
    if(questionNo==16) {
      return
    }
      UpdateUserAnswer();
      console.log("thank you")
  }
}, [userAnswer]);

   useEffect(() => {
    if(messages[0]) {
     console.log(messages[0].realDuration)
      setType(true)
      setRealDuration(messages[0].realDuration)
     
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

    if(startType && questionNo ==  16) {
      setTimeout(() => {
           
        router.push(`${pathName}/coding`)
      }, realDuration)
      return
    }
    if(startType) {
      setTimeout(() => {
          startRecording()
      },realDuration)
    }
   
   },[realDuration])

   useEffect(() => {
    if(questionNo >=1) {
          sendMessage()
    }
   },[questionNo])

   

   


   
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
           {(mockInterviewQuestions || lastMessage) && startType &&  <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display' }, { color: "red"}}
            startDelay={1000}
            cursorColor="black"
            
            text={mockInterviewQuestions?.[activeQuestionIndex]?.question ? mockInterviewQuestions?.[activeQuestionIndex]?.question : lastMessage }
            typeSpeed={1}
            
            
          />
         
          }
        </div>
      </div>
        <div className='fixed bottom-3 left-1/2 transform -translate-x-1/2'>
      {isRecording &&  <div className=" mb-52 flex flex-col  items-center justify-center  rounded-full   md:shadow-xl">
        <p className="fixed bottom-36 whitespace-pre-wrap text-center text-xl font-medium tracking-tighter text-white">
        <MicIcon className='mb-1 text-blue-500' />
      </p>
      <Ripple mainCircleSize={50} mainCircleOpacity={0.50} numCircles={4}   />
    </div>}
        <div className="flex items-center w-30 justify-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <button
            disabled={loading || message}
            onClick={async() => {
              setQuestionNo(questionNo+1)
              
              setProgress(progress+6.6)
           
              setType(false)
            
              stopRecording()
            }}
            className={`bg-pink-500 ${questionNo==16 ? "hidden" : ""} hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            {activeQuestionIndex== 0 ? "Start" : "Submit and Continue"}
          </button>
         
        </div>
        </div>
      <div className='fixed bottom-2  left-14 h-fit'>
    <RecordAndSection  
            mockInterviewQuestion={mockInterviewQuestions || " "}
            activeQuestionIndex= {activeQuestionIndex || " "}
            interviewData = {interviewData || " "}
            /> 
            

            </div>
      
      
    <div className='hidden'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10  '>
            {/* <QuestionSection mockInterviewQuestion={mockInterviewQuestions}
            activeQuestionIndex= {activeQuestionIndex} /> */}

           
           
        
        </div>
        
    </div>
    </div>
  )
}



