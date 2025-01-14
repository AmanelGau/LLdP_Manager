import { lusitana } from "app/ui/fonts";
import Image from "next/image";

export default function LldpLogo({
  clickable = false,
  height,
  width,
}: {
  clickable?: boolean;
  height: number;
  width: number;
}) {
  return (
    <Image
      src="/Les_Legendes_De_precios_4x-1.png"
      width={width}
      height={height}
      alt="Logo les legendes de precios"
    />
  );
}
