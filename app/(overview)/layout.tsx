import SideNav from "@/app/ui/user/sidenav";
import Header from "@/app/ui/user/header";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:overflow-hidden dark:bg-gray-900">
      <div className="w-full flex-none h-[64px] shadow-md z-10">
        <Header />
      </div>
      <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
        <SideNav />
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-50 dark:bg-gray-950">
          {children}
        </div>
      </div>
    </div>
  );
}
