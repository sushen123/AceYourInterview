import { LayoutDashboard } from "lucide-react"
import AddNewInterview from "./__components/AddNewInterview"
import InterviewList from "./__components/InterviewList"



function Dashboard()  {

    return (
        <div>
          

          <h2 className="font-bold text-2xl">Dashboard</h2>
        <h2>Create and Start your AI Mockup Interview </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 my-5">
           <AddNewInterview />
        </div>

        <InterviewList />
        </div>
    )
}

export default Dashboard