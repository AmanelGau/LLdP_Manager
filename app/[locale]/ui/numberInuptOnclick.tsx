"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  initalValue: number;
  inputClassName?: string;
  onValidate: (value: number) => boolean;
}

const NumberInuptOnclick = ({
  initalValue,
  inputClassName,
  onValidate,
}: Props) => {
  const [isInput, setIsInput] = useState<boolean>(false);
  const [value, setValue] = useState<number>(initalValue);
  const ref = useRef<any>(null);

  const onFocusOut = () => {
    setIsInput(false);
  };

  const onKeyDown = (e: any) => {
    console.log("e", e);
    if (e.key === "Enter") {
      onValidate(value) && setIsInput(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onFocusOut();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (!isInput) {
      setValue(initalValue);
    }
  }, [isInput]);

  return isInput ? (
    <input
      ref={ref}
      className={inputClassName}
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      onKeyDown={onKeyDown}
    />
  ) : (
    <div onClick={() => setIsInput(true)}>{initalValue}</div>
  );
};

export default NumberInuptOnclick;
