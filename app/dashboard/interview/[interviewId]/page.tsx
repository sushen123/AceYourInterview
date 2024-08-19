"use client"

import { Button } from '@/components/ui/button'

import axios from 'axios'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import React, { useCallback, useEffect, useState } from 'react'
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
   <div className='text-black w-full     flex flex-col justify-center  font-mono  bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] '>
      <div className='min-h-screen max-h-full'>

     
    <div className=' p-3   flex gap-2 items-center'>
    <Link href={'/dashboard'}>
    <div className='flex gap-2 items-center'>
    <Image src={'/logo.png'} width={40} height={40} alt='logo' />
        <h1 className='font-sans font-bold text-blue-500 text-xl '>AceYourInterview</h1>
    </div>  
     </Link>
    </div>
 
    <div className='flex flex-col  gap-5 items-center'>
    <h2 className='font-bold text-3xl mt-4  flex justify-center'>Check camera and mic</h2>
    <h3 className=' text-center sm:w-3/4'> Enable Video Web Cam and MicroPhone to Start your Ai Generated Mock Interview,
                 It has 15 question which you can answer and at  last you will get the report on the basis of your answer.</h3>
    <h4 className='text-center bg-yellow-100 text-yellow-500'> NOTE: We never record your video, Web cam access you can disable at any time if you want</h4>
    </div>
   
    <div className='grid grid-cols-1 md:grid-cols-2'>
            
        <div className='flex flex-col  my-7  rounded  items-center  gap-5'>
     {webCamEnbaled ? <>  <Webcam 
     onUserMedia={() => {
       setWebCamEnabled(true)
     }}
     onUserMediaError={() =>setWebCamEnabled(false) }
     videoConstraints={{width: 400, height:300}}
     audio={true}
     audioConstraints={{
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
     }}
    mirrored={true}
     style={{
        borderRadius: 15
     }} /> 
     
    </>
     : 
     <>
     <WebcamIcon className='h-full w-72 p-20   bg-secondary rounded-lg border' />
     
     </>
    }
    </div>
    <div className='flex flex-col text-xl justify-center items-center'>
        <h1 className='w-full text-center sm:text-left sm:w-2/3'>WebCam : <span className={`${webCamEnbaled ? "text-green-400": "text-red-500"}`}>{webCamEnbaled ? " Working": " Not Working"}</span></h1>
        <h1 className='w-full text-center sm:text-left sm:w-2/3 '>Mic : <span className={`${webCamEnbaled ? "text-green-400": "text-red-500"}`}>{webCamEnbaled ? " Working": "Not Working"}</span></h1>
        <div className='mt-5 w-2/3'>
        <AnimatedSubscribeButtonDemo setWebcamEnabled={setWebCamEnabled} />
        <div className='flex '>
        
        <Button className='bg-blue-400 mt-5 rounded-full' disabled={!webCamEnbaled}>
        <Link href={'/dashboard/interview/'+ params.interviewId + '/start'}>
          Start
         
          </Link>
        </Button>
        <div className='mt-8 sm:mt-6 ml-5'>
          {!webCamEnbaled && <div className='text-sm  sm:text-xl text-center '>Enabled Webcam to Start</div>}
        </div>
       
  

    </div>
        </div>    
    </div>
    </div>
   </div>
   </div>
  )
}


interface interviewData {
    jobPosition: string,
    jobDescriptoin: string,
    jobExperience: string


}

import { CheckIcon, ChevronRightIcon } from "lucide-react";

import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";

export function AnimatedSubscribeButtonDemo({setWebcamEnabled}) {
  return (
    <AnimatedSubscribeButton 
      buttonColor="#8fe57e"
      setWebCameEnabled={setWebcamEnabled}
      buttonTextColor="#ffffff"
      subscribeStatus={false}
      initialText={
        <span className="group inline-flex items-center">
          Enable WebCam and Mic {" "}
          <ChevronRightIcon className="ml-1 h-7 w-7 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      }
      changeText={
        <span className="group inline-flex items-center">
          <CheckIcon className="mr-2 h-4 w-4" />
          Enabled{" "}
        </span>
      }
    />
  );
}
