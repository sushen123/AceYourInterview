"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

 

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

  import {chatSession} from '@/lib/GeminiAi'
import { Loader2 } from "lucide-react";
import {PrismaClient} from '@prisma/client'
import { useRouter } from "next/navigation";
import {ButtonShootingStarBorder} from "@/components/ui/styleButton";
import axios from "axios";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDesc, setJobDescription] = useState<string>("");
  const [jobExp, setJobExp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState<any[]>([]);
  const router = useRouter();
  const {user } = useUser()




    const onSubmit =async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()

     
    try {
      const InputPrompt =
        "Job position " +
        jobPosition +
        "Job Description:" +
        jobDesc +
        "Year of experience " +
        jobExp +
        "Depends on the information please give me 5 interviews question with Answered in JSON format, Give Question Answered as field in JSON, Don't write any other stuff";

      const result = await chatSession.sendMessage(InputPrompt);
      
      const MockJsonResponse = (await result.response.text())
        .replace("```json", "")
        .replace("```", "");

      const parsedResponse = JSON.parse(MockJsonResponse);
      setJsonResponse(parsedResponse);

      const response = await axios.post("/api/createInterview", {
        MockJsonResponse,
        jobPosition,
        jobDesc,
        jobExp,
        user
      });

      if (response.data.mockId) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + response.data.mockId);
      }
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      setLoading(false);
    }
  };
    return <div>
        <ButtonShootingStarBorder textClass="" onClick={()=> {
          setOpenDialog(true)
        }} text="Add" className="" />
        <Dialog   open={openDialog}>
  <DialogTrigger ></DialogTrigger>
  <DialogContent  className="max-w-2xl bg-white">
    <DialogHeader>
      <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
            <div>
                <h2>Add Details about your job position/role, Job description and years of exprience</h2>

                <div className="mt-7 my-3">
                   <label >Job Role/Job Position</label>
                  <Input onChange={(e) => {
                     setJobPosition(e.target.value)
                  }} className="rounded-md" placeholder="Ex. Full Stack Developer" required />
                </div>
                <div  className="my-3">
                   <label >Job Description/ Tech Stack(in short)</label>
                  <Input onChange={(e) => {
                     setJobDescription(e.target.value)
                  }}  className="rounded-md" placeholder="Ex. React, Angular, Nodejs" />
                </div>
                <div className="my-3">
                   <label >Year of experience</label>
                  <Input onChange={(e) => {
                     setJobExp(e.target.value)
                  }}  type="number" className="rounded-md" placeholder="Ex. 2"  max="20" required />
                </div>
            </div>
        <div className="flex gap-5 justify-end">
            <Button type="button" variant={"ghost"} onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>
                {loading ?
                <>
                <Loader2 className="animate-spin" />Generating</>: 'Start Interview'
            }
                </Button>

        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
   
}

export default AddNewInterview