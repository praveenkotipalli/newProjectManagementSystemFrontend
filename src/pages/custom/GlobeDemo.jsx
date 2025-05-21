// // import Globe from "@/components/magicui/globe";

import Globe from "@/components/ui/globe";
import { DockDemo } from "./DockDemo";



// import Globe from "@/components/ui/globe";

export function GlobeDemo() {
  return (
    <div style={{backgroundColor:"none", zIndex:"", bottom:"20px",  top:"30px",  height:"10px"}} className="relative flex  max-w-lg  justify-center overflow-hidden rounded-lg  px-40 pb-40 md:pb-60 md:shadow-xl">
      <DockDemo />
      <Globe className="top-20 "    />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />

    </div>
  );
}
// import Globe from "@/components/magicui/globe";

// export function GlobeDemo() {
//   return (
//     <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 md:shadow-xl">
//       <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
//         Globe
//       </span>
//       <Globe className="top-28" />
//       <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
//     </div>
//   );
// }
