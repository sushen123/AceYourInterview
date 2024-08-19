"use client"


import axios from 'axios'
import { Lightbulb, Volume2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AudioVisualizer from "@tiagotrindade/audio-visualizer"
function QuestionSection({mockInterviewQuestion, activeQuestionIndex}: any) {

 
    const getAudio = async (text:string) => {
     
      try {
        const response = await axios.post('/api/getAudio', { text }, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const audioBlob = new Blob([response.data], { type: 'audio/wav' });
       console.log(response)
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.play();
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
      };

     if(mockInterviewQuestion) {
      useEffect(() => {
        getAudio(mockInterviewQuestion[activeQuestionIndex]?.question)
      },[activeQuestionIndex])
     }

  return mockInterviewQuestion&& (
    <div className='p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
            {mockInterviewQuestion.map((question, index) => (
                <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center
                    ${activeQuestionIndex==index ? "bg-red text-black border border-black": ""}`}> Question #{index+1} </h2>
            ))}
           
        </div>
        <h2 className='my-5 text-base md:text-lg text-black'>
                {mockInterviewQuestion[activeQuestionIndex]?.question}
              
               
            </h2>
            
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-5 items-center text-blue-700'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                
                <h2 className='text-sm text-primary my-2'>
                   Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare it 
                </h2>
            </div>
    </div>
  )
}

export default QuestionSection