import Link from "next/link";
import React from "react";
import FeatherSvg from "./svg/featherSvg";

interface Props {
  link: string;
}

const BottomEditButton = ({ link }: Props) => {
  return (
    <Link
      href={link}
      className="fixed w-16 h-16 rounded-xl bottom-4 right-8 z-100 bg-primary fill-content1 opacity-50 hover:opacity-100"
    >
      <FeatherSvg className="fill-foreground w-16 h-16" />
    </Link>
  );
};

export default BottomEditButton;
