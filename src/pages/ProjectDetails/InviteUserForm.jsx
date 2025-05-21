import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { inviteToProject } from "@/Redux/Project/Action";
import { useParams } from "react-router-dom";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "postcss";
// import { useForm } from "react-hook-form";
// import { tags } from "../ProjectList/ProjectList";
// import { Cross1Icon } from "@radix-ui/react-icons";

export default function InviteUserForm() {

    const dispatch = useDispatch();

    const {id} = useParams();
    
    const form = useForm({
        defaultValues:{
            email:"",
        },
    });
    const onSubmit = (data) =>{
        dispatch(inviteToProject({email: data.email, projectId: id}))
        console.log("invited user mail", data);
    }
  return (
    <div>
         <Form {...form } >
            <form className="" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control}
                name="email"
                // description="description"

                render={({field})=>
                <FormItem>
                    <FormLabel ><p style={{textAlign:"right", color:"e3e33"}}> Email</p></FormLabel>
                    <FormControl>
                        <Input {...field} type="email" className="border w-full border-gray-700 py-5 px-5" placeholer="Project name...."/>
                    </FormControl>
                    <FormDescription>
                        Enter the mail of the person you want to invite !
                    </FormDescription>
                    <FormMessage/>
                </FormItem>}
                />
                <DialogClose>
                    <Button variant="" type="submit" className="w-full my-5">
                        Invite
                    </Button>
                </DialogClose>
            </form>
        </Form>
    </div>
  );
}