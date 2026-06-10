import { LeftSidebar } from "@/components/left-sidebar";


export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto lg:flex gap-6">
      <LeftSidebar /> 
      
      <main className="lg:flex-1 max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}