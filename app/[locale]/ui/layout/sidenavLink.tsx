import clsx from "clsx";
import Link from "next/link";

interface Props {
  active: boolean;
  icon: any;
  label: string;
  link: string;
}

const SidenavLink = ({ active, icon, label, link }: Props) => {
  return (
    <Link
      href={link}
      className={clsx(
        "flex gap-2 items-center h-[48px]",
        active ? "text-primary fill-primary" : "text-foreground fill-foreground"
      )}
    >
      {icon}
      <div>{label}</div>
    </Link>
  );
};

export default SidenavLink;
