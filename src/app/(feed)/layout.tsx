import { LeftSidebar } from "@/components/left-sidebar";


export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex gap-6 px-4">
      <LeftSidebar /> 
      
      <main className="lg:flex-1 max-w-4xl">
        {children}
      </main>
    </div>
  );
}