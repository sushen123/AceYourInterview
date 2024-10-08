import { dbConnect } from "@/lib/db";




export async  function POST(req: Request) {

   const user = await req.json()

    const prisma = await dbConnect()
    const result = await prisma.mockInterview.findMany({
        where: {
            createdBy: user?.primaryEmailAddress?.emailAddress

        }
    })

    return Response.json({
        result
    })
    
}



export async function GET(req: Request) {
    

    const {searchParams} = new URL(req.url)
    const interviewId = searchParams.get("interviewId") || ""

    const prisma = await dbConnect()
    const result = await prisma.userAnswer.findMany({
        where: {
            mockId: interviewId
        }
       
    })
   console.log(result)
    return Response.json({
        result
    })
}