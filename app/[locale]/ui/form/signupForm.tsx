"use client";

import { lusitana } from "@/app/[locale]/ui/fonts";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "../button";
import { FormEventHandler, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/app/[locale]/lib/actions/authActions";
import { useI18n } from "@/app/local/client";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const t = useI18n();
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const res = await signup(email, name, password);

    if (res === "error") {
      setError("error");
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-content1 px-6 pb-4 pt-8 dark:text-primary">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-center `}>
          {t("common.account_creation")}
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="name"
            >
              {t("common.name")}
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 border-content2 bg-background text-foreground"
                id="name"
                type="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Entrer votre nom"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="email"
            >
              {t("common.email")}
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
              {t("common.password")}
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 border-content2 bg-background text-foreground"
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
          aria-disabled={isPending}
          className="mt-4 w-full justify-self-end "
          type="submit"
        >
          {t("common.validate")}
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-error" />
              <p className="text-sm text-error">{error}</p>
            </>
          )}
        </div>
        <div className="flex text-foreground">
          {t("common.already_account")}&nbsp;
          <Link href="/login" className="text-blue-500 hover:text-purple-600">
            {t("common.connect")}
          </Link>
        </div>
      </div>
    </form>
  );
}
