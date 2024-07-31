
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";





export async  function POST(req: Request) {

   const body = await req.json()
 
    const {data} = body
    console.log("It work")
    const prisma = await dbConnect()
   try {
   
    console.log("It's great to be here")
    const reponse = await prisma.userAnswer.create({
        data: {
            correctAnswer: data.correctAnswer,
            feedback: data.feedback,
            question: data.question,
            rating: parseInt(data.rate),
            userAnswer: data.userAnswer,
            userEmail: data.userEmail,
            mockId: data.mockId
        }
    })
  



console.log("I am fine")

    return NextResponse.json({
      reponse
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
