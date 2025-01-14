import LldpLogo from "@/app/ui/lldp-logo";
import LoginForm from "app/ui/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg p-3">
          <div className="text-white">
            <LldpLogo height={370} width={600} />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
