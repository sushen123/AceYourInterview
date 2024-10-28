

"use client";
import React, { useEffect, useState  } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../__components/sidebar";
import {
  IconSettings,
} from "@tabler/icons-react";


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {  Calendar, Clock,  TrendingUp, User, Zap, Video, Mic, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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
import { Award, Loader2, Loader2Icon, MoonIcon, PlusCircle, PlusIcon, Sparkles, SunIcon } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/Avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { title } from "process";
import Banner from "@/app/components/BannerAd";





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
        "h-[100vh]" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen}  >
        <SidebarBody className="justify-between gap-5  ">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                link.label === "Interview" ? 
                (<SidebarLink key={idx} link={link} className="bg-blue-500 rounded-full   p-1" />) 
                : (<SidebarLink key={idx} link={link} className="" />)
              ))}
            </div>
          </div>
       
        </SidebarBody>
      </Sidebar>
    
        <Dashboard />
     
   
    </div>
  );
}
const Logo = () => {
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
 const LogoIcon = () => {
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

 function Dashboard() {
  const [loading, setLoading] = useState(false)
  const { setTheme } = useTheme()
  const [isGenerating, setGenerating] = useState(false)
  const [themeCondition, setThemeCondition] = useState(false)
  const [interviewState, setInterviewState] = useState("ai")
  const [jobPosition, setJobPosition] = useState<string | null>()
  
  const [jobExperience, setJobExperience] = useState<string | null>()
  const [jobInterviewType, setInterviewType] = useState("")
  const [jsonResponse, setJsonResponse] = useState([])
  const [resume, setResume] = useState<File | null>()
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const { toast } = useToast()
const [jobDescription, setJobDescription] = useState<string>(`
  Job Title: Software Engineer
Location: [Location] (Remote/On-site)
Employment Type: Full-time

Job Overview:
We are looking for a passionate and skilled Software Engineer to join our dynamic team. As a Software Engineer, you will be responsible for designing, developing, and maintaining software applications. You will work closely with cross-functional teams to deliver high-quality solutions that meet client and business needs.

Key Responsibilities:

Write clean, efficient, and scalable code in [programming languages like Python, Java, JavaScript, etc.].
Collaborate with product managers, designers, and other engineers to build software that solves real-world problems.
Participate in all stages of the software development lifecycle, from concept to deployment and maintenance.
Troubleshoot, debug, and upgrade existing software.
Create and maintain technical documentation for systems and applications.
Conduct code reviews and ensure best practices are followed.
Stay updated with the latest trends and technologies in software development.
Requirements:

Bachelor's degree in Computer Science, Engineering, or related field (or equivalent experience).
Proficiency in programming languages such as [Python, Java, C++, JavaScript, etc.].
Strong problem-solving skills and ability to write efficient algorithms.
Familiarity with databases (e.g., SQL, NoSQL) and version control systems (e.g., Git).
Experience with cloud services (e.g., AWS, Azure) is a plus.
Excellent communication skills and ability to work in a team-oriented environment.
Preferred Qualifications:

Experience with Agile development methodologies.
Knowledge of microservices architecture and RESTful APIs.
Understanding of DevOps practices and CI/CD pipelines.
What We Offer:

Competitive salary and benefits package.
Opportunities for professional growth and career advancement.
Collaborative and innovative work environment.
    `)
  useEffect(() => {
    console.log(resume)
  }, [resume])

  useEffect(() => {
    if (jobInterviewType != "others") {
      setJobPosition(jobInterviewType)
    }
    console.log(jobPosition)
  }, [jobInterviewType])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateCurrentStep()) return

    console.log(jobPosition, jobDescription, jobExperience)
    console.log(resume)

    setLoading(true)
    try {
      const InputPrompt = ` Act as an experienced interviewer named Sushen Oli , specializing in conducting real mock interviews. Based on the input prompt, generate a set of interview questions based on the user's resume, job position, job description and job experience given below.

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
              9. Add three dots "…" to create longer pauses where appropriate. 
              10. Use filler words "um" and "uh" naturally throughout the questions.
              11. Keep sentences shorter to improve pronunciation.
              12. Return the 15 questions in JSON format with the field "question" and the type of question with the filed of "type" and there sholud be only three type (situational, behavioural, technical). Ensure the questions are phrased in a way that reflects natural human speech patterns, with appropriate use of filler words, pauses, and occasional light humor.
             13. Add light humor or friendly remarks sparingly to make the interview feel engaging and realistic. Avoid overusing jokes; keep the tone professional but approachable.`

      const result = await chatSession.sendMessage(InputPrompt)
      const MockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '')
      console.log(MockJsonResponse)
      setJsonResponse(MockJsonResponse)

      const response = await axios.post(`/api/createInterview`, {
        jsonMockResponse: MockJsonResponse,
        jobPosition,
        jobExperience,
        jobDescription,
        createdBy: session.data?.user?.email
      })

      if (response.status === 200) {
        const mockId = response.data.mockId
        router.push(`/dashboard/interview/${mockId}`)
      }
    } catch (error) {
      console.error("Error generating interview questions:", error)
      toast({
        title: "Error",
        description: "Failed to generate interview questions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const validateCurrentStep = () => {
    switch (index) {
      case 0:
        if (!jobInterviewType) {
          toast({
            title: "Interview Type Required",
            description: "Please select an interview type.",
            variant: "destructive",
          })
          return false
        }
        if (jobInterviewType === "others" && !jobPosition) {
          toast({
            title: "Job Position Required",
            description: "Please enter a job position.",
            variant: "destructive",
          })
          return false
        }
        return true
      case 1:
        if (!jobDescription) {
          toast({
            title: "Job Description Required",
            description: "Please enter a job description or tech stack.",
            variant: "destructive",
          })
          return false
        }
        return true
      case 2:
        if (!resume) {
          toast({
            title: "Resume Required",
            description: "Please upload your resume.",
            variant: "destructive",
          })
          return false
        }
        return true
      case 3:
        if (!jobExperience) {
          toast({
            title: "Experience Level Required",
            description: "Please select an experience level.",
            variant: "destructive",
          })
          return false
        }
        return true
      default:
        return true
    }
  }
  const session = useSession()
  const [mockInterviews, setMockInterviews] = useState([])

  useEffect(() => {
    getMockDetails()
  },[session])

  async function getMockDetails() {
  const response = await axios.get(`/api/profile?userId=${session.data?.user?.id}`)
    console.log(response, "hello")
 
  setMockInterviews(response.data.mockInterviews)

  }


  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 h-full overflow-y-auto">
    <div className="w-full space-y-8">
      <Alert className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 shadow-lg">
        <Sparkles className="h-5 w-5 text-blue-500" />
        <AlertTitle className="text-lg font-semibold">AI-Powered Interviews</AlertTitle>
        <AlertDescription className="text-gray-600 dark:text-gray-300">
          Practice with our advanced AI to simulate real interview scenarios. Get instant feedback and improve your skills.
        </AlertDescription>
      </Alert>

      <Banner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button onClick={() => {
                

              }} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <Zap className="mr-2 h-5 w-5" /> Create New Interview
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Set Up Your Interview</SheetTitle>
                <SheetDescription>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {index === 0 && (
                      <div className="space-y-4">
                        <Select onValueChange={setInterviewType}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Interview Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="software engineer">Software Engineer</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        {jobInterviewType === "others" && (
                          <Input 
                            placeholder="Enter Job Role" 
                            onChange={(e) => setJobPosition(e.target.value)}
                            className="w-full"
                          />
                        )}
                      </div>
                    )}
                    {index === 1 && (
                      <Textarea
                        placeholder="Job Description / Tech Stack" 
                        defaultValue={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full h-[500px] resize-none"
                      />
                    )}
                    {index === 2 && (
                      <div className="space-y-2">
                        <p className="font-medium">Upload your resume</p>
                        <FileUpload setResume={setResume} />
                      </div>
                    )}
                    {index === 3 && (
                      <Select onValueChange={setJobExperience}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Experience Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Entry level">Entry Level</SelectItem>
                          <SelectItem value="Intermediate level">Intermediate</SelectItem>
                          <SelectItem value="senior level">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    <div className="flex justify-between">
                      {index > 0 && (
                        <Button type="button" onClick={() => setIndex(index - 1)} variant="outline" className="bg-black text-white hover:bg-gray-800">
                          Back
                        </Button>
                      )}
                      {index < 3 ? (
                        <Button 
                          type="button"
                          onClick={() => {
                           
                            if (validateCurrentStep()) {
                              setIndex(index + 1)
                            }
                          }}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button 
                          type="submit"
                          disabled={loading}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="animate-spin mr-2" />
                              Starting...
                            </>
                          ) : (
                            'Start Interview'
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
    <PastInterviews mockInterviews={mockInterviews}/>
  </div>
  )
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

function PastInterviews({ mockInterviews }) {
  const extractInterviews = mockInterviews;
 
 
  return (
    <div className="space-y-4 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Past Interviews</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        {extractInterviews?.map((interview, index) => (
          <InterviewCard 
            key={index}
            position={interview.jobPosition}
            experience={interview.jobExperience}
            date={interview.date}
            mockId={interview.mockId}
          />
        ))}
    
      </div>
    </div>
  );
}

function InterviewCard({ position, experience, date, mockId }) {
  const formattedDate = formatTimeAgo(date);
  const router = useRouter()
  const {toast} = useToast()

  const handleDelete = async() => {
    console.log(mockId)
    const response = await axios.delete('/api/createInterview', {
      data: {mockId: mockId}
    })
    if(response.status === 200) {
      toast({
        title: "Deleted Succesfully"
      })
    } else {
      toast({
        title: "Error While Deleting",
        variant: "destructive"
      })
    }
   
  }
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-white">{position}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{experience}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => {
           
          handleDelete()
        }} variant="ghost" size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </Button>
        <Button onClick={() => {
          router.push(`/dashboard/interview/${mockId}`)
        }} variant="ghost" size="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653Z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}