"use client"


import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { PrismaClient } from '@prisma/client'
import InterviewItemCard from './InterviewItemCard'
import { dbConnect } from '@/lib/db'
import axios from 'axios'

export default function InterviewList() {
    const {user} =useUser()
    const [interviewList, setInterviewList] = useState<any>([])

   


    useEffect(() => {
        user&& GetInterview()

    },[user])

   
    const GetInterview = async() => {
       
        const result = await axios.post('/api/interview',{
           user
        })
        console.log(result)
        setInterviewList(result)
    }
  return (
    <div className='font-medium text-xl'>
       <h2>Previous Interview</h2>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5'>
       {interviewList && interviewList.length > 0 ? (
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))
        ) : (
          <p>No interviews found.</p>
        )}
       </div>
    </div>
  )
}

