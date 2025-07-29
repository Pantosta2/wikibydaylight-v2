import { usePathname } from "next/navigation";
import { useNavigation } from "@/common/context/NavigationContext";
import Link from "next/link";

type ButtonType = {
  ButtonName: string;
  PathUrl: string;
};

export default function NavButton({ ButtonName, PathUrl }: ButtonType) {
  const pathname = usePathname();
  const { isPending } = useNavigation();

  const isActive = pathname.startsWith(PathUrl);

  return (
    <Link
      href={PathUrl}
      className="text-white text-lg text-shadow-lg text-shadow-zinc-950 bg-transparent px-4 py-2 rounded border border-white/0 hover:border-white hover:border- transition-colors duration-300 uppercase cursor-pointer"
      aria-disabled={isActive || isPending}
    >
      {ButtonName}
    </Link>
  );
}
