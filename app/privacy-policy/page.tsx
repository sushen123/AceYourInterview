"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
export default function Home() {
  const[isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },[])
 

    return <div className=" h-full bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
        <div className={`fixed flex justify-between items-center top-0 py-3  z-50 w-full px-6 lg:px-20 ${isScrolled? "bg-white/40 backdrop-blur-lg border border-white/20": ""}   `}>
        
        <Link href={'/'} >
        <div  className='flex justify-center items-center'>
      <Image src={'/logo.png'} width={40} height={40} alt='/logo' /> 
      <h1 className='text-xl ml-2'>DevElevate</h1>
      </div>
      </Link>
  
         
       
      </div>
      <div className="p-20 ">
        <h1 className="font-sans my-2 text-2xl">Privacy Policy for AceYourInterview</h1>
        <h2 className="font-sans mb-2">Effective Date: August 18, 2024</h2>
        <p><span className="font-bold">Welcome to AceYourInterview!</span>{" "}We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This privacy policy explains how we collect, use, and protect your information when you use our services.</p>
        <div className="mt-5">
        <h1 className="mb-2 text-2xl font-bold ">Information We Collect</h1>
        <ul className="flex flex-col gap-3">
          <li>
              <h1 className="font-bold">Personal Information</h1>
              <p>When you sign up for AceYourInterview, we collect your email address, name, and any responses you provide. This information is essential for creating your account and delivering the services offered by our app.</p>
          </li>
          <li>
             <h1  className="font-bold">Interview Data</h1>
             <p>We collect and store data related to your interviews, including generated questions, your responses, and any feedback provided by our AI models.</p>
          </li>
          <li>
            <h1  className="font-bold">Usage Data</h1>
            <p>We collect anonymous usage data, such as the features you interact with and how you navigate through our app. This helps us improve the overall user experience.</p>
          </li>
          <li>
            <h1  className="font-bold">Cookies</h1>
            <p>We use cookies for session management. These cookies are necessary for keeping you logged in and for managing your interactions with our services. We do not track your activities on other websites.</p>
          </li>
        </ul>
        </div>
        <div className="mt-5">
          <h1 className="mb-2 text-2xl font-bold ">How We Use Your Information</h1>
          <ul className="flex flex-col gap-3">
            <li>
              <h1 className="font-bold">Providing Services</h1>
              <p>We use your personal information and interview data to offer and enhance the features and services provided by AceYourInterview.</p>
            </li>
            <li>
              <h1 className="font-bold">LLM Modle Processing</h1>
              <p>The information you provide is processed through our AI-powered language model to generate personalized interview questions, feedback, and other services.</p>
            </li>
            <li>
              <h1 className="font-bold">Session Management</h1>
              Cookies are used to manage your sessions within the app, ensuring a seamless experience.
            </li>
          </ul>
        </div>
        <div className="mt-5">
          <h1 className="mb-2 text-2xl font-bold">Protection of Your Information</h1>
          <p>We are committed to safeguarding your personal information. We implement various security measures to ensure that your data is protected from unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the internet or electronic storage is 100% secure.</p>
        </div>
        <div className="mt-5">
          <h1 className="mb-2 text-2xl font-bold">Use of Data for Service Only</h1>
          <p>Your data will only be used to provide and improve the services offered by AceYourInterview. We will not sell, rent, or share your information with third parties unless it is necessary to provide the services you have requested or as required by law.</p>
        </div>
        <div className="mt-5">
          <h1 className="mb-2 text-2xl font-bold">Changes to This Privacy Policy</h1>
          <p>We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the updated privacy policy on our website. The revised policy will be effective immediately upon posting.</p>
        </div>
        <div className="mt-5">
          <h1 className="mb-2 text-2xl font-bold">Contact Us</h1>
          <p>If you have any questions about this privacy policy or our data practices, please contact us at: </p>
          <ul>
            <li>Email: sushensame@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
}