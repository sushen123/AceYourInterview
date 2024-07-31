"use client"

import React, { useEffect, useState } from 'react'


interface ResultType {
  mockId: number,
  jsonMockResponse: string,
  jobPosition: string,
  jobDescription: string,
  jobExperience: string,
  createdBy: string,
  createdAt: Date,
}

import QuestionSection from './__components/QuestionSection'
import RecordAndSection from './__components/RecordAndSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'

export default function StartInterview({params}: {params: any}) {
    const [interviewData, setInterviewData] = useState<ResultType | null>(null);
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState<string[] | null>(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {

        GetInterviewDetails();
    },[])

    const GetInterviewDetails = async() => {
        const response = await axios.get(`/api/mockId?mockId=${params.interviewId}`)

   
        const jsonResponse = await JSON.parse(response.data.result.jsonMockResponse)
    

        setMockInterviewQuestions(jsonResponse)

        setInterviewData(response.data.result)
        
    }

    useEffect(() => {
     
  }, [mockInterviewQuestions, interviewData]);
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <QuestionSection mockInterviewQuestion={mockInterviewQuestions}
            activeQuestionIndex= {activeQuestionIndex} />

            <RecordAndSection 
            mockInterviewQuestion={mockInterviewQuestions}
            activeQuestionIndex= {activeQuestionIndex}
            interviewData = {interviewData}
            />
        </div>
        <div className='flex justify-end gap-6'>
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
  )
}

