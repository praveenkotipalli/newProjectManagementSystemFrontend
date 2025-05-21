// import { Section } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {  GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, MagnifyingGlassIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import {  Link } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectCard from "../Project/ProjectCard";
import SplineRocket from "../custom/SplineRocket.jsx"
// import Globe from "@/components/ui/globe";
import { GlobeDemo } from "../custom/GlobeDemo";
import Particles from "@/components/ui/particles";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/Redux/Store";
import { fetchProjects, searchProjects } from "@/Redux/Project/Action";
// import { relative } from "path";
// import { Link } from "lucide-react";
// import { Link } from "lucide-react";

export const tags = [
  "all", "react", "next js", "spring boot", "my sql", "node js", "express js", "python", "flask", "django", "javasscript"
];

export default function ProjectList() {

  const [keyword, setKeyword] = useState("");

  const {project} = useSelector(store=>store);

  const dispatch = useDispatch();

  const handleFilterTags = (value) =>{
    if(value === "all") {
      dispatch(fetchProjects({}))
    }else{
    dispatch(fetchProjects({tag:value}))
    }
    // console.log("value", value, section);
  }

  const handleFilterCategory = (value) =>{
    if(value === "all") {
      dispatch(fetchProjects({}))
    }else{
      dispatch(fetchProjects({category:value}))
    }
    // console.log("value", value, section);
  }

  // useEffect(() => {
  //   dispatch(fetchProjects({}))
    
  // }, [])

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  }
  return (
    <>
    <div className='particle relative px-5 lg:px-0 justify-center lg:flex gap-5 py-5' style={{justifyContent:"center",textAlign:"center",alignContent:"center",alignItems:"", margin:"0px 10px"}}>
    <Particles
        className="absolute inset-0 z-[-1]"
        quantity={100}
        ease={80}
        
        refresh
      />
      <section className="filterSection" >
        <Card className="customCard p-5 sticky top-10" style={{border:""}}>
          <div className="flex justify-between lg:w-[20rem]">
            <p className="text-xl -tracking-wider" style={{color:"#e3e3e3"}}>Filters</p>
            <Button variant="ghost" size="icon" className="border-none" >
              <MixerHorizontalIcon style={{color:"#e3e3e3"}}/>
            </Button> 
          </div>
          <CardContent className="mt-5">
            <ScrollArea className="space-y-7 h-[70vh]">
              <div>
                <h1 className="pb-3 text-gray-300 border-b">
                  Category
                </h1>
                <div className="pt-5"  >
                  <RadioGroup  className="space-y-3 pt-5"defaultValue="all" onValueChange={(value)=>handleFilterCategory( value)} >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="all" id="r1" style={{border:"1px solid #854DFC", color:"#854DFC"}} />
                      <Label htmlFor="r1" style={{color:"#854DFC"}} >All</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="fullstack" id="r2" style={{border:"1px solid #854DFC", color:"#854DFC"}} />
                      <Label htmlFor="r2" style={{color:"#854DFC"}}>Fullstack</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="frontend" id="r3" style={{border:"1px solid #854DFC", color:"#854DFC"}} />
                      <Label htmlFor="r3" style={{color:"#854DFC"}}>Frontend</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="backend" id="r4" style={{border:"1px solid #854DFC", color:"#854DFC"}} />
                      <Label htmlFor="r4" style={{color:"#854DFC"}}>Backend</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="pt-9">
                <h1 className="pb-3 text-gray-300 border-b">
                  Tags
                </h1>
                <div className="pt-5">
                  <RadioGroup className="space-y-3 pt-5" defaultValue="all" onValueChange={(value)=>handleFilterTags(value)} >
                    {tags.map((item) => <div key={item} className="flex items-center gap-2 " >
                      <RadioGroupItem  value={item} id={`r1-${item}`} style={{border:"1px solid #854DFC", color:"#854DFC"}} />
                      <Label htmlFor={`r1-${item}`} style={{ color:"#854DFC"}} >{item}</Label>
                    </div>)}
                  </RadioGroup>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>

      <section className=" projectListSection w-full lg:w-[48rem]" style={{position:"relative"}} >
        <ScrollArea  className="space-y h-[88vh]">
        <div className="flex gap-2 items-center pb-5 justify-between">
          <div className="relative p-0 w-full mainSearch" style={{border:"1px solid #454545", boxShadow:"3px 3px 10px #454545"}}>
            <Input 
            
              onChange={handleSearchChange}
              placeholder="search project"
              className="40% px-9 border-none"
              style={{color:"white", border:"1px solid grey"}}
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4" style={{color:"#e3e3e3"}} />
          </div>

        </div>
        <div>
          <div className="space-y-5 min-h-[74vh]" >
              {
                 
                  keyword?project.searchProjects?.map((item,index)=><ProjectCard key={item.id*index} item={item}/>):
                  project.projects?.map((item)=><ProjectCard key={item.id} item={item}/>)
                
              }
          </div>
        </div>
        </ScrollArea>
      </section>

      <section >
      <Card className="customCard p-3 sticky top-10" style={{zIndex:"2"}}>
          <div className="flex justify-between lg:w-[19rem]">
            <p className="text-xl -tracking-wider" style={{ color:"#e3e3e3"}}>
               Connect with us !</p>
            {/* <Button variant="ghost" size="icon">
              <MixerHorizontalIcon/>
            </Button>  */}
            <Link style={{width:"15px",color:"#e3e3e3", height:"15px",marginTop:"8.5px"}}/>
          </div>
          <div  className="flex justify-between lg:w-[19rem]" style={{ marginBottom:"12px"}}>

            <GlobeDemo/>
              {/* <a href="https://www.linkedin.com/in/praveen-kumar-kotipalli-5b0ba528a/"><LinkedInLogoIcon/></a>
              <a href="https://github.com/praveenkotipalli"><GitHubLogoIcon className="gitHubLogo"/></a>
              <a href="https://www.instagram.com/pr4veennn/"><InstagramLogoIcon className="instaLogo"/></a> */}
              {/* <a></a> */}
          </div>
        </Card>
        <div style={{position:"fixed"}} className="">
          <SplineRocket/>
        </div>
      </section>
    </div>
    </>
  );
}