import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createIssue } from "@/Redux/Issue/Action";
// import { title } from "process";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CreateIssueForm({status}) {

    const {id} = useParams();
    const dispatch = useDispatch();

  const form = useForm({
    defaultValues:{
        issueName:"",
        description:"",
    },
});
const onSubmit = (data) =>{
    data.projectId = id;
    dispatch(createIssue({
        title: data.issueName,
        description: data.description,
        projectId: id,
        status,
     })
)
    console.log("issue details", data);
}
  return (
    <div >
      
      <Form  {...form } >
            <form   onSubmit={form.handleSubmit(onSubmit)} >
                <FormField control={form.control}
                name="issueName"
                // description="description"

                render={({field})=>
                <FormItem>
                    <FormLabel ><p style={{textAlign:"right", color:"white"}}>Issue name</p></FormLabel>
                    <FormControl>
                        <Input style={{color:"white"}} {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholer="Project name...."/>
                    </FormControl>
                    <FormDescription>
                        Enter the issue name!
                    </FormDescription>
                    <FormMessage/>
                </FormItem>}
                />
                <FormField control={form.control}
                name="description"
                // description="description"

                render={({field})=>
                <FormItem>
                    <FormLabel ><p style={{textAlign:"right", color:"white"}}>Description</p></FormLabel>
                    <FormControl>
                        <Input style={{color:"white"}} {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholer="Project name...."/>
                    </FormControl>
                    <FormDescription>
                        Enter the issue description!
                    </FormDescription>
                    <FormMessage/>
                </FormItem>}
                />
                <DialogClose>
                    <Button variant="" type="submit" className="w-full my-5">
                        Create Issue
                    </Button>
                </DialogClose>
            </form>
        </Form>
    </div>
  );
}