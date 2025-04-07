"use client";

import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  activeTab: string | null;
  children?: ReactNode;
  className?: string;
  createTabContent: (tab: any) => any;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  tabs: any[];
}

const TabCard = ({
  activeTab,
  children,
  className,
  createTabContent,
  setActiveTab,
  tabs,
}: Props) => {
  return (
    <div className="w-full shadow-[0_0_15px_-3px_black,0_0px_6px_-4px_black] rounded-lg my-4">
      <div className={`flex rounded-t-lg flex-nowrap w-full`}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={clsx(
              "grow cursor-pointer",
              activeTab === tab.name ? "rounded-t-lg bg-content2" : ""
            )}
            onClick={() => {
              setActiveTab(tab.name);
            }}
          >
            {createTabContent(tab)}
          </div>
        ))}
      </div>
      <div
        className={clsx(
          "bg-content2 w-full p-4 rounded-b-lg shadow-md",
          tabs.findIndex((tab) => tab.name === activeTab) === 0
            ? "rounded-tr-lg"
            : tabs.findIndex((tab) => tab.name === activeTab) ===
              tabs.length - 1
            ? "rounded-tl-lg"
            : "rounded-t-lg",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default TabCard;
