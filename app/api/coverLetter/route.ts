import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const prisma = await dbConnect()

   const body = await req.json();
   console.log(body)

   try {
    const userId = await prisma.user.findFirst({
        where: {
            email: body.email
        }
       })
    
       if(userId) {
       const result = await prisma.coveLetters.create({
        data: {
            userId: userId?.id,
            name: body?.name,
            

        }
       })
       const resumeId = result.id
    
    
       return Response.json({
        message: "Cover Letter Created Successfully",
        id: resumeId
       })
    }
    
     
    
   } catch (error) {
    console.log(error)
      return Response.json({
        message: "Error while creating",
        error: error
      }, {
        status: 400
      })
   }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');

    if (!email) {
        return NextResponse.json({ message: "Email not provided" }, { status: 400 });
    }

    const prisma = await dbConnect();

    try {
        const user = await prisma.user.findFirst({
            where: { email: email }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const userId = user.id;

        // Get total count
        const totalCount = await prisma.coveLetters.count({
            where: { userId: userId }
        });

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Fetch paginated results
        const resumes = await prisma.coveLetters.findMany({
            where: { userId: userId },
            skip: skip,
            take: limit,
            orderBy: { createdAt: 'desc' } // Assuming you want the newest resumes first
        });

        return NextResponse.json({
            message: "Fetched Successfully",
            resumes: resumes,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount: totalCount
        });

    } catch (error) {
        console.error("Error fetching resumes:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } 
}




export async function PUT(req: NextRequest) {

    const prisma = await dbConnect()

   const body = await req.json();
   console.log(body)

   try {
    const userId = await prisma.user.findFirst({
        where: {
            email: body.email
        }
       })
    
       const result = await prisma.coveLetters.update({
        where: {
            id: body.id
        },
        data: {
            resumeData: body.coverLetterData
        }
       })
    
       
       return Response.json({
        message: "Cover Letter Updated Successfully",
         
       })
    
   } catch (error) {
    console.log(error)
      return Response.json({
        message: "Error while creating",
        error: error
      }, {
        status: 400
      })
   }
}