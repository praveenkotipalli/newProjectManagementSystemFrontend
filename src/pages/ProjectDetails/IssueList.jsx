import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import IssueCard from "./IssueCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateIssueForm from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchIssues } from "@/Redux/Issue/Action";
import { store } from "@/Redux/Store";

export default function IssueList({title, status}) {

  const dispatch = useDispatch();
  const {id} = useParams();

  const {issue} = useSelector(store=>store);

  useEffect(() => {
    dispatch(fetchIssues(id));
  }, [id])
  return ( 
    <div>
      <Dialog>
        <Card className="w-full md:w-[300px] lg:w-[310px] mb-12">
          <CardHeader>
            <CardTitle>
              {title}
            </CardTitle>
            <CardContent className="px-2 ">
              <div className="space-y-2">
                {
                  issue.issues.filter((issue=>issue.status==status)).map((item)=><IssueCard item={item} key={item.id}/>)
                }
              </div>
            </CardContent>
            <CardFooter>
              <DialogTrigger>
                
                <Button variant="outline" className="w-full flex items-center gap-2"><PlusIcon/> Create Issue</Button>
              </DialogTrigger>
            </CardFooter>
          </CardHeader>
        </Card>
        <DialogContent style={{backgroundColor:"#171717f4"}}>
          <DialogHeader>
            <DialogTitle style={{color:"white"}}>Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm status={status}/>
           
        </DialogContent>
      </Dialog>
    </div>
  );
}