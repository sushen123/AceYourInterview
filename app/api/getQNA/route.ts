import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";



export async  function GET(req: Request) {

    const url = new URL(req.url);
    const mockId = url.searchParams.get('mockId') || ""

     const prisma = await dbConnect()
    try {

     const response = await prisma.userAnswer.findMany({
         where: {
             mockId: mockId
         } ,
         select: {
            question: true,
            userAnswer: true
         }
     })
 
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
 