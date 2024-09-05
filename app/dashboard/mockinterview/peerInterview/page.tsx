

"use client";
import React, { useState  } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../__components/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";


import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Video, Book, Users, Bell, Settings, LogOut, Plus, ChevronRight, Star, Activity, FileText, Brain, Sparkles, Award } from "lucide-react"

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";




export default function Home() {


  const links = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

      ),
    },
    {
      label: "Interview",
      href: "/dashboard/mockinterview",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
      
      ),
    },
   
    {
      label: "Resume AI",
      href: "/dashboard/resume",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-black dark:text-white ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
      
      ),
    },
    {
      label: "Cover Letter AI",
      href: "/dashboard/coverletter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

      ),
    },
    {
      label: "Resources",
      href: "/dashboard/resources",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
      

      ),
    },
    {
      label: "AutoApplyJob AI",
      href: "/dashboard/autoapply",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
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
                <SidebarLink key={idx} link={link} />
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
  const [themeCondition, setThemeCondition] = useState(false)
  const [interviewState, setInterviewState] = useState("peer")
 
  
 
 

  if(loading) {
    return (
      <div className=" ">
        
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
       
          <div className="flex gap-2">
            {[...new Array(4)].map((i) => (
              <div
                key={"first-array" + i}
                className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
              ></div>
            ))}
          </div>
          <div className="flex gap-2 flex-1">
            {[...new Array(2)].map((i) => (
              <div
                key={"second-array" + i}
                className="h-full w-full rounded-lg  bg-gray-300 dark:bg-neutral-800 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="w-screen overflow-y-auto">
      <div className="text-black dark:text-white  hidden md:flex  justify-end h-10 ">
      <Button className="flex" >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-black dark:text-white mr-2">
<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
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
      <div className="  bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] grid grid-row-12 h-full text-black dark:text-white  bg-white dark:bg-neutral-700  rounded-s-3xl">
        <div className="bg-slate-200 h-10 flex  items-center dark:bg-neutral-600 w-96 rounded-ee-3xl rounded-tl-3xl row-span-1">
            <Link href={'/dashboard/mockinterview'} className="p-0" onClick={() => {
                setInterviewState("ai")
     
            }}>
            <div className={`pt-1 ${interviewState == "ai" ? "bg-white dark:bg-gray-400": ""} ml-2 w-44 text-center rounded-xl  rounded-tl-3xl  h-8`}>
             <h1 className="font-sans font-normal">AI Interview</h1>   
            </div>
            </Link>
            <Link href={'/dashboard/mockinterview/peerInterview'} className="p-0" onClick={() => {
                setInterviewState("peer")
            }}>
            <div className={`pt-1 ${interviewState == "peer" ? "bg-white dark:bg-gray-400": ""} ml-4 w-44 text-center rounded-xl  rounded-ee-3xl  h-8`}>
                  <h1 className="font-sans font-normal">Peer to Peer Interview</h1>
            </div>
            </Link>
            
        </div>
        <div className="row-span-11 flex bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
     

          <div>
          <Alert>
                <Award className="h-4 w-4" />
                <AlertTitle>Peer-to-Peer Sessions</AlertTitle>
                <AlertDescription>
                  Connect with peers for mutual interview practice and feedback. Learn from each other and grow together.
                </AlertDescription>
              </Alert>
              </div>
         

          {/* Dashboard Overview */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Upcoming Interviews</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Completed Interviews</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Average Rating</h3>
              <p className="text-2xl font-bold">4.7 / 5</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Practice Streak</h3>
              <p className="text-2xl font-bold">7 days</p>
            </div>
          </section>

          {/* Progress Tracking */}
         

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Interviews */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Upcoming Interviews</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((interview) => (
                  <div key={interview} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-semibold text-indigo-600 dark:text-indigo-400">Mock Interview with John Doe</p>
                        <p className="text-sm text-gray-500">Frontend Developer Role</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500 mr-4">2:00 PM, May 15</span>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Join
                        <Video className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 text-indigo-600 dark:text-indigo-400">
                View all interviews
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </section>

            {/* Recent Activity */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 mr-3 text-green-500" />
                  <p className="text-sm">Completed mock interview with Sarah J.</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-3 text-yellow-500" />
                  <p className="text-sm">Received 5-star feedback for communication skills</p>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-blue-500" />
                  <p className="text-sm">Updated resume with new project experience</p>
                </div>
                <div className="flex items-center">
                  <Brain className="h-5 w-5 mr-3 text-purple-500" />
                  <p className="text-sm">Completed 3 new algorithm challenges</p>
                </div>
              </div>
            </section>
          </div>

          {/* Schedule New Interview */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Schedule New Interview</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="text" placeholder="Interview Type" className="border-indigo-300 focus:border-indigo-500" />
                <Input type="text" placeholder="Preferred Role" className="border-indigo-300 focus:border-indigo-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="date" placeholder="Date" className="border-indigo-300 focus:border-indigo-500" />
                <Input type="time" placeholder="Time" className="border-indigo-300 focus:border-indigo-500" />
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Schedule Interview
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Notes */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Quick Notes</h2>
              <Textarea 
                placeholder="Jot down your interview preparation notes here..." 
                className="w-full h-32 border-indigo-300 focus:border-indigo-500"
              />
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">Save Notes</Button>
            </section>

           

            {/* Skills Assessment */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Skills Assessment</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">JavaScript</label>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">React</label>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Node.js</label>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">Update Skills</Button>
            </section>
          </div>
          </div>
          </main>
        </div>
      </div>
    </div>
  )
};

