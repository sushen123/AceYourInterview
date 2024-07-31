import { UserButton } from "@clerk/nextjs"

import NavBar from './__components/NavBar'

function DashboardLayout({children}: any)  {

    return (
        <div >
       <NavBar />
       <div className="mx-5 md:mx-20 lg:mx-36">
       {children}
       </div>


        </div>
   
    )
}

export default DashboardLayout
