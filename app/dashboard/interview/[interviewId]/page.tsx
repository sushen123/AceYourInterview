"use client"

import { Button } from '@/components/ui/button'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

export default function Interview({params}: {params: any}) {
    const [interviewData, setInterviewData] =useState<interviewData>()
    const [webCamEnbaled, setWebCamEnabled] = useState(false) 

    useEffect(()=> {
       
        GetInterviewDetails()
    },[])


    const GetInterviewDetails = async() => {
        
        const response = await axios.get(`/api/mockId?mockId=${params.interviewId}`)
        
        setInterviewData(response.data.result)
    
    }


  return (
   <div className='my-10 flex justify-center flex-col items-center'>
    <h2 className='font-bold text-2xl'>Let's get started</h2>
    <div className='grid grid-cols-1 md:grid-cols-2'>
    <div className='flex flex-col my-5 items-center gap-5  '>
        <div className='flex flex-col my-5 gap-5 rounded-lg border'>
        <h2 className='text-lg'>
        <strong>    Job Role/ Job Position </strong>{interviewData?.jobPosition || "Full stack"}
        </h2>
        <h2 className='text-lg'>
        <strong> Job Description    </strong>{interviewData?.jobDescriptoin || "React"}
        </h2>
        <h2 className='text-lg'>
        <strong>    Year of Experience </strong>{interviewData?.jobExperience || "3"}
        </h2>
        </div>
        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
          <h2 className='flex gap-2 items-center text-yellow-500'> <Lightbulb /><span>Information</span> </h2>
            <h2 className='mt-3 text-yellow-500'>
                Enbale Video Web Cam and MicroPhone to Start your Ai Generated Mock Interview, It has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want
    
            </h2>
        </div>
    </div>
        <div className='flex flex-col my-5  gap-5'>
     {webCamEnbaled ?  <Webcam 
     onUserMedia={() => setWebCamEnabled(true) }
     onUserMediaError={() =>setWebCamEnabled(false) }
    mirrored={true}
     style={{
        height: 300,
        width: 300
     }} /> 
     : 
     <>
     <WebcamIcon className='h-full w-72 p-20  my-7 bg-secondary rounded-lg border' />
     <Button variant={'ghost'} className='w-full bg-slate-600' onClick={() => setWebCamEnabled(true)}>Enable Web Cam and MicroPhone</Button>
     </>
    }
    </div>
    </div>
    <div className='flex justify-end items-end'>
        <Link href={'/dashboard/interview/'+ params.interviewId + '/start'}>
        <Button>Start</Button>
        </Link>

    </div>
    
   

   </div>
  )
}


interface interviewData {
    jobPosition: string,
    jobDescriptoin: string,
    jobExperience: string


}