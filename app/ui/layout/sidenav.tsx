import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const sidenav = () => {
  return (
    <div className="shadow-md z-10 flex h-full flex-col px-4 py-4 w-[64px] text-[0px] transition ease-in-out hover:w-64 hover:text-xl transition-all">
      <Link href="/" className="flex gap-2 items-center">
        <UserIcon className="min-w-8 max-w-8" />
        <div>Vue d'ensemble</div>
      </Link>
    </div>
  );
};

export default sidenav;
