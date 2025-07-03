"use client";

import { useTranslations } from "next-intl";
import NavButtonLink from "@/components/layout/NavButtonLink";
import Image from "next/image";
import Link from "next/link";
import DbdLogo from "@/public/DbdLogo.png";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <nav className="absolute w-screen general-scrollbar font-bold z-30">
      <ul className="flex flex-row items-center justify-center p-2 w-full">
        <li className="flex flex-4">
          <Link href="/">
            <Image
              src={DbdLogo}
              alt={t("common.dbdlogo_alt")}
              className="w-45 h-15"
              priority
            />
          </Link>
        </li>
        <li
          className="flex items-center justify-center px-[2rem]"
          aria-label={t("survivors.ariaLabel")}
        >
          <NavButtonLink
            PathUrl="/survivors"
            ButtonName={t("survivors.text")}
          />
        </li>
        <li
          className="flex items-center justify-center px-[2rem]"
          aria-label={t("killers.ariaLabel")}
        >
          <NavButtonLink PathUrl="/killers" ButtonName={t("killers.text")} />
        </li>
        <li
          className="flex items-center justify-center px-[2rem]"
          aria-label={t("makeYourOwnBuild.ariaLabel")}
        >
          <NavButtonLink
            PathUrl="/makeYourOwnBuild"
            ButtonName={t("makeYourOwnBuild.text")}
          />
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
}
