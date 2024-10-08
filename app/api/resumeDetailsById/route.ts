import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
 
    const resumeId = searchParams.get('id')
  
    const prisma = await dbConnect();

    try {
       
      
        const resume = await prisma.resumeDetails.findFirst({
            where: { id: resumeId || "" }
           
        });
        console.log(resume)

        return NextResponse.json({
            message: "Fetched Successfully",
            resume: resume,
          
        });

    } catch (error) {
        console.error("Error fetching resumes:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } 
}