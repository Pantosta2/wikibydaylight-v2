import NavButtonLink from "@/common/components/layout/NavButtonLink";
import Image from "next/image";
import Link from "next/link";
import DbdLogo from "@/public/DbdLogo.png";
import LanguageSwitcher from "@/common/components/layout/LanguageSwitcher";
interface NavbarUIProps {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  t: (key: string) => string;
}

export default function NavbarUI({
  isOpen,
  toggleMenu,
  closeMenu,
  t,
}: NavbarUIProps) {
  return (
    <nav className="absolute w-screen font-bold z-40 bg-gray-900/20 md:bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeMenu}>
              <Image
                src={DbdLogo}
                alt={t("common.dbdlogo_alt")}
                className="w-40 md:w-45 h-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavButtonLink
              PathUrl="/survivors"
              ButtonName={t("survivors.text")}
            />
            <NavButtonLink PathUrl="/killers" ButtonName={t("killers.text")} />
            <NavButtonLink
              PathUrl="/makeYourOwnBuild"
              ButtonName={t("makeYourOwnBuild.text")}
            />
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              type="button"
              className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              aria-expanded={isOpen}
            >
              <svg
                className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-6 sm:px-3 flex flex-col items-center ">
            <div onClick={closeMenu}>
              <NavButtonLink
                PathUrl="/survivors"
                ButtonName={t("survivors.text")}
              />
            </div>
            <div onClick={closeMenu}>
              <NavButtonLink
                PathUrl="/killers"
                ButtonName={t("killers.text")}
              />
            </div>
            <div onClick={closeMenu}>
              <NavButtonLink
                PathUrl="/makeYourOwnBuild"
                ButtonName={t("makeYourOwnBuild.text")}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
