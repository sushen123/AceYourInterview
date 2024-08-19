import { UserButton } from "@clerk/nextjs"

import NavBar from './__components/NavBar'
import Image from "next/image"
import { ThemeProvider } from "@/components/ui/theme-provider"


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
       {children}
       </ThemeProvider> 
        </div>
   
    )
}

export default DashboardLayout
