"use client"
import { Experience } from "@/components/Experience";
import { useChat } from "@/hooks/useChat";
import { chatSession } from "@/lib/GeminiAi";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Editor from '@monaco-editor/react';
import {LanguageSelector} from './components/LanguageSelector'
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "./components/constant";
import {executeCode} from './api'
import { PlayIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home({params}) {
    const avatarMessage = "Here is your last coding problem. It’s designed to challenge your skills and showcase your problem-solving approach. Analyze the problem carefully and provide an optimal solution"

     const [problemDescription, setDescription] = useState('')
     const [examples, setExamples] = useState([])
     const [requirements, setRequirmenets] = useState()
     const [value, setValue]= useState('')
     const editorRef = useRef()
     const [language, setLanguages] = useState('javascript')
     const [output, setOutput] = useState(null)
     const router = useRouter()
      //@ts-ignore
      const { chat, loading, message } = useChat();

      const onMount = (editor) => {
        editorRef.current = editor
        editor.focus()
      }




     const sendMessage = () => {
  
      let text:any = [
        {
          text: avatarMessage,
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
        sendMessage()
        sendtoGemini()
        console.log("hello")
    },[])

    const submitCode = async () => {
      const sourceCode = editorRef.current.getValue();
      if (!sourceCode) return;
  
     
  
      try {

        const feedbackPrompt = `
You are an expert code reviewer. Please evaluate the following code submission based on the problem description and requirements. Your review should be provided in JSON format, explicitly addressing how well the code meets each requirement listed.

Problem Description: ${problemDescription}

Requirements:
1. Time Complexity: ${requirements?.timeComplexity}
2. Space Complexity: ${requirements?.spaceComplexity}
3. Handle edge cases such as ${requirements?.edgeCases}

userCode: ${sourceCode || "No code provided"}
Language: ${language}

In your review, specifically address the following in the JSON response :

1. **Correctness**: Whether the code correctly implements the solution as described in the problem statement.
2. **Time Complexity**: How well the code adheres to the specified time complexity.
3. **Space Complexity**: How well the code adheres to the specified space complexity.
4. **Edge Cases**: The handling of edge cases mentioned in the requirements.
5. **Deviations**: Any deviations from the given requirements and how they affect the solution.

If no code is provided or if the code is incomplete, mention this and give a rating of 0.

Please provide the feedback and rating in the following JSON format:


{
    "rating": 0, // Rating out of 100 
    "feedback": {
      "correctness": "",
      "timeComplexity": "",
      "spaceComplexity": "",
      "edgeCases": "",
      "deviations": ""
    }
}
`;
          // Sending the data to the Gemini API
          const response = await chatSession.sendMessage(feedbackPrompt);
  
          // Processing the response from the Gemini API
          const feedback = await response.response.text();
          const feedbackJson = JSON.parse(feedback.replace('```json', '').replace('```', ''));
          
          // Extracting rating and feedback from the response
          const rating = feedbackJson.rating;
          const feedbackMessage = feedbackJson.feedback;
  
          // Displaying the feedback and rating
          
          console.log(rating)
          console.log(feedbackMessage)
          console.log(params.interviewId)
          const lastResponse = await axios.post('/api/coding', {
            data: {
                mockId: params.interviewId,
                question: problemDescription,
                sourceCode: sourceCode,
                correctness: feedbackMessage.correctness,
                deviations: feedbackMessage.deviations,
                edgeCases: feedbackMessage.edgeCases,
                timeComplexity: feedbackMessage.timeComplexity,
                spaceComplexity: feedbackMessage.spaceComplexity,
                rate: rating,
                userEmail: "sushensame@gmail.com" || "",
            }
        });

        if (lastResponse) {
            toast("User answer recorded successfully");
            router.push(`/dashboard/interview/${params.interviewId}/result`)
        }
      } catch (error) {
          console.error("Error submitting code:", error);
          toast("Error")
        
      }
  };
  


   async function sendtoGemini() {
    const feedbackPrompt = `You are a software engineering interviewer creating a coding exercise for a candidate. Based on the candidate's experience level, generate a data structure and algorithms (DSA) question that is related to real-life scenarios. The generated response should be in JSON format and include the following keys:

problemDescription: A detailed explanation of a real-life problem that the candidate needs to solve, relevant to their experience level, involving data structures and algorithms.

examples: An array of two examples that demonstrate how the problem should be solved. Each example should include:

input: A string representing the list of values or conditions for the example.
output: The expected result.
explanation: A brief description of how the result is derived from the input.
requirements: An object listing specific requirements or constraints for the problem, including:

dataStructure: The appropriate data structure(s) to use.
timeComplexity: Any constraints on time complexity.
spaceComplexity: Any constraints on space complexity.
edgeCases: Considerations for edge cases, such as empty lists or very large inputs.
The JSON response should be concise, suitable for the candidate's experience level, and provide clear guidance on what is expected in the solution.
`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    console.log(result.response.text())
    const mockJsonResponse = (await result.response.text()).replace('```json', '').replace('```', '');
    const JsonFeedbackResponse = JSON.parse(mockJsonResponse);
    setDescription(JsonFeedbackResponse.problemDescription)
    setExamples(JsonFeedbackResponse.examples)
    setRequirmenets(JsonFeedbackResponse.requirements)
    console.log(JsonFeedbackResponse.examples)
    console.log(JsonFeedbackResponse.problemDescription)
    console.log(JsonFeedbackResponse.requirements)
    console.log(JsonFeedbackResponse)}



 

  
   

   const runCode = async() => {
    const sourceCode = editorRef.current.getValue()
    if(!sourceCode) return;
    try {
      const {run: result} = await executeCode(language, sourceCode)
      setOutput(result.output)
    } catch (error) {
      
    }
   }


    return <div className="grid grid-cols-10 h-screen w-screen  ">
        <div className=" col-span-3 overflow-y-auto h-full scrollbar-gradient px-2 py-5 bg-blue-200  ">
         <h1>Coding exercise</h1>
         <h1 className="font-bold font-sans  ">Problem Description</h1>
         <p className="font-sans text-sm">{problemDescription}</p>
         <div className="">
                <div className="flex flex-col gap-3 mt-5">
                    <h1 className="font-bold text-xl">Example 1</h1>
                    <div>
                    <h1 className="font-bold">Explanation:</h1>
                    <h3 className="font-sans font-normal text-sm"> {examples[0]?.explanation} </h3>
                    </div>
                    <div>
                    <h1 className="font-bold">Input:</h1>
                    <h3 className="font-sans font-normal text-sm"> {examples[0]?.input} </h3>
                    </div>
                    <div>
                        <h1 className="font-bold">Output:</h1>
                    <h3 className="font-sans font-normal text-sm"> {examples[0]?.output}</h3>
                    </div>
                    <h1 className="font-bold text-xl">Example 1</h1>
                    <div>
                    <h1 className="font-bold">Explanation:</h1>
                    <h3 className="font-sans font-normal text-sm"> {examples[1]?.explanation} </h3>
                    </div>
                    <div>
                    <h1 className="font-bold">Input:</h1>
                    <h3 className="font-sans font-normal text-sm"> {examples[1]?.input} </h3>
                    </div>
                    <div>
                        <h1 className="font-bold">Output:</h1>
                    <h3 className="font-sans font-normal text-sm"> {examples[1]?.output}</h3>
                    </div>
                </div>
                <div className="mt-3">
                    <h1 className="font-sans font-bold ">Requirements:</h1>
                   <ul className="text-sm">
                
                    <li>1. {requirements?.edgeCases}</li>
                    <li>2. Space Complexity: {requirements?.spaceComplexity}</li>
                    <li>3. Time Complexity: {requirements?.timeComplexity}</li>
                  
                   </ul>
                </div>
         </div>
        </div>
        <div className="  col-span-7  bg-slate-900">
          <div className="row-span-4">
          <LanguageSelector  language={language} onSelect={setLanguages} setValues={setValue} />
        <Editor height={'58vh'}
        defaultLanguage="javascript" 
        theme="vs-dark"
        
        defaultValue="// Write you code here" 
        value={value}
        onMount={onMount}
        language={language}
        className="mt-2 "
        onChange={(value) => {
            setValue(value|| "")
        }}

        />
        <div  style={{
          height: '35vh',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap'
        }} className="scrollbar-gradients border-t-0 border-white bg-stone-900">
          <h1 className="font-sans text-stone-600 text-sm font-light ml-5">Output:</h1>
          <h1 className="ml-5 mt-2 w-30 text-slate-400 font-sans font-normal text-sm ">
            {output ? output: 'Click  "Run" to see the output here' }
          </h1>
          <div className="fixed right-40 flex gap-2  bottom-2">
          <Button onClick={runCode} className="text-black rounded-lg px-5   bg-green-500 hover:bg-green-300   ">
            <PlayIcon className="h-5" />
            <h1 className="font-sans ml-1">Run</h1>
          </Button>
          <Button onClick={() => {
            submitCode()
          }} className="bg-blue-400 hover:bg-blue-300 rounded-lg px-5 ">
            Submit
          </Button>
          </div>
        </div>
        </div>
      

        </div>
        <div className="fixed bottom-5 right-5">
        <Webcam mirrored={true} videoConstraints={{width: 150, height:150}} style={{    
                    borderRadius: 500
                }} />
        </div>
        <div className="fixed right-5 top-5 h-32 w-32  rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
        <Leva hidden />
      <Canvas shadows className="rounded-full pt-5"  camera={{ position: [0, 0, 2], fov: 15 }}>
        <Experience  />
      </Canvas>  
        </div>
    </div>
}
