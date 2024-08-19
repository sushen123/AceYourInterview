

"use client";
import React, { useEffect, useState  } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../__components/sidebar";
import {
  IconSettings,
} from "@tabler/icons-react";



import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import Link from "next/link";


import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Loader2Icon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";


import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input";
import { chatSession } from "@/lib/GeminiAi";
import axios from "axios";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea";
import { headers } from "next/headers";
import FileUpload from "../__components/file-upoad";





export default function Home() {


  const links = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5  text-black dark:text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
  
      ),
    },
    {
      label: "Interview",
      href: "/dashboard/mockinterview",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
      
      ),
    },
   
    {
      label: "Resume AI",
      href: "/dashboard/resume",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-black dark:text-white ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
      
      ),
    },
    {
      label: "Cover Letter AI",
      href: "/dashboard/coverletter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

      ),
    },
    {
      label: "Resources",
      href: "/dashboard/resources",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
      

      ),
    },
    {
      label: "AutoApplyJob AI",
      href: "/dashboard/autoapply",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
      

      ),
    },
   
    {
      label: "Setting",
      href: "/dashboard/setting",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[]" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen}  >
        <SidebarBody className="justify-between gap-5  ">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className="" />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Sushen Oli",
                href: "#",
                icon: (
                  <Image
                    src="/logo.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>

        </SidebarBody>
      </Sidebar>
      <Dashboard  />
   
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="" />
      <Image
                    src="/logo.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-blue-400 whitespace-pre"
      >
        Ace Your Interview
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
                 src="/logo.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
    </Link>
  );
};


const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const {setTheme} = useTheme()
  const [isGenerating, setGenerating] = useState(false)
  const [themeCondition, setThemeCondition] = useState(false)
  const [interviewState, setInterviewState] = useState("ai")
  const [jobPosition, setJobPosition] = useState<string | null>() 
  const [jobDescription, setJobDescription] = useState<string | null>()
  const [jobExperience, setJobExperience] = useState<string | null>()
  const [jobInterviewType, setInterviewType] = useState("")
  const [jsonResponse, setJsonResponse] = useState([])
  const [resume, setResume] = useState<File | null>()
  const router = useRouter()
  const [index, setIndex] = useState(0)

 

  useEffect(() => {
    console.log(resume)
  },[resume])

 useEffect(() => {
  if(jobInterviewType != "others") {
    setJobPosition(jobInterviewType)
}
  console.log(jobPosition)
 },[jobInterviewType]) 

  const handleSubmit = async(e: any) => {
    e.preventDefault()
 
      setLoading(true)
    console.log(jobPosition, jobDescription, jobExperience)
    console.log(resume)
   
    try {
     
      const formData = new FormData()
   

     const InputPrompt = ` Act as an experienced interviewer named Sushen Oli , specializing in conducting real mock interviews. Based on the input prompt, generate a set of interview questions.

              - Job Position: ${jobPosition}
              - Job Description: ${jobDescription}
              - Experience Level: ${jobExperience}
              - Resume Parse Text: ${resume}

              Instructions:
              1. Extract the candidate's name from the resume provided.
              2. Address the interviewee by their name in your questions to create a personalized experience.
              3. Use natural conversational fillers like "um," "so," "well," and phrases like "okay," "I see," and "let's move on to the next question" to make the questions sound more human and less mechanical.
              4. Begin with introductory questions about the interviewee's background and experiences to build rapport and ease them into the interview.
              5. Progressively delve deeper into the candidate's technical skills, relevant experiences, and their alignment with the job position.
              6. Include a variety of question types, such as: 
                a. Situational Questions: 3 questions presenting hypothetical work-related scenarios.
                b.  Behavioral Questions: 3 questions prompting the candidate to discuss past experiences and how they handled various situations.
                c.  Technical Questions: 9 questions assessing the candidate's specific knowledge and skills related to the job and relevant programming languages concept, libraries, and frameworks.
              7.  Integrate personal touches to the questions, including:
                a.  Introducing yourself as Sushen Oli and worked at company AceYourInterview, and briefly sharing your role and experience.
                b.  Using conversational fillers naturally throughout the questions.
                c.  Ensuring questions are specific to the job position and the technologies mentioned in the resume. 
              8. In the generated questions, convert specific acronyms or words to lowercase to ensure proper pronunciation by text-to-speech software, such as "mern" instead of "MERN".
              9. Add three dots “…” to create longer pauses where appropriate. 
              10. Use filler words “um” and “uh” naturally throughout the questions.
              11. Keep sentences shorter to improve pronunciation.
              12. Return the 15 questions in JSON format with the field "question". Ensure the questions are phrased in a way that reflects natural human speech patterns, with appropriate use of filler words, pauses, and occasional light humor.
              13. Add light humor or friendly remarks sparingly to make the interview feel engaging and realistic. Avoid overusing jokes; keep the tone professional but approachable.`;
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '');
        console.log(MockJsonResponse)
      setJsonResponse(MockJsonResponse);


      const response = await axios.post(`/api/createInterview`, {
        jsonMockResponse: MockJsonResponse,
        jobPosition,
        jobExperience,
        jobDescription,
        createdBy: "sushensame@gmail.com"
      })


      if (response.status === 200) {
      
        const mockId = response.data.mockId;
        router.push(`/dashboard/interview/${mockId}`);
      }

    } catch (error) {
      console.error("Error generating interview questions:", error);
    } finally {
      setLoading(false)
    }
  } 

  return (
    <div className="w-screen  ">
      <div className="text-black dark:text-white  hidden md:flex  justify-end h-10  ">
      <Button  className="flex" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-black dark:text-white mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          </Button>
          <Button  size="icon" className="mr-5" onClick={() => {
                    if(themeCondition) {
              setTheme("light")
              setThemeCondition(false)
            } else {
              setTheme("dark")
              setThemeCondition(true)
            }
    }}>
      {!themeCondition ? (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black dark:text-white">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
       </svg>
       
      ) : (
        <MoonIcon className=" text-white darkrotate-90 h-6 w-6 " />
      )}
      </Button>

      </div>
      <div className=" bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] grid grid-row-12  text-black dark:text-white  bg-white dark:bg-neutral-900  rounded-s-3xl">
        <div className="bg-slate-200 h-10 flex  items-center dark:bg-neutral-600 w-96 rounded-ee-3xl rounded-tl-3xl row-span-1">
            <Link href={'/dashboard/mockinterview'} className="p-0" onClick={() => {
                setInterviewState("ai")
  
            }}>
            <div className={`pt-1 ${interviewState == "ai" ? "bg-white dark:bg-gray-400": ""}  w-44 text-center rounded-xl  rounded-tl-3xl  h-8`}>
             <h1>AI Interview</h1>   
            </div>
            </Link>
            <Link href={'/dashboard/mockinterview/peerInterview'} className="p-0" onClick={() => {
                setInterviewState("peer")
            
            }}>
            <div className={`pt-1 ${interviewState == "peer" ? "bg-white dark:bg-gray-400": ""}  w-44 text-center rounded-xl  rounded-ee-3xl  h-8  `}>
                  <h1>Peer to Peer Interview</h1>
            </div>
            </Link>
            
        </div>
        <div className="row-span-11 ml-5 ">
          
         
            
            <Sheet>
              <SheetTrigger onClick={() => setIndex(0)} className="w-full sm:w-64 mr-10">
              
          <div  className="mt-5 flex flex-col items-center justify-center shadow-md rounded-2xl  h-32 top-0 z-[-2]  bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] dark:bg-neutral-900 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]  ">
          <div className=" bg-blue-500 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </div>
                <div>
                <h1 className="text-slate-500 dark:text-white">Create an interview</h1>
                </div>
          </div>

          </SheetTrigger>
          <SheetContent className="bg-white text-black dark:bg-black dark:text-white ">
            <SheetHeader>
              <SheetTitle>
                Fill the form
              </SheetTitle>
              <SheetDescription className="text-left ">
              <form onSubmit={handleSubmit}>
                
              <div>
                <h2>Add Details about your job position/role, Job description and years of exprience</h2>

               {index==0 && <div className="mt-7 my-3">
                <Select onValueChange={(value) => {
                  setInterviewType(value)
                }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Interview Type" />
            </SelectTrigger>
            <SelectContent className="text-black dark:text-white">
              <SelectGroup>
                <SelectLabel></SelectLabel>
                <SelectItem value="software engineer verbal interview">Software Engineer Verbal interview Only</SelectItem>
                <SelectItem value="software engineer full interview">Software Engineer Full interview</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> 
          {jobInterviewType === "others" && 
          <div>
           <h1 className="mt-5 font-bold">Job Role</h1>
           <Input onChange={(e) => {
            setJobPosition(e.target.value)
           }} />
            </div>}
          <div className="text-right mt-36">
          <Button onClick={() => {
            setIndex(index+1)
          }} className="">
                    Next
                   </Button>
            </div>     
                  
                </div>}

           { index==1 &&  <div  className="my-3">
                  <label >Job Description/ Tech Stack(in short)</label>
                <Textarea onChange={(e) => {
                    setJobDescription(e.target.value)
                }}  className="rounded-md" placeholder="Ex. React, Angular, Nodejs" />
                 <div className="text-right mt-36">
          <Button onClick={() => {
            setIndex(index+1)
          }} className="">
                    Next
                   </Button>
            </div>  
              </div>
              
              }
           { index==2 &&  <div className="mt-5 flex flex-col gap-5">
                <label htmlFor="" className="">Upload your resume</label>
              <FileUpload setResume={setResume} />
              <div className="text-right mt-36">
          <Button onClick={() => {
            setIndex(index+1)
          }} className="">
                    Next
                   </Button>
            </div> 
              </div>}
              
            {index==3 &&  <div className="my-3">
                <label htmlFor="">Expereince Level</label>
              <Select onValueChange={(value) => {
                setJobExperience(value)
                
              }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent className="text-black dark:text-white">
            <SelectGroup>
              <SelectLabel>Level</SelectLabel>
              <SelectItem value="Entry level">Entry Level</SelectItem>
              <SelectItem value="Intermediate level">Intermediate</SelectItem>
              <SelectItem value="senior level">Senior</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

                  <div className="flex gap-5 justify-end">
              
              <Button type="submit" className="bg-blue-500 rounded-lg hover:bg-blue-400" disabled={loading}>
                  {loading ?
                  <>
                  <Loader2 className="animate-spin" />Generating</>: 'Start Interview'
              }
                  </Button>

          </div>
                
              </div>}
            </div>
       
        </form>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
          </Sheet>
         
          
    
              <div className="pt-5 flex flex-col">
              <h1 className=" text-xl text-slate-500 dark:text-white">
                Past Interviews
              </h1>
              <div className="flex gap-5 flex-wrap mb-5  ">
                
                <PastInterviews />
                <PastInterviews />
                <PastInterviews />
                <PastInterviews />
                <PastInterviews />
                <PastInterviews /> 
                <PastInterviews />
                <PastInterviews />   
              </div>
              </div>
        </div>

      </div>

    </div>
  )
};


const PastInterviews = () => {

  return (
    <div className="mt-2 flex">
    <div className="pl-5 min-w-72 h-28 shadow-lg rounded-2xl bg-gradient-to-br from-blue-200 to-white dark:bg-neutral-900 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]  ">
      <h1 className="mt-3 text-slate-500">Sr. Software Engineer</h1>
      <p className="text-sm text-slate-500 dark:text-white">2 years of experience</p>
      <div className="mt-5 flex justify-between items-center">
      <p className="text-xs  text-slate-500">2050-12-12</p>
          <div className="mr-5">
            <Button className="p-0 mr-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-red-500">
             <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </Button>
            <Button className="p-0 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
            </Button>
          </div>
      </div>
    </div>
</div>
  )
}

