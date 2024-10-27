"use client"
import { UserButton } from "@clerk/nextjs"

import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import Script from "next/script"
import Banner from "../components/BannerAd"


function DashboardLayout({children}: any)  {

    return (
     
        <div className="h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
          >  
           <Toaster />
      
       {children}
       </ThemeProvider> 
        </div>
         
    )
}

export default DashboardLayout
