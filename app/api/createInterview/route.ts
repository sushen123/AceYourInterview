import { dbConnect } from "@/lib/db";

export async  function POST(req: Request) {


 try {
    
    const prisma = await dbConnect()
    const body = await req.json()
    
    const response = await prisma.mockInterview.create({
        data: {
          jsonMockResponse: body.jsonMockResponse,
          jobPosition: body.jobPosition,
          jobExperience: body.jobExperience,
          jobDescriptoin: body.jobDescription,
          createdBy: body.createdBy
        }
      })

    return Response.json({
        mockId: response.mockId
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