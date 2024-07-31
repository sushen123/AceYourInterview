import { dbConnect } from "@/lib/db";

import { useUser } from "@clerk/nextjs";

export async  function POST(req: Request) {

   


 try {
    
    const prisma = await dbConnect()
    const body = await req.json()
    console.log(body)
    const response = await prisma.mockInterview.create({
        data: {
          jsonMockResponse: body.MockJsonResponse,
          jobPosition: body.jobPosition,
          jobExperience: body.jobExp,
          jobDescriptoin: body.jobDesc,
          createdBy: body.user?.primaryEmailAddress?.emailAddress || ""
        }
      })

    return Response.json({
        mockId: response.mockId
    })
 } catch (error) {
    
    return Response.json({
        message: "Error while creating",

        error: error
    }, {
        status: 400
    })
 }
    
    
}