/* eslint-disable no-constant-condition */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchChatByProject, fetchChatMessages, sendMessage } from "@/Redux/Chat/Action";
import { store } from "@/Redux/Store";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
// import { use } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { SelectItemIndicator } from "@radix-ui/react-select";
// import ChatBoxAbove from "../../custom/ChatBoxAbove.jsx"
export default function ChatBox() {
  const [message, setMessage] = useState("");

  const {auth, chat} = useSelector(store => store);
  const {id} = useParams();
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(fetchChatByProject(id));
    dispatch(fetchChatMessages(chat.chat?.id));
  },[])

  // useEffect(()=>{
   
  // },[])


  const handleSendMessage = () =>{
    console.log("message entered", message );
    dispatch(sendMessage({
      senderId: auth.user?.id,
      projectId: id,
      content: message,
    }));
    setMessage("");
  }

  const handleMessageChange = (e) =>{
    setMessage(e.target.value);
  }
  return (
    <div className="sticky  customChatCard" style={{paddingBottom:"10px"}}>
      {/* <ChatBoxAbove/> */}
        <div className=" rounded-lg  ">
          <h1 style={{color:"#e3e3e3"}} className="border-b p-3">Chat Box</h1>
          <ScrollArea className="h-[34rem] w-full p-5 flex gap-3 flex-col " style={{}}>
            {chat.messages?.map((item, index)=>
            
            item.sender.id == auth.user.id?
              <div className="flex gap-2 mb-2" key={item} style={{alignItems:"end",paddingLeft:"195px" }}>
              
              <div style={{border:"1px solid #854DFC"}} className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                  <p style={{color:"#e3e3e3"}} className="text-sm">{item.sender?.fullname
  ? item.sender.fullname.charAt(0).toUpperCase() + item.sender.fullname.slice(1)
  : ''}</p>
                  <p className="text-gray-300 text-sm" >{item.content}</p>
                </div>
                <Avatar>
                <AvatarFallback style={{color:"#000"}}>{item.sender.fullname[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>:
            <div className="flex gap-2 mb-2" key={item} style={{alignItems:"end"}}>
            <Avatar>
              <AvatarFallback style={{backgroundColor:"#854DFC"}}>{item.sender.fullname[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div style={{border:"1px solid gray"}} className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                <p style={{color:"#e3e3e3"}} className="text-sm"> {item.sender?.fullname
  ? item.sender.fullname.charAt(0).toUpperCase() + item.sender.fullname.slice(1)
  : ''}</p>
                <p className="text-gray-300 text-sm" >{item.content}</p>
              </div>
          </div>
            )}
          </ScrollArea>
          <div className="chat-type chatType relative p-0">
            <Input 
            style={{color:"white"}}
            placeholder="type message..."
            className="py-7   outline-none 
            focusLoutline-none  rounded-none 
            bor-0"
            value={message} onChange={handleMessageChange}
            />
            <Button onClick={handleSendMessage} className="absolute right-2
            top-3 rounded-full" size="icon" variant="ghost" style={{background:"#e3e3e3"}}>
              <PaperPlaneIcon />
            </Button>
          </div>
        </div>
        <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}