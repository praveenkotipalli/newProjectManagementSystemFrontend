import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteComment } from "@/Redux/Comment/Action";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";

export default function CommentCard({item}) {

    const dispatch = useDispatch();

    const handleDelete = () =>{
        dispatch(deleteComment(item.id));
    }
  return (
    <div style={{zIndex:"3"}} className="flex items-center gap-4">
        <div className="flex items-center gap-4">
            <Avatar style={{color:"black"}} className="font-bold">
                <AvatarFallback>{item.user.fullname[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <p>{item.user.fullname.charAt(0).toUpperCase() + item.user.fullname.slice(1)}</p>
                <p>{item.content}</p>
            </div>
        </div>
        <Button className="rounded-full" variant="ghost" size="icon" onClick={ handleDelete}>
            <TrashIcon/>
        </Button>
    </div>
  );
}