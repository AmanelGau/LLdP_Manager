import React from "react";
import { auth } from "@/auth";
import LldpLogo from "../lldp-logo";
import { Bars3Icon } from "@heroicons/react/24/outline";

const header = async () => {
  const session = await auth();

  return (
    <div className="flex justify-between items-center h-full w-full">
      <div className="ml-6 mr-6">
        <LldpLogo clickable width={78} height={48} />
      </div>
      <div className="text-4xl h-[40px]">{session?.user?.name}</div>
      <div className="ml-6 mr-6">
        <Bars3Icon className="w-10" />
      </div>
    </div>
  );
};

export default header;
