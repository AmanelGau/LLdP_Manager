"use client";

import { lusitana } from "app/ui/fonts";
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "../button";
import { useActionState, useState } from "react";
import { AuthActions } from "app/lib/actions";
import Link from "next/link";

export default function LoginForm() {
  const initialState: AuthActions.State = { message: null, errors: {} };
  const [error, formAction, isPending] = useActionState(
    AuthActions.signup,
    initialState
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-content1 px-6 pb-4 pt-8 dark:text-primary">
        <h1 className={`${lusitana.className} mb-3 text-2xl text-center `}>
          Connexion
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="name"
            >
              Nom
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 border-content2 bg-background text-foreground"
                id="name"
                type="name"
                name="name"
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
              E-mail
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 border-content2 bg-background text-foreground"
                id="email"
                type="email"
                name="email"
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
                className="peer block w-full rounded-md border py-[9px] pl-10 text-sm outline-2 border-content2 bg-background text-foreground"
                id="password"
                type="password"
                name="password"
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
          Valider
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {error.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-error" />
              <p className="text-sm text-error">{error.message}</p>
            </>
          )}
        </div>
        <div className="flex text-foreground">
          Déja un compte ? &nbsp;
          <Link href="/login" className="text-blue-500 hover:text-purple-600">
            Se connecter
          </Link>
        </div>
      </div>
    </form>
  );
}
