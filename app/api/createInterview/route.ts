import { dbConnect } from "@/lib/db";

export async  function POST(req: Request) {


 try {
    
    const prisma = await dbConnect()
    const body = await req.json()

    const userId = await prisma.user.findFirst({
      where: {
        email: body.createdBy
      }
    })
   
   
    
    const response = await prisma.mockInterview.create({
        data: {
          jsonMockResponse: body.jsonMockResponse,
          jobPosition: body.jobPosition,
          jobExperience: body.jobExperience || "Intermedite",
          jobDescriptoin: body.jobDescription,
          createdBy: body.createdBy,
          userId: userId?.id || ""
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


export async  function DELETE(req: Request) {


  try {
     
     const prisma = await dbConnect()
     const {mockId} = await req.json()
    console.log(mockId)
    const userId = await prisma.mockInterview.delete({
      where: {
        mockId: mockId
      }
    })

    if(!userId) {
      return Response.json({
        message: "Error while deleting",
        success: false
      })
    }

    return Response.json({
      message: "Deleted Successfully",
      success: true
    })


  } catch (error) {
     console.log(error)
     return Response.json({
         message: "Error while deleting",
         error: error
     }, {
         status: 400
     })
  }
   
 }