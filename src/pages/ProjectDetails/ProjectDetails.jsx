import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { DialogTitle } from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import Navbar from "../Navbar/Navbar";
import Particles from "@/components/ui/particles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProjectById } from "@/Redux/Project/Action";
import { store } from "@/Redux/Store";

export default function ProjectDetails() {
  const dispatch = useDispatch();
  const {project} = useSelector(store=>store);
  // console.log("project details", project);
  const {id} = useParams();

  const handleProjectInvitation = () =>{

  }

  useEffect(() =>{
    dispatch(fetchProjectById(id));
    // console.log("project details", id);
  }, [id])
  return (
    <>
    
    <Navbar/>
      <div className="mt-5 lg:px-10" style={{border:""}}>
      <Particles
        className="absolute inset-0 z-[-1]"
        quantity={100}
        ease={80}
        
        refresh
      />
        <div className="lg:flex  gap-5 justify-between pb-4" style={{border:""}}>
          <ScrollArea className="h-[89vh]  lg:w-[69%] pr-2 " style={{border:""}}>
            <div className=" p w-full h-[900px] pr-8 pl-8 "  style={{paddingRight:"8px", paddingLeft:"8px", border:""}} >
              <h1 className="text-lg font-bold pb-5 pt-3 customTextColor  "  >{project.projectDetails?.name &&
  project.projectDetails.name.charAt(0).toUpperCase() + project.projectDetails.name.slice(1)}</h1>
              <div className="space-y-5 pb-10 ">
              <p className="w-full  text-gray-400 text-sm" style={{color:"#797A76"}}>
              {project.projectDetails?.description &&
  project.projectDetails.description.charAt(0).toUpperCase() + project.projectDetails.description.slice(1)}
              </p>
              <div style={{color:"#e3e3e3"}} className="flex">
                <p className="w-36" style={{color:"#854DFC"}}>Project Lead :</p>
                <p className="customTextColor">{project.projectDetails?.owner.fullname &&
  project.projectDetails.owner.fullname.charAt(0).toUpperCase() + project.projectDetails.owner.fullname.slice(1)}
</p>

              </div>
              <div  className="flex">
                <p style={{color:"#854DFC"}} className="w-36">Members :</p>
                <div className="flex items-center gap-2">
                  {project.projectDetails?.team.map((item)=> <Avatar key={item} className="cursor-pointer">
                  {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                    <AvatarFallback>
                      {item.fullname[0].toUpperCase()}
                      </AvatarFallback>
                  </Avatar>
                )}
                </div>
                <Dialog>
                  <DialogTrigger style={{marginLeft:"35px"}}>
                    <Button className="inviteButton" size="sm"  variant="outline" onClick={handleProjectInvitation} >
                      <span >Invite</span>
                      <PlusIcon  className="w-3 h-3 ml-3"/>
                    </Button>
                  </DialogTrigger>
                  <DialogContent style={{backgroundColor:"#171717f4"}}>
                    <DialogHeader>
                      <DialogTitle className=" customTextColor" >Invite user</DialogTitle>
                      <InviteUserForm/>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div style={{color:"#e3e3e3"}} className="flex">
                <p className="w-36" style={{color:"#854DFC"}}>Category :</p>
                <p className="customTextColor">{project.projectDetails?.category &&
  project.projectDetails.category.charAt(0).toUpperCase() + project.projectDetails.category.slice(1)}
</p>

              </div>
              <div className="flex">
                <p style={{color:"#854DFC"}} className="w-36">Status :</p>
                <Badge style={{background:"gray"}}><p>Pending</p></Badge>
              </div>
              <div className="" style={{border:"", width:"350px", marginLeft:"600px", position:"relative", bottom:"210px"}}>
                <img src="/projectDetails.png" title="Me and who?!" style={{marginBottom:"1px"}}/>
          </div>

              
            </div>

            <section style={{border:"", position:"relative",bottom:"380px"}}>
              <p style={{color:"#e3e3e3"}} className="tasksFont py-5 border-b text-lg -tracking-wider ">Tasks</p>
              <div className="lg:flex md:flex gap-3 justify-between py-5  ">
                <IssueList status="pending" title="Todo List"/>
                <IssueList status="in_progress" title="In progress"/>
                <IssueList status="done" title="Done"/>
              </div>
            </section>
            </div>
            
          </ScrollArea>
          <div className="lg:w-[30%] lg:h-[100%] rounded-md sticky right-5 top-12 mb-10">
            <ChatBox/>
          </div>
        </div>
      </div>
    </>
  );
}