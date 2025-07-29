"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import NavbarUI from "./NavbarUI";

export default function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <NavbarUI
      isOpen={isOpen}
      toggleMenu={toggleMenu}
      closeMenu={closeMenu}
      t={t}
    />
  );
}
