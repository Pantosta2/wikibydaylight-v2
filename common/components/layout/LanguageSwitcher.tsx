import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useNavigation } from "@/common/context/NavigationContext";
import LanguageDropdown from "./LanguageDropdown";

export default function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { isPending, startTransition } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const toggleDropdown = () => {
    if (!isPending) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const languageOptions = [
    { value: "en", label: "🇪🇳 English" },
    { value: "es", label: "🇪🇸 Español" },
    { value: "fr", label: "🇫🇷 Français" },
    { value: "ru", label: "🇷🇺 Русский" },
  ];

  return (
    <div ref={wrapperRef}>
      <LanguageDropdown
        options={languageOptions}
        currentLocale={locale}
        isOpen={isOpen}
        onToggle={toggleDropdown}
        onSelect={handleChange}
        label={t("selector.label")}
        disabled={isPending}
      />
    </div>
  );
}
