import { auth } from "@/auth";
import LldpLogo from "../lldp-logo";
import BurgerMenu from "./burgerMenu";

const header = async () => {
  const session = await auth();

  return (
    <div className="flex justify-between items-center h-full w-full">
      <div className="ml-6 mr-6">
        <LldpLogo clickable width={78} height={48} />
      </div>
      <div className="text-4xl h-[40px]">{session?.user?.name}</div>
      <div className="ml-6 mr-6">
        <BurgerMenu />
      </div>
    </div>
  );
};

export default header;
