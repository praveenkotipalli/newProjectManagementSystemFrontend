import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteProject, fetchProjects } from "@/Redux/Project/Action";
// import { DropdownMenu, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({item}) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleDelete = (projectId) =>{
        dispatch(deleteProject({projectId: item.id}));
        // window.location.reload();
        // dispatch(fetchProjects());
    }
  return (
    <Card className="customCard p-5 w-full lg:max-w-3xl">
        <div className="space-y-5">
            <div className="space-y-2">
                <div className="flex justify-between">
                    <div className="flex items-center gap-5">
                        <h1 onClick={()=>navigate("/project/" + item.id)} className="cursor-pointer font-bold text-black customTextColor text-lg">
                        {item.name}
                        </h1>
                        <DotFilledIcon/>
                        <p className="text-sm text-gray-400" style={{color:"gray"}}>{item.category}</p>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="border-none">
                                <Button  variant="ghost" size="icon" className="border-none" style={{color:"white"}}>
                                    <DotsVerticalIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    Update
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDelete}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <p className="flex  text-gray-500 text-sm" style={{textAlign:"left", color:"#797A76"}}>
                   {item.description}
                </p>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
                
                {item.tags.map((tag)=><Badge key={item} style={{ color:"#854DFC"}}>{tag}</Badge>)}
                {/* <Badge>Angular</Badge>
                <Badge>Spring boot</Badge>
                <Badge>MySql</Badge> */}
            </div>
        </div> 
    </Card>
  );
}