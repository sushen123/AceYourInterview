
"use client";
import React, { useEffect, useState  } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../__components/sidebar";
import {
  IconSettings,
} from "@tabler/icons-react";


import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Loader2, LogOut, Mail, MoonIcon, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";






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
                link.label === "Setting" ? 
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


 function Dashboard() {
  const [name, setName] = useState<string | null>()
  const [email, setEmail] = useState<string |null>()
  const [editingName, setEditingName] = useState(false)
  const [editingEmail, setEditingEmail] = useState(false)
  const [loading, setLoading] = useState({ name: false, email: false, signout: false })
  const { toast } = useToast()
  const session = useSession()
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('https://i.pravatar.cc/300')
 

 
  useEffect(() => {
    setName(session.data?.user?.name)
    setEmail(session.data?.user?.email)
    setImageUrl(session.data?.user?.image)
  },[session])

  const handleUpdate = async (field: 'name' | 'email') => {
    setLoading({ ...loading, [field]: true })
    try {
      // Simulating an API call with a delay
       if(field === "name") {
        const response = await axios.put("/api/profile", 
          {
            email: email,
            name: name
          }
        )
       }
      
      
      toast({
        title: "Update Successful",
        description: `Your ${field} has been updated.`,
      })
      if (field === 'name') setEditingName(false)
      if (field === 'email') setEditingEmail(false)
    } catch (error) {
      toast({
        title: "Update Failed",
        description: `Failed to update your ${field}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setLoading({ ...loading, [field]: false })
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/signin");
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

 

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full bg-gradient-to-b from-gray-100 to-white"
  >
    <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-8">
      <h1 className="text-4xl font-bold text-center text-white">Profile Settings</h1>
    </div>
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div 
        className="flex justify-center -mt-16"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
          <AvatarImage src={imageUrl} alt="User avatar" />
          <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          {name?.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </motion.div>
      
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {editingName ? (
            <motion.div
              key="edit-name"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <label htmlFor="name" className="text-lg font-semibold flex items-center gap-2 mb-2">
                <User className="w-5 h-5" /> Name
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-grow"
                />
                <Button 
                  onClick={() => handleUpdate('name')} 
                  disabled={loading.name}
                  size="icon"
                >
                  {loading.name ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingName(false)}
                  size="icon"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="display-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-lg font-medium">{name}</span>
              </div>
              <Button 
                variant="ghost"
                onClick={() => setEditingName(true)}
              >
                Edit
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

       
      </div>

      <div className="pt-6">
        <Button 
          variant="destructive" 
          onClick={handleSignOut}
          disabled={loading.signout}
          className="w-full"
        >
          {loading.signout ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <LogOut className="h-4 w-4 mr-2" />
          )}
          Sign Out
        </Button>
      </div>
    </div>
  </motion.div>
)}