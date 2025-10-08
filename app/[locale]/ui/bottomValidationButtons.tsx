import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import CheckSvg from "./svg/checkSvg";
import CrossSvg from "./svg/crossSvg";

interface Props {
  cancelRef: string;
  onValidate: () => void;
}

const BottomValidationButtons = ({ cancelRef, onValidate }: Props) => {
  return (
    <>
      <button
        onClick={onValidate}
        className="fixed w-16 h-16 p-1 rounded-xl bottom-4 right-28 z-100 bg-green-500 fill-content1 opacity-80 hover:opacity-100"
      >
        <CheckSvg className="fill-white" />
      </button>
      <Link
        href={cancelRef}
        className="fixed w-16 h-16 p-1 rounded-xl bottom-4 right-8 z-100 bg-red-500 fill-content1 opacity-80 hover:opacity-100"
      >
        <CrossSvg className="fill-white" />
      </Link>
    </>
  );
};

export default BottomValidationButtons;
