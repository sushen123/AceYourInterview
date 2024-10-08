import { NextRequest, NextResponse } from "next/server"

import { dbConnect } from "@/lib/db"
import { Select } from "@react-three/drei"

export async function PUT(req: NextRequest) {

    const user = await req.json()
    const email = user.email
    const name = user.name
    

    const prisma = await dbConnect()

    const response = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            name: name
        }
    })

    if(!response) {
        return NextResponse.json({
            message: "User not found",
            success: false
        },
    {
        status: 404,
    })
    }

    return NextResponse.json({
        message: "Update Name",
        success: true
    }, {
        status: 200
    })
   

}


export async function GET(req: NextRequest) {

    const prisma = await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    console.log(userId)

    const response = await prisma.mockInterview.findMany({
        where: {
            userId: userId || ""
        },
    })

    if(!response) {
        return NextResponse.json({
            message: "User not found",
            success: false
        },
    {
        status: 404,
    })
    }
    console.log(response)

    return NextResponse.json({
        message: "Fetch details",
        success: true,
        mockInterviews: response
    }, {
        status: 200
    })
   

}