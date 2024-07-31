"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { PrismaClient } from '@prisma/client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {  ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'


export default function FeedBack({params}) {

    const [feedbackList, setFeedbackList] = useState([])
    const router = useRouter()
    const GetFeedBack = async() => {
            const response = await axios.get(`/api/interview?interviewId=${params.interviewId}`)
              //  @ts-ignore
              console.log(response.data.result)
            setFeedbackList(response.data.result)
    }
 console.log(params.interviewId)

    useEffect(() => {
        GetFeedBack()
    },[])

    const averageRating = useMemo(() => {

      let sum = 0
      feedbackList.forEach((item) => {
        sum+= item.rating

      })
      
      return sum/5
    },[feedbackList])
  return (
    <div className='p-10'>
     

        {feedbackList.length==0?
        <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Recorded</h2>
        : <>  
      
        <h2 className='text-3xl font-bold text-green-500 '>Congrat</h2>
        <h2 className='font-bood text-2xl'>Here is your interview feedback</h2>
        <h2 className='text-blue-500 text-lg my-3'>Your overall interview rating: <strong>{averageRating}</strong></h2>

        <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for imporevement </h2>
        {feedbackList && feedbackList.map((item, index) => (
           <Collapsible key={index} className='mt-7'>
           <CollapsibleTrigger className='p-2 bg-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>{item.question}
           <ChevronsUpDown className='h-5 w-5' /> </CollapsibleTrigger>
           <CollapsibleContent>
             <div className='flex flex-col gap-3'>
                <h2 className='text-red-500 p-2 border rounder-lg'>
                    <strong>Rating: </strong>
                    {item.rating}
                </h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                    <strong>Your Answer: </strong>
                    {item.userAnswer}
                </h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                    <strong>Better Answer: </strong>
                    {item.correctAnswer}
                </h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                    <strong>FeedBack: </strong>
                    {item.feedback}
                </h2>

             </div>
           </CollapsibleContent>
         </Collapsible>
        ))}

           </>
        
        }
        <Button onClick={() => {
            router.replace('/dashboard')
        }}>Go Home</Button>
        </div>
  )
}
