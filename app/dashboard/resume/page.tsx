
"use client";
import React, { useEffect, useState  } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../__components/sidebar";
import {
  IconSettings,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusIcon, FileTextIcon, SparklesIcon, ArrowRight, CheckCircle, ArrowLeft, X, Router, Loader, Loader2} from 'lucide-react'
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Label } from "recharts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useSession } from "next-auth/react";







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
    }
    ,
      
    {
      label: "Setting",
      href: "/dashboard/setting",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    }
  
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
                link.label === "Resume AI" ? 
                (<SidebarLink key={idx} link={link} className="bg-blue-500 rounded-full   p-1" />) 
                : (<SidebarLink key={idx} link={link} className="" />)
              ))}
            </div>
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
 
  const {setTheme} = useTheme()
 
  const [themeCondition, setThemeCondition] = useState(false)
 

  return (
    <div className="w-screen overflow-y-auto  ">
      <div className="overflow-y-auto bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] grid grid-row-12 text-black dark:text-white  bg-white dark:bg-neutral-700  rounded-s-3xl">
        <Component />
        </div>
    </div>
  )
};
function Component() {
  const [templateTheme, setTemplate] = useState('theme1')
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeName, setResumeName] = useState('');
  
  const [resumeId, setResumeId] = useState();
  const [coverLetterId, setLetterCoverId] = useState()
  const [resumesData, setResumesData] = useState([])
  const [coverLetterData, setCoverLetterData] = useState([])
 const [coverletterTitle, setCoverLetterTitle] = useState('')
 const [page, setPage] = useState(1)
 const [hasMore, setHasMore] = useState(true);
 const [loading, setLoading] = useState(false);
 const [coverPage, setCoverPage] = useState(1)
 const [coverLetterHasMore, setcoverLetterHasMore]= useState(true)
const router = useRouter()
  const steps = [
    { title: "Create New Resume", component: <DialogElement1 templateTheme={templateTheme} setTemplate={setTemplate} /> },
    { title: "Create New Resume", component: <ResumeCreationDialog setResumeName={setResumeName} /> },
    // Add more steps as needed
  ];

  const session = useSession()


  async function sendResume() {

    const response = await axios.post('/api/resumeData', {
      template: templateTheme,
      name: resumeName,
      email: session.data?.user?.email
    })

    const resumeId = await response.data.id
    router.push(`/dashboard/resume/${resumeId}/${templateTheme}`)
    console.log(resumeId)
    setResumeId(resumeId)

  }

  async function sendCoverLetter() {
    const response = await axios.post('/api/coverLetter', {
      name: coverletterTitle,
      email: session.data?.user?.email
    })
console.log(response)
    const resumeId = await response.data.id
    router.push(`/dashboard/resume/${resumeId}/coverLetter`)
    setResumeId(resumeId)
  }

  function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);

    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInSeconds < 60) {
        return "Just now";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays === 0) {
        return "Today";
    } else if (diffInDays === 1) {
        return "1 day ago";
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else if (diffInWeeks === 1) {
        return "A week ago";
    } else {
        return `${diffInWeeks} weeks ago`;
    }
}



  async function getResume() {
    setLoading(true)
    try {
      const response = await axios.get(`/api/resumeData?email=${session.data?.user?.email}&page=${page}&limit=4`);
      const { resumes, currentPage, totalPages } = response.data;
      
      setResumesData(prevResumes => [...prevResumes, ...resumes]);
      setPage(prevPage => prevPage + 1);
      setHasMore(currentPage < totalPages);
    } catch (error) {
      console.error("Error fetching items:", error)
    }
    finally {
      setLoading(false)
    }
   
  }

  async function getCoverLetter() {
    setLoading(true)
    try {
      const response = await axios.get(`/api/coverLetter?email=${session.data?.user?.email}&page=${coverPage}&limit=4`);
      const { resumes, currentPage, totalPages } = response.data;
      
      setCoverLetterData(prevResumes => [...prevResumes, ...resumes]);
      setCoverPage(prevPage => prevPage + 1);
      setcoverLetterHasMore(currentPage < totalPages);
    } catch (error) {
      console.error("Error fetching items:", error)
    }
    finally {
      setLoading(false)
    }
   
  }

  useEffect(() => {
    getResume()
    getCoverLetter()
  },[])

 
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  const recentResumes = resumesData.map((resume, index) => ({
    id: index + 1,
    resumeId: resume.id,
    theme: resume.template,
    name: resume.name,
    lastEdited: timeAgo(resume.updatedAt)  ,
}));

 const [coverLetterIndex, setCoverLetterIndex] = useState(0)

 const recentCoverLetter  = coverLetterData.map((cover, index) => ({
  id: coverLetterIndex,
  resumeId: cover.id,
  name: cover.name,
  lastEdited: timeAgo(cover.updatedAt)

 }))


 


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
         

          <Card className="bg-gradient-to-r from-purple-400 to-blue-500 dark:from-purple-600 dark:to-blue-700 text-white shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back, {session.data?.user?.name}</h2>
              <p className="text-lg opacity-90">Ready to craft your perfect resume? Let's make it shine!</p>
            </CardContent>
          </Card>
           
          <div className="grid md:grid-cols-2 gap-8">
         
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>

                <CardTitle className="text-2xl font-semibold flex items-center">
                  <SparklesIcon className="mr-2 h-6 w-6 text-yellow-400" />
                  Create New Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
              <Dialog>
                  <DialogTrigger className="flex justify-center items-center rounded-lg py-2 w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105">
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Create New Resume
                  </DialogTrigger>
                  <DialogContent className="overflow-hidden h-[80vh]   max-w-[700px] p-0  "> {/* Limit height and width */}
                  <DialogHeader className="">
          <DialogTitle className="font-light border-b-2 text-base w-full p-3 pl-10  ">{steps[currentStep].title}</DialogTitle>
        </DialogHeader>
                  <div className="relative overflow-x-hidden overflow-y-auto h-full px-10 pb-6 classy-scrollbar mb-64">
                    {steps[currentStep].component}
                  </div>
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {currentStep > 0 && (<div className="flex justify-between w-[680px] ">
                      <Button variant="outline" onClick={prevStep}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Prev
                      </Button>
                      <Button variant="contained" className="bg-blue-500" onClick={() => {
                        sendResume()
                      }}>
                        Next <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                      </div>
                    )}
                    {currentStep < steps.length - 1 && (
                      <Button variant="contained" className="bg-blue-500" onClick={nextStep}>
                        Next <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                  </DialogContent>
                </Dialog>

              </CardContent>      
            </Card>
           

           
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>

                <CardTitle className="text-2xl font-semibold flex items-center">
                  <SparklesIcon className="mr-2 h-6 w-6 text-yellow-400" />
                  Create New Cover Letter
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
              <Dialog >
                <DialogTrigger  className=" flex justify-center items-center rounded-lg py-2 w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105">
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Create New Cover Letter
                </DialogTrigger>
                <DialogContent className=" overflow-y-auto h-5/6 scrollbar-none">
                    <DialogHeader className="">
                      <DialogTitle>Create A New Cover Letter</DialogTitle>
                      <DialogDescription>
                        Enter the details
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full ">
                      <label className="font-semibold" htmlFor="">Job Title</label>
                      <Input onChange={(e) => {
                        setCoverLetterTitle(e.target.value)
                      }}  placeholder="Software Engineer" className="mb-72" />  
                      <div className="w-full flex justify-end">
                     {coverletterTitle.length > 2 ? (<Button onClick={() => {
                     sendCoverLetter()
                     }}  className=" " variant="contained">
                      Continue
                    </Button> ) : 
                    (
                      <Button  disabled  className=" " variant="contained">
                      Continue
                    </Button>
                    )}
                      </div>
                      
                    </div>
                    
                    
                  </DialogContent>
                    
                </Dialog>
              </CardContent>      
            </Card>
          </div>

          <Tabs defaultValue="recent" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-blue-100 dark:bg-gray-700 p-1 rounded-lg">
              <TabsTrigger value="recent" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              Previous Resumes
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              Previous Cover Letter
              </TabsTrigger>
            </TabsList>
            <TabsContent value="recent">
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Previous Resumes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {recentResumes.map((resume) => (
                      <motion.div
                        key={resume.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-4 transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-4">
                            <FileTextIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{resume.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Last edited {resume.lastEdited}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            router.push(`/dashboard/resume/${resume.resumeId}/${resume.theme}`)
                          }}
                          className="ml-4 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                          Select
                        </Button>
                      </motion.div>
                    ))}
                 { recentResumes && hasMore && <div className="text-center mt-10">
                   {loading ? (
                    <>
                     <Button disabled={loading}  className="bg-black text-white dark:bg-white dark:text-black ">
                    <Loader2 className="animate-spin"/> {" "}  Loading..
                  </Button>
                    </>
                   ): (
                    <>
                    <Button onClick={getResume} disabled={loading} className="bg-black text-white dark:bg-white dark:text-black ">
                    See More
                  </Button>
                  </>
                   )}
                 
                    </div>
                    }
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="all">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Previous Resumes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {recentCoverLetter.map((resume) => (
                      <motion.div
                        key={resume.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-4 transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-4">
                            <FileTextIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{resume.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Last edited {resume.lastEdited}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            router.push(`/dashboard/resume/${resume.resumeId}/coverLetter`)
                          }}
                          className="ml-4 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                          Select
                        </Button>
                      </motion.div>
                    ))}
                 { recentCoverLetter && coverLetterHasMore && <div className="text-center mt-10">
                   {loading ? (
                    <>
                     <Button disabled={loading}  className="bg-black text-white dark:bg-white dark:text-black ">
                    <Loader2 className="animate-spin"/> {" "}  Loading..
                  </Button>
                    </>
                   ): (
                    <>
                    <Button onClick={getCoverLetter} disabled={loading} className="bg-black text-white dark:bg-white dark:text-black ">
                    See More
                  </Button>
                  </>
                   )}
                 
                    </div>
                    }
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}



const DialogElement1 = ({setTemplate, templateTheme}) => {

  return  <>
 {/* Make inner content scrollable */}
  <DialogHeader>
    <DialogTitle className="text-base font-semibold">Select a template for your resume</DialogTitle>
    <DialogDescription>
      Choose the template for your resume
    </DialogDescription>
  </DialogHeader>
  <div className="flex gap-12 flex-wrap mt-5cd">
    <div onClick={() => { setTemplate('theme1'); }} className="cursor-pointer border-4 text-center hover:border-slate-600 border-slate-300 w-fit">
      <Image src={'/theme1.png'} alt="theme1" width={250} height={250} />
      <h1 className="font-thin">Theme 1</h1>
      <div className={`${templateTheme === "theme1" ? "" : "hidden"} relative bottom-[22rem] left-56`}>
        <CheckCircle />
      </div>
    </div>
    <div onClick={() => { setTemplate('theme2'); }} className="cursor-pointer border-4 hover:border-slate-600 text-center border-slate-300 w-fit">
      <Image src={'/theme2.jpg'} alt="theme2" width={250} height={250} />
      <h1 className="font-thin">Theme 2</h1>
      <div className={`${templateTheme === "theme2" ? "" : "hidden"} relative bottom-[22rem] left-56`}>
        <CheckCircle />
      </div>
    </div>
    <div onClick={() => { setTemplate('theme3'); }} className="cursor-pointer border-4 text-center hover:border-slate-600 border-slate-300 w-fit">
      <Image src={'/theme3.jpeg'} alt="theme3" width={250} height={250} />
      <h1 className="font-thin">Theme 3</h1>
      <div className={`${templateTheme === "theme3" ? "" : "hidden"} relative bottom-[21rem] left-56`}>
        <CheckCircle />
      </div>
    </div>
  </div>

</>
}



const ResumeCreationDialog = ({setResumeName}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [targetJob, setTargetJob] = useState('')
 

  return (
     <>
          <div className="m-0 ">
            <h2 className="text-lg font-semibold">Target Job</h2>
            <p className="text-sm text-gray-500">
              Enter the job title you're aiming for or targeting in your job search.
            </p>
          </div>
          <div>
            <Input
              id="targetJobTitle"
              value={targetJob}
              onChange={(e) => {
                setTargetJob(e.target.value)
                setResumeName(e.target.value)
              }}
              placeholder="Software Engineer"
              className="mt-1"
            />
          </div>
       
  </>
  );
}