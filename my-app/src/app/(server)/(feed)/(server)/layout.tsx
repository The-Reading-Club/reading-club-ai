import React from "react";
import Sidebar from "./_components/Sidebar";
import Followbar from "./_components/Followbar";
import { MyConvexProvider } from "@/components/providers/convex-provider/convex-provider";

interface FeedLayoutNextJSProps {
  children: React.ReactNode;
}
const FeedLayoutNextJS: React.FC<FeedLayoutNextJSProps> = ({ children }) => {
  return children;
  // return (
  //   <div className="h-screen">
  //     <div className="container h-full mx-auto xl:px-30 max-w-6xl">
  //       <div className="grid grid-cols-4 h-full">
  //         <Sidebar />
  //         <div className="col-span-3 lg:col-span-2 border-x-[1px] border-primary bg-secondary bg-opacity-50">
  //           {children}
  //         </div>
  //         <Followbar />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default FeedLayoutNextJS;
