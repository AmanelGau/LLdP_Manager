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
      <div className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
        <h1
          className={`${lusitana.className} mb-3 text-2xl text-center dark:text-purple-700`}
        >
          Connexion
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-purple-700"
              htmlFor="name"
            >
              Nom
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-800 dark:bg-gray-950"
                id="name"
                type="name"
                name="name"
                placeholder="Entrer votre nom"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-purple-700"
              htmlFor="email"
            >
              E-mail
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-800 dark:bg-gray-950"
                id="email"
                type="email"
                name="email"
                placeholder="Entrer votre adresse e-mail"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-purple-700"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-800 dark:bg-gray-950"
                id="password"
                type="password"
                name="password"
                placeholder="Entrer votre mot de passe"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error.message}</p>
            </>
          )}
        </div>
        <div className="flex">
          Déja un compte ? &nbsp;
          <Link href="/login" className="text-blue-500 hover:text-purple-600">
            Se connecter
          </Link>
        </div>
      </div>
    </form>
  );
}
