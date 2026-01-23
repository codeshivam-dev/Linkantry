import Navbar from "@/modules/home/components/Navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function HomeLayout({ children }: Props) {
  return (
    <main className="relative flex flex-col min-h-screen">
      <div 
        className="fixed inset-0 -z-10 h-full w-full bg-background 
        dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] dark:bg-[size:16px_16px] 
        bg-[radial-gradient(#dadde2_1px,transparent_1px)] bg-[size:16px_16px]" 
      />
      <Navbar />

      <div className="flex flex-1 flex-col px-4 pb-4">
        {children}
      </div>
    </main>
  );
}