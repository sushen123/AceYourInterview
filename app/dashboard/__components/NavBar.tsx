"use client"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import { useParams, usePathname } from "next/navigation"

function NavBar() {

    const path = usePathname();
    

    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex justify-center items-center">
            <Image style={{
            width: "auto",
            height: "auto"
        }} src={"/logo.png"} width={40} height={40} alt="logo"   />
                <h1 className="font-bold text-3xl text-blue-500">DevElevate</h1>
            </div>
        
        <ul className="hidden md:flex gap-6">
            <li className={ `hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard'&&'text-primary font-bold' }
                `}>
                
                Dashboard</li>
                <li className={ `hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard/questions'&&'text-primary font-bold' }
                `}>
                
                Questions</li>
                <li className={ `hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard/upgrade'&&'text-primary font-bold' }
                `}>
                
                Upgrade</li>
                <li className={ `hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path=='/dashboard/how'&&'text-primary font-bold' }
                `}>
                How it works?</li>
        </ul>
        <UserButton />
        </div>
    )
}


export default NavBar
