

import { Button } from '@/components/ui/button'

import { useRouter } from 'next/router'
import React from 'react'

export default function InterviewItemCard({interview}) {

    const router = useRouter()

   
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-blue-500'>{interview?.jobPosition}</h2>
    <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
    <h2 className='text-xs text-gray-400'>Created At: {interview.createdAt}</h2>
    <div className='flex justify-between mt-2 gap-5'>
     
        <Button onClick={() => {
            router.push('/dashboard/interview/'+ interview.mockId+ "/feedback")
        }}  size="sm"  variant='outline'>FeedBack</Button>
    
        <Button onClick={() => {
           router.push('/dashboard/interview/'+ interview?.mockId )
        }} size="sm">Start</Button>
      
    </div>
    </div>
  )
}
