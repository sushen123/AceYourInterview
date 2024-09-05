import { dbConnect } from "@/lib/db"
import { NextResponse } from "next/server";

export async  function POST(req: Request) {

    const body = await req.json()
  
     const {data} = body
    
     const prisma = await dbConnect()
    try {
    
     const response = await prisma.codingExcercise.create({
         data: {
             mockId: data.mockId,
             question: data.question,
             sourcCode: data.sourceCode,
            correctness: data.correctness,
            deviations: data.deviations,
            edgeCases: data.edgeCases,
            spaceComplexity: data.spaceComplexity,
            timeComplexity: data.timeComplexity,
             userEmail: data.userEmail,
             rate: parseInt(data.rate),
            
         }
     });
   
 
 
 console.log("I am fine")
 
     return NextResponse.json({
       response
     })
    } catch (error:any) {
     
     return NextResponse.json({
         messaage: "Sorry for the incovenince",
         error: error.messaage
     }, {
         status: 400
     })
    }
    
     
 }
 