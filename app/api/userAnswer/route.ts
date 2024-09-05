
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";





export async  function POST(req: Request) {

   const body = await req.json()
 
    const {data} = body
    console.log("It work")
    const prisma = await dbConnect()
   try {

    const questionExist = await prisma.userAnswer.findFirst({
        where: {
            mockId: data.mockId,
            question: data.question
        }
    })

    if(questionExist) {
        
        const response = await prisma.userAnswer.update({
            where: {
                id: questionExist.id
            },
            data: {
            question: data.question,
            correctAnswer: data.correctAnswer,
            userAnswer: data.userAnswer,
            
            // Ratings
            overallRating: parseInt(data.overallRating),
            contentRating: parseInt(data.contentRating),
            clarityRating: parseInt(data.clarityRating),
            relevanceRating: parseInt(data.relevanceRating),
            confidenceRating: parseInt(data.confidenceRating),
            problemSolvingRating: data.problemSolvingRating ? parseInt(data.problemSolvingRating) : null,
            technicalRating: data.technicalRating ? parseInt(data.technicalRating) : null,
            behavioralInsightRating: data.behavioralInsightRating ? parseInt(data.behavioralInsightRating) : null,
            situationalJudgmentRating: data.situationalJudgmentRating ? parseInt(data.situationalJudgmentRating) : null,
            
            // Feedback
            contentFeedback: data.confidenceFeedback,
            clarityFeedback: data.clarityFeedback,
            relevanceFeedback: data.relevanceFeedback,
            confidenceFeedback: data.confidenceFeedback,
            problemSolvingFeedback: data.problemSolvingFeedback || null,
            technicalFeedback: data.technicalFeedback || null,
            behavioralInsightFeedback: data.behavioralInsightFeedback || null,
            situationalJudgmentFeedback: data.situationalJudgmentFeedback || null,
            
            userEmail: data.userEmail, 
            }
            
        })

         return NextResponse.json({
      response
    })

    }
   
    console.log("It's great to be here")
    const response = await prisma.userAnswer.create({
        data: {
            mockId: data.mockId,
            question: data.question,
            correctAnswer: data.correctAnswer,
            userAnswer: data.userAnswer,
            
            // Ratings
            overallRating: parseInt(data.overallRating),
            contentRating: parseInt(data.contentRating),
            clarityRating: parseInt(data.clarityRating),
            relevanceRating: parseInt(data.relevanceRating),
            confidenceRating: parseInt(data.confidenceRating),
            problemSolvingRating: data.problemSolvingRating ? parseInt(data.problemSolvingRating) : null,
            technicalRating: data.technicalRating ? parseInt(data.technicalRating) : null,
            behavioralInsightRating: data.behavioralInsightRating ? parseInt(data.behavioralInsightRating) : null,
            situationalJudgmentRating: data.situationalJudgmentRating ? parseInt(data.situationalJudgmentRating) : null,
            
            // Feedback
            contentFeedback: data.confidenceFeedback,
            clarityFeedback: data.clarityFeedback,
            relevanceFeedback: data.relevanceFeedback,
            confidenceFeedback: data.confidenceFeedback,
            problemSolvingFeedback: data.problemSolvingFeedback || null,
            technicalFeedback: data.technicalFeedback || null,
            behavioralInsightFeedback: data.behavioralInsightFeedback || null,
            situationalJudgmentFeedback: data.situationalJudgmentFeedback || null,
            
            userEmail: data.userEmail,
            createdAt: new Date(),
            
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
