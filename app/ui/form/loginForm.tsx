"use client";

import { lusitana } from "app/ui/fonts";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "../button";
import { FormEventHandler, useState } from "react";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { loginCredential, loginGoogle } from "@/app/lib/actions/authActions";
import GoogleSvg from "../svg/googleSvg";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    console.log(email, password);

    await loginCredential(email, password);

    // const res = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });
    // console.log(res);

    // if (res?.error) {
    //   setError(res.error);
    // } else {
    //   router.push("/");
    // }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-content1 px-6 pb-4 pt-8 dark:text-primary">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-center `}>
          Connexion
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="email"
            >
              E-mail
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 border-content2 bg-background text-foreground"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrer votre adresse e-mail"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border  py-[9px] pl-10 text-sm outline-2 border-content2 bg-background text-foreground"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrer votre mot de passe"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
        <Button
          className="mt-4 w-full justify-self-end "
          aria-disabled={isPending}
        >
          Se connecter
          <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-error" />
              <p className="text-sm text-error">{error}</p>
            </>
          )}
        </div>
        <div className="flex justify-between text-blue-500">
          <Link href="/signup" className="hover:text-purple-600">
            Créer un compte
          </Link>
          <Link href="/forgotpwd" className="hover:text-purple-600">
            Mot de passe oublié ?
          </Link>
        </div>

        <div className="flex gap-8 justify-center items-center">
          <Divider className="w-[30%]" />
          OU
          <Divider className="w-[30%]" />
        </div>
        <button
          className="flex items-center grow justify-self-center m-4 rounded-3xl px-6 h-12 border-2 border-primary gap-4 font-bold text-primary-foreground hover:bg-primary/70"
          onClick={() => loginGoogle()}
        >
          <GoogleSvg className="w-8 h-8" />
          Connexion avec Google
        </button>
      </div>
    </form>
  );
}
