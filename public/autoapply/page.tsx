
"use client";
import React, { useEffect, useRef, useState  } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../__components/sidebar";
import {
  IconSettings,
} from "@tabler/icons-react";
import { Eye, EyeOff, Mail, Lock, Info, Loader2 } from 'lucide-react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Link from "next/link";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Zap, X} from 'lucide-react'
import { ToastAction } from "@/components/ui/toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PlusCircle, Briefcase, MapPin, Edit, Trash2, Clock } from 'lucide-react'
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast";
import { format, formatDistanceToNow } from 'date-fns'
import { cn } from "@/lib/utils"
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
      label: "AutoApplyJob AI",
      href: "/dashboard/autoapply",
      icon: (
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-black  dark:text-white">
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
        "h-[100vh]" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen}  >
        <SidebarBody className="justify-between gap-5  ">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                link.label === "AutoApplyJob AI" ? 
                (<SidebarLink key={idx} link={link} className="bg-blue-500 rounded-full   p-1" />) 
                : (<SidebarLink key={idx} link={link} className="" />)
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

  const data = [
    { name: 'Jan', applications: 65, interviews: 28 },
    { name: 'Feb', applications: 59, interviews: 32 },
    { name: 'Mar', applications: 80, interviews: 41 },
    { name: 'Apr', applications: 81, interviews: 37 },
    { name: 'May', applications: 56, interviews: 25 },
    { name: 'Jun', applications: 55, interviews: 30 },
    { name: 'Jul', applications: 40, interviews: 22 },
  ]
  
  const steps = [
    { id: 'personal', title: 'Personal Information' },
    { id: 'preferences', title: 'Job Preferences' },
    { id: 'experience', title: 'Experience & Education' },
    { id: 'skills', title: 'Skills & Qualifications' },
    { id: 'additional', title: 'Additional Information' },
  ]
  
  const initialJobs:any[] = []


  const userId = 12134

  async function getJobProfiles() {
   const response = await axios.get(`/api/jobProfile?userId=${userId}`)
  

   console.log(response.data)
   for(let i=0;i<response.data.jobProfile.length;i++){
    initialJobs.push(response.data.jobProfile[i])
   }

   console.log(jobs)
   setCredentials({
    email: response.data.userDetails.email,
    passkey: response.data.userDetails.extensionKey
  })


  }

 

  useEffect(() => {
    getJobProfiles()
   
  }, [])

  const {setTheme} = useTheme()
  const [isVisible, setIsVisible] = useState(true);


  const [themeCondition, setThemeCondition] = useState(false)
  const {toast} = useToast()
  const [jobApplied, setJobApplied] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [editingJobId, setEditingJobId] = useState(null)
  const [jobs, setJobs] = useState(initialJobs)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedIn: '',
    workAddress: '',
    desiredJobTitle: '',
    jobType: '',
    workLocation: '',
    willingToRelocate: '',
    salaryRange: '',
    availability: '',
    currentEmploymentStatus: '',
    yearsOfExperience: '',
    highestEducation: '',
    fieldOfStudy: '',
    graduationYear: '',
    primarySkills: '',
    languages: '',
    resume: null,
    coverLetter: null,
    personalStatement: '',
    heardAboutUs: '',
   
  })
  const [errors, setErrors] = useState({})
  const [credentials, setCredentials] = useState({
    email: "sushensam@gmail.com",
    passkey: "sushen123"
  })


 
  
  

  useEffect(() => {
    if (editingJobId) {
      const jobToEdit = jobs.find(job => job.id === editingJobId)
      if (jobToEdit) {
        setFormData({
          ...formData,
          desiredJobTitle: jobToEdit.desiredJobTitle,
          workLocation: jobToEdit.workLocation,
          
        })
      }
    }
  }, [editingJobId, jobs])





  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData({ ...formData, [name]: files[0] })
    setErrors({ ...errors, [name]: '' })
  }

  const validateStep = () => {
    const newErrors = {}
    const requiredFields = {
      0: ['fullName', 'email', 'phone', 'workAddress'],
      1: ['desiredJobTitle', 'jobType', 'workLocation', 'willingToRelocate'],
      2: ['currentEmploymentStatus', 'yearsOfExperience', 'highestEducation'],
      3: ['primarySkills', 'languages'],
      4: ['resume', 'personalStatement'],
    }

    requiredFields[currentStep].forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleContinue = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setLoading(true)
        handleSubmit()
        setLoading(false)
      }
    } else {
      toast({
        variant:"destructive",
        title: "Please fill in all required fields",
        description: "Some required information is missing.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

 const handleSubmit = async () => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('desiredJobTitle', formData.desiredJobTitle);
    formDataToSend.append('workLocation', formData.workLocation);
    formDataToSend.append('workAddress', formData.workAddress);
    // Append other relevant fields from formData
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('linkedIn', formData.linkedIn);
    formDataToSend.append('jobType', formData.jobType);
    formDataToSend.append('willingToRelocate', formData.willingToRelocate);
    formDataToSend.append('salaryRange', formData.salaryRange);
    formDataToSend.append('availability', formData.availability);
    formDataToSend.append('currentEmploymentStatus', formData.currentEmploymentStatus);
    formDataToSend.append('yearsOfExperience', formData.yearsOfExperience);
    formDataToSend.append('highestEducation', formData.highestEducation);
    formDataToSend.append('fieldOfStudy', formData.fieldOfStudy);
    formDataToSend.append('graduationYear', formData.graduationYear);
    formDataToSend.append('primarySkills', formData.primarySkills);
    formDataToSend.append('languages', formData.languages);
    formDataToSend.append('personalStatement', formData.personalStatement);
    formDataToSend.append('heardAboutUs', formData.heardAboutUs);

    if (formData.resume) {
      formDataToSend.append('resume', formData.resume);
    }
    if (formData.coverLetter) {
      formDataToSend.append('coverLetter', formData.coverLetter);
    }

    if (editingJobId) {
      formDataToSend.append('jobId', editingJobId);
      await axios.put(`/api/jobProfile`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Update jobs state
      setJobs(jobs.map(job => job.id === editingJobId ? { formData } : job));
      toast({
        title: "Job Updated",
        description: "The job role has been successfully updated.",
      });

    } else {
      const response = await axios.post('/api/jobProfile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, 
      });
      
      // Update jobs state
      setJobs([response.data.jobProfile, ...jobs]);
      toast({
        title: "Job Created",
        description: "A new job role has been successfully created.",
      });
    }

   
    // Reset form and close dialog
  
    handleCloseDialog()
    setIsDialogOpen(false)
    setCurrentStep(0);
  } catch (error) {
    console.error("Error submitting job data:", error);
    toast({
      variant: "destructive",
      title: "Submission Error",
      description: "There was an error submitting the job data. Please try again.",
    });
  }
};

const handleEdit = (job) => {
  // Populate the form with the job data
  setFormData({
      fullName: job.fullName,
      email: job.email,
      phone: job.phone,
      address: job.address,
      workAddress: job.workAddress,
      linkedIn: job.linkedIn,
      desiredJobTitle: job.desiredJobTitle,
      jobType: job.jobType,
      workLocation: job.workLocation,
      willingToRelocate: job.willingToRelocate,
      salaryRange: job.salaryRange,
      availability: job.availability,
      currentEmploymentStatus: job.currentEmploymentStatus,
      yearsOfExperience: job.yearsOfExperience,
      highestEducation: job.highestEducation,
      fieldOfStudy: job.fieldOfStudy,
      graduationYear: job.graduationYear,
      primarySkills: job.primarySkills,
      languages: job.languages,
      resume: job.resume, // Assuming this is a file object or URL
      coverLetter: job.coverLetter, // Assuming this is a file object or URL
      personalStatement: job.personalStatement,
      heardAboutUs: job.heardAboutUs
    
  });
  console.log(formData)
  setEditingJobId(job.id); // Set the editing job ID
  setIsDialogOpen(true); // Open the dialog
};

const handleCloseDialog = () => {
  console.log("Closing dialog..."); // Debugging line
  // Reset form data and close the dialog
  setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      workAddress: '',
      desiredJobTitle: '',
      jobType: '',
      workLocation: '',
      willingToRelocate: '',
      salaryRange: '',
      availability: '',
      currentEmploymentStatus: '',
      yearsOfExperience: '',
      highestEducation: '',
      fieldOfStudy: '',
      graduationYear: '',
      primarySkills: '',
      languages: '',
      resume: null,
      coverLetter: null,
      personalStatement: '',
      heardAboutUs: '',
  });
  setEditingJobId(null); // Reset editing job ID
  setIsDialogOpen(false); // Close the dialog
  setCurrentStep(0)
};

useEffect(() => {
  if(!isDialogOpen && editingJobId) {
      handleCloseDialog()
  }
},[isDialogOpen])


  const handleDelete = async(id) => {
    setJobs(jobs.filter(job => job.id !== id))
    const response =  await axios.delete(`/api/jobProfile`, {
      data: {
        id: id
      }
    }) 

    if(response.status == 200) {
      toast({
        title: "Job Deleted",
        description: "The job role has been successfully deleted.",
      })
    }
   
   
  }

  const renderStepIndicator = () => {
    return (
      <div className="relative mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                  ${index === currentStep ? 'ring-4 ring-blue-200' : ''}
                `}
                initial={{ scale: 1 }}
                animate={{ scale: index === currentStep ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </motion.div>
              <span className="text-xs mt-2 text-center hidden sm:block">{step.title}</span>
              <span className="text-xs mt-2 text-center sm:hidden">
                {step.title.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200 -z-10">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    )
  }
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={cn(errors.fullName && "border-red-500")}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={cn(errors.phone && "border-red-500")}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="workAddress">Job Location *</Label>
                <Input
                  id="workAddress"
                  name="workAddress"
                  value={formData.workAddress}
                  onChange={handleInputChange}
                  className={cn(errors.workAddress && "border-red-500")}
                />
                {errors.workAddress && <p className="text-red-500 text-sm mt-1">{errors.workAddress}</p>}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="linkedIn">LinkedIn Profile URL</Label>
                <Input
                  id="linkedIn"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="desiredJobTitle">Desired Job Title *</Label>
                <Input
                  id="desiredJobTitle"
                  name="desiredJobTitle"
                  value={formData.desiredJobTitle}
                  onChange={handleInputChange}
                  className={cn(errors.desiredJobTitle && "border-red-500")}
                />
                {errors.desiredJobTitle && <p className="text-red-500 text-sm mt-1">{errors.desiredJobTitle}</p>}
              </div>
              <div>
                <Label htmlFor="jobType">Preferred Job Type *</Label>
                <Select  value={formData.jobType} name="jobType" onValueChange={(value) =>
    handleInputChange({ target: { name: 'jobType', value } })
  }>
                  <SelectTrigger className={cn(errors.jobType && "border-red-500")}>              
                      <SelectValue     placeholder="Select job type" />
                    
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
              </div>
              <div>
                <Label htmlFor="workLocation">Preferred Work Location *</Label>
                <Select value={formData.workLocation} name="workLocation" onValueChange={(value) => handleInputChange({ target: { name: 'workLocation', value } })}>
                  <SelectTrigger className={cn(errors.workLocation && "border-red-500")}>
                    <SelectValue placeholder="Select work location" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                {errors.workLocation && <p className="text-red-500 text-sm mt-1">{errors.workLocation}</p>}
              </div>
              <div>
                <Label>Willing to Relocate? *</Label>
                <RadioGroup  name="willingToRelocate" onValueChange={(value) => handleInputChange({ target: { name: 'willingToRelocate', value } })}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="relocate-yes" />
                    <Label htmlFor="relocate-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="relocate-no" />
                    <Label htmlFor="relocate-no">No</Label>
                  </div>
                </RadioGroup>
                {errors.willingToRelocate && <p className="text-red-500 text-sm mt-1">{errors.willingToRelocate}</p>}
              </div>
              <div>
                <Label htmlFor="salaryRange">Desired Salary Range</Label>
                <Input
                  id="salaryRange"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="availability">Availability to Start</Label>
                <Input
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentEmploymentStatus">Current Employment Status *</Label>
                <Select value={formData.currentEmploymentStatus} name="currentEmploymentStatus" onValueChange={(value) => handleInputChange({ target: { name: 'currentEmploymentStatus', value } })}>
                  <SelectTrigger className={cn(errors.currentEmploymentStatus && "border-red-500")}>
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
                {errors.currentEmploymentStatus && <p className="text-red-500 text-sm mt-1">{errors.currentEmploymentStatus}</p>}
              </div>
              <div>
                <Label htmlFor="yearsOfExperience">Years of Work Experience *</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className={cn(errors.yearsOfExperience && "border-red-500")}
                />
                {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
              </div>
              <div>
                <Label htmlFor="highestEducation">Highest Educational Qualification *</Label>
                <Select value={formData.highestEducation} name="highestEducation" onValueChange={(value) => handleInputChange({ target: { name: 'highestEducation', value } })}>
                  <SelectTrigger className={cn(errors.highestEducation && "border-red-500")}>
                    <SelectValue placeholder="Select highest education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">Ph.D.</SelectItem>
                  </SelectContent>
                </Select>
                {errors.highestEducation && <p className="text-red-500 text-sm mt-1">{errors.highestEducation}</p>}
              </div>
              <div>
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  name="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="primarySkills">Primary Skills *</Label>
                <Textarea
                  id="primarySkills"
                  name="primarySkills"
                  value={formData.primarySkills}
                  onChange={handleInputChange}
                  className={cn(errors.primarySkills && "border-red-500")}
                />
                {errors.primarySkills && <p className="text-red-500 text-sm mt-1">{errors.primarySkills}</p>}
              </div>
              <div>
                <Label htmlFor="languages">Languages *</Label>
                <Input
                  id="languages"
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  className={cn(errors.languages && "border-red-500")}
                />
                {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
              </div>
            </div>
          </>
        )
      case 4:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resume">Upload Resume *</Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  onChange={handleFileChange}
                  className={cn(errors.resume && "border-red-500")}
                />
                {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
              </div>
              <div>
                <Label htmlFor="coverLetter">Upload Cover Letter</Label>
                <Input
                  id="coverLetter"
                  name="coverLetter"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <Label htmlFor="personalStatement">Personal Statement *</Label>
                <Textarea
                  id="personalStatement"
                  name="personalStatement"
                  value={formData.personalStatement}
                  onChange={handleInputChange}
                  className={cn(errors.personalStatement && "border-red-500")}
                />
                {errors.personalStatement && <p className="text-red-500 text-sm mt-1">{errors.personalStatement}</p>}
              </div>
              <div>
                <Label htmlFor="heardAboutUs">How did you hear about us?</Label>
                <Input
                  id="heardAboutUs"
                  name="heardAboutUs"
                  value={formData.heardAboutUs}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }
  return (
    <div className="w-screen h-screen overflow-y-auto  ">
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

      <div className="  grid grid-row-12  text-black dark:text-white  bg-white dark:bg-neutral-700  rounded-s-3xl">
      <div className="min-h-screen bg-white rounded-l-3xl p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold text-gray-900">Job Dashboard</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}  >
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto classy-scrollbar">
              <DialogHeader>
                <DialogTitle>{editingJobId ? 'Edit Job Role' : 'Create New Job Role'}</DialogTitle>
                <DialogDescription>Fill out the form to {editingJobId ? 'edit the' : 'create a new'} job role.</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                {renderStepIndicator()}
                {renderStep()}
              </div>
              <div className="mt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                
                  <Button disabled={loading} onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700 text-white">

                  {loading ? (<div> <Loader2 className="animate-spin" />  Submitting... </div>) : (currentStep === steps.length - 1 ? 'Submit' : 'Continue')}
                </Button>
            
             
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isVisible && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 sm:p-4 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Zap className="text-yellow-300 animate-pulse" size={24} />
              <div>
                <h2 className="text-white font-bold text-base sm:text-lg">Supercharge your experience with our extension!</h2>
                <a href="#" className="text-teal-200 hover:text-teal-100 underline text-sm">Discover the benefits</a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-yellow-400 text-emerald-800 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition duration-300 text-sm sm:text-base">
                Get Extension
              </button>
              <X 
                className="text-white cursor-pointer hover:text-gray-200" 
                size={24} 
                onClick={() => setIsVisible(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6  lg:grid-cols-6 md:grid-cols-5 ">
      <div className="lg:col-span-4 md:col-span-3">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="p-4 border-b">
            <CardTitle className="text-xl font-semibold">Application Overview</CardTitle>
            <div className="flex items-center">
              <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block mr-1"></span>
              <h1>Job View</h1>
              </div>

              <div className="flex items-center ml-2">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-1"></span>
              <h1>Job Applied</h1>
              </div>
          </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
                  <Bar dataKey="interviews" fill="#10b981" name="Interviews" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        </div>

      {/* 3 col */}
        <div className=" flex flex-col gap-6  lg:col-span-2 md:col-span-2 ">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-blue-600 text-white p-4">
              <CardTitle className="text-lg font-semibold">Total Job Roles</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-3xl font-bold">{jobs.length}</div>
          
            </CardContent>
          </Card>
          <CredentialsDisplay email={credentials.email} password={credentials.passkey} />
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-purple-600 text-white p-4">
              <CardTitle className="text-lg font-semibold">Jobs Applied</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-3xl font-bold">{jobApplied}</div>
           
            </CardContent>
          </Card>
        </div>

      </div>
        <div>
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="p-4 border-b">
            <CardTitle className="text-xl font-semibold">Recent Job Roles</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
             
              {jobs.map((job) => (
                
                <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all hover:shadow-md">
                  <div className="flex items-start sm:items-center space-x-4 mb-4 sm:mb-0">
                    <Briefcase className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">{job.desiredJobTitle}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.address}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                     
                        {formatDistanceToNow(new Date(job.updatedAt), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
        </div>
        </div>
    </div>
  )
};


const CredentialsDisplay = ({ email = "user@example.com", password = "password123" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full  mx-auto border border-gray-200">
      <div className="bg-green-400  rounded-t-lg  flex justify-between items-center p-4 ">
        <h2 className="text-white text-xl font-semibold">Credentials</h2>
        <div className="relative">
      <Info
        size={18}
        className="text-white cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {showTooltip && (
        <div
          className="absolute top-0 bg-white text-gray-800 p-2 rounded shadow-md text-xs w-48 z-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          These credentials are used for logging into the extension.
        </div>
      )}
    </div>
      </div>
      
      <div className=" px-4 pt-4 flex md:flex-col lg:flex-row md:items-start lg:items-center">
        <div className="flex items-center text-gray-600">
          <Mail className="mr-2" size={18} />
          <span className="text-sm">Email:</span>
        </div>
        <div className="bg-gray-50 rounded border-2 px-3 mb-2 py-2 text-gray-800 text-sm font-mono ml-2 md:ml-0 lg:ml-2">
          {email}
        </div>
      </div>
      
      <div className="flex px-4 pb-4 md:items-start  lg:items-center  md:flex-col lg:flex-row  ">
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center">
            <Lock className="mr-2" size={18} />
            <span className="text-sm">Password</span>
          </div>
        </div>
        <div className="flex">
        <div className="bg-gray-50 border-2 rounded px-3 py-2 text-gray-800 text-sm font-mono md:ml-0 lg:ml-2 ml-2">
          {showPassword ? password : '•••••••••••••••'}
        </div>
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="focus:outline-none text-gray-400 hover:text-gray-600 transition-colors ml-2"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        </div>
      </div>
    </div>
  );
};