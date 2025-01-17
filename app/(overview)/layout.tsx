import SideNav from "@/app/ui/layout/sidenav";
import Header from "@/app/ui/layout/header";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:overflow-hidden">
      <div className="w-full flex-none h-[64px] shadow-md z-10 bg-content1">
        <Header />
      </div>
      <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
        <div className="bg-content1">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
