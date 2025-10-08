"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        "bg-content2 w-full p-4 rounded-lg shadow-[0_0_15px_-3px_black,0_0px_6px_-4px_black] my-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
