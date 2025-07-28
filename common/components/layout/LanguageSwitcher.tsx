import { useLocale, useTranslations } from "next-intl";
import { ChangeEvent, useTransition } from "react";
import { usePathname, useRouter } from "@/common/i18n/navigation";

export default function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative">
      <select
        defaultValue={locale}
        onChange={handleChange}
        disabled={isPending}
        className="bg-gray-100 border px-2 py-1 rounded text-black cursor-pointer"
        aria-label={t("selector.label")}
      >
        <option value="en">🇪🇳 English</option>
        <option value="es">🇪🇸​ Español</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="ru">🇷🇺 Русский</option>
      </select>
    </div>
  );
}
