import { auth } from "@/auth";
import LldpLogo from "../lldp-logo";
import BurgerMenu from "./burgerMenu";
import Link from "next/link";

const Header = async () => {
  const session = await auth();

  return (
    <div className="flex justify-between items-center h-full w-full">
      <Link href="/" className="ml-6 mr-6 cursor-pointer">
        <LldpLogo clickable width={78} height={48} />
      </Link>
      <div className="text-4xl h-[40px]">{session?.user?.name}</div>
      <div className="ml-6 mr-6">
        <BurgerMenu />
      </div>
    </div>
  );
};

export default Header;
