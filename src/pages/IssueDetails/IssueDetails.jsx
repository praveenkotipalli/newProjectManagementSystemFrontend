import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import Navbar from "../Navbar/Navbar";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { store } from "@/Redux/Store";
import { fetchComments } from "@/Redux/Comment/Action";
// import { store } from "@/Redux/Store";
// import Spidey from "../custom/Spidey";
// import IssueDetailsBg from "../custom/IssueDetailsBg";



export default function IssueDetails() {
  const {projectId, issueId} = useParams();
  const handleUpdateIssueStatus = (status) =>{
    dispatch(updateIssueStatus({status, id: issueId}));
    console.log("updated isssue data ->", status);
  }
  const dispatch = useDispatch();

  // const {id} = useParams();
  const {issue, comment} = useSelector(store=>store);

  useEffect(()=>{
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  },[issueId])

  return (
    <>
    
    <Navbar/>
    
    <div className="px-20  py-10 text-gray-200">
      {/* <IssueDetailsBg/> */}
      {/* <IssueDetailsBg/> */}
      <MagicCard style={{zIndex:"3"}} className="flex justify-between border  p-10 rounded-lg">
        <ScrollArea className="h-[70vh] w-[60%]">
          <div>
            <h1 style={{}} className="text-lg font-semibold text-gray-100">{issue.issueDetails?.title ? issue.issueDetails.title.charAt(0).toUpperCase() + issue.issueDetails.title.slice(1) : "Loading..."}</h1>
            <div className="py-5">
              <h2 className="font-bold text-gray-200 ">
                Description
              </h2>
              <p className=" text-gray-300 text-sm mt-3">
              {issue.issueDetails?.title ? issue.issueDetails.description.charAt(0).toUpperCase() + issue.issueDetails.description.slice(1) : "Loading..."}  
              </p>
            </div>
            <div className="mt-5 " style={{minWidth:"700px"}}>
              <h1 className="pb-3">Activity</h1>
              <Tabs defaultValue="comments"  className="w-[400px]" >
                <TabsList  className="mb-5" >
                  <TabsTrigger  value="all">All</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="all">all section of the activity</TabsContent>
                <TabsContent value="comments">
                  <CreateCommentForm  issueId={issueId}/>
                  <div className="mt-8 space-y-6">
                    {comment.comments.map((item)=><CommentCard item={item} key={item}/>)}
                  </div>  
                </TabsContent>
                <TabsContent value="history">no history</TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>
        {/* <div className="h-screen w-screen" style={{zIndex:"-1", position:"absolute", border:"", bottom:"200px", height:"500px", padding:"90px"}}>
          <Spidey/>
        </div> */}

        <div style={{border:"", zIndex:"", position:"absolute", bottom:"100px", left:"650px", paddingLeft:'10px'}} className="w-full pr-10 ml-60 lg:w-[30%] space-y-2">
        <div style={{zIndex:""}}>
        <Select  onValueChange={handleUpdateIssueStatus}>
  <SelectTrigger style={{zIndex:"2"}} className="w-[180px]">
    <SelectValue placeholder="To Do" />
  </SelectTrigger>
  <SelectContent style={{zIndex:"999"}}>
    <SelectItem value="pending">To Do</SelectItem>
    <SelectItem value="in-progress">In Progress</SelectItem>
    <SelectItem value="done">Done</SelectItem>
  </SelectContent>
</Select>
        </div>

<div style={{zIndex:"-2"}} className="border rounded-lg w-[25rem]">
  <p className="border-b py-3 px-5">Details</p>
  <div className="p-5">
    <div className="space-y-7">

      <div className="flex gap-10 items-center">
        <p className="w-[7rem]">Assignee</p>
        {issue.issueDetails?.assignee?.fullname ? <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 text-xs">
            <AvatarFallback style={{color:"black", fontSize:"bold"}}>
              {issue.issueDetails?.assignee?.fullname[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p>{issue.issueDetails?.assignee?.fullname}</p>
        </div> : <p>unassigned</p>}
      </div>

      <div className="flex gap-10 items-center">
        <p className="w-[7rem]">Labels</p>
        <p>None</p>
      </div>

      <div className="flex gap-10 items-center">
        <p className="w-[7rem]">Status</p>
        <Badge>
          {issue.issueDetails?.status }
        </Badge>
      </div>

      <div className="flex gap-10 items-center">
        <p className="w-[7rem]">Realese</p>
        <p>10-04-2024</p>
      </div>

      <div className="flex gap-10 items-center">
        <p className="w-[7rem]">Reporter</p>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 text-xs">
            <AvatarFallback>
              S
            </AvatarFallback>
          </Avatar>
          <p> Sahithi</p>
        </div>
      </div>

    </div>
  </div>
</div>



        </div>
      </MagicCard>
     
    </div>
    </>
  );
}