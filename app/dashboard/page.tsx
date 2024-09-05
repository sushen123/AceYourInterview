

"use client";
import React, { useState  } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./__components/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookCheck, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { UserCheck, FileText, BookOpen, Briefcase, Zap, Bell, Settings, LogOut, Users, Calendar, ChevronUp, Award } from 'lucide-react';

import { useRouter } from "next/navigation";



export default function Home() {

  const links = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-black dark:text-white">
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
        "h-[auto]" 
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
  const router = useRouter()
  

  const features = [
    {
      icon: <UserCheck />,
      title: "AI Interview",
      description: "Practice with our AI interviewer",
      onClick: () => router.push('/dashboard/mockinterview'),
      bgColor: "bg-blue-600"
    },
    {
      icon: <FileText />,
      title: "Resume Builder",
      description: "Craft your professional resume",
      onClick: () => router.push('/dashboard/resume'),
      bgColor: "bg-green-600"
    },
    {
      icon: <Briefcase />,
      title: "Job Matcher",
      description: "Find jobs tailored to your skills",
      onClick: () => router.push('/dashboard/autoapply'),
      bgColor: "bg-purple-600"
    },
    {
      icon: <BookOpen />,
      title: "Learn & Grow",
      description: "Access courses and resources",
      onClick: () => router.push('/dashboard/resources'),
      bgColor: "bg-yellow-600"
    },
    {
      icon: <Users />,
      title: "Networking",
      description: "Connect with professionals",
      onClick: () => router.push('/dashboard/communities'),
      bgColor: "bg-indigo-600"
    },
    {
      icon: <BookCheck />,
      title: "CoverLetter",
      description: "Let AI make your cover letter",
      onClick: () => router.push('/dashboard/events'),
      bgColor: "bg-red-600"
    }
  ];
 

  

  return (
    <div className="w-screen">
      <div className="text-black dark:text-white  hidden md:flex  justify-end h-10 ">
      <Button className="flex" >
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
      <div className=" bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] grid grid-row-12 h-auto text-black dark:text-white  bg-white dark:bg-neutral-700  rounded-s-3xl">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">

      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, Sushen!</h2>
            <p className="text-gray-600 dark:text-gray-400">Your career journey continues here.</p>
          </div>
          <img src="/api/placeholder/100/100" alt="User Avatar" className="rounded-full w-16 h-16 object-cover" />
        </header>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Your Career Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6">Career Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Skills Growth</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '70%'}}></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">7 out of 10 key skills mastered</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Interview Readiness</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{width: '85%'}}></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">85% ready for your next interview</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-6">Upcoming Events</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Calendar className="text-blue-500" />
                <div>
                  <p className="font-semibold">Tech Career Fair</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sep 15, 10:00 AM</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Users className="text-green-500" />
                <div>
                  <p className="font-semibold">Networking Webinar</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sep 20, 2:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-6">Job Market Insights</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span>Frontend Developer</span>
                <span className="flex items-center text-green-500"><ChevronUp size={16} className="mr-1" /> 12% growth</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Data Scientist</span>
                <span className="flex items-center text-green-500"><ChevronUp size={16} className="mr-1" /> 18% growth</span>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-6">Your Achievements</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Award className="text-yellow-500" />
                <span>Completed 10 Mock Interviews</span>
              </li>
              <li className="flex items-center space-x-3">
                <Award className="text-yellow-500" />
                <span>Resume Optimization Expert</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
      </div>
    </div>
  )
};


const FeatureCard = ({ icon, title, description, onClick, bgColor }) => (
  <div 
    onClick={onClick}
    className={`${bgColor} rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer text-white`}
  >
    <div className="flex items-center mb-4">
      {React.cloneElement(icon, { size: 32 })}
      <h3 className="text-xl font-semibold ml-4">{title}</h3>
    </div>
    <p className="text-white/80">{description}</p>
  </div>
);