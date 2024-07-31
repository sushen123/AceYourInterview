import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url);
    const mockId = searchParams.get("mockId");

    console.log("mockId:", mockId);

    if (!mockId) {
      return NextResponse.json({ message: "Invalid mockId" }, { status: 400 });
    }

   
    const prisma = await dbConnect();

  
    const result = await prisma.mockInterview.findUnique({
      where: {
        mockId: mockId, 
      },
    });

    if (!result) {
      return NextResponse.json({ message: "Result not found", mockId, url: req.url }, { status: 404 });
    }

    return NextResponse.json({ result });
  } catch (error:any) {
    console.error("Error fetching result:", error);
    return NextResponse.json({ message: "Error while getting result", error: error.message }, { status: 500 });
  }
}
