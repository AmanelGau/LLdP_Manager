import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

interface Props {
  link: string;
}

const BottomEditButton = ({ link }: Props) => {
  return (
    <Link
      href={link}
      className="fixed w-14 h-14 p-2 rounded-xl bottom-4 right-8 z-100 bg-foreground fill-content1 opacity-80 hover:opacity-100"
    >
      <PencilIcon className="stroke-background" />
    </Link>
  );
};

export default BottomEditButton;
