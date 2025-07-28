import { useTranslations } from "next-intl";
import { AnimatedRoleSection } from "@/common/components/AnimatedRoleSection";
import PageLayout from "@/common/components/layout/PageLayout";
import { DefinedImagesForBackground } from "@/common/assets/DefinedImagesForBackground";

export default function MainPage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col overflow-hidden bg-black">
      <PageLayout backgroundImage={DefinedImagesForBackground.Haddonfiled}>
        <main className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 py-12 text-white">
            <h1 className="mb-6 pt-10 text-center text-5xl font-bold tracking-wider text-red-700/80">
              {t("mainPage.title")}
            </h1>

            <section className="my-12 text-center">
              <h2 className="mb-4 border-b-2 border-gray-600 pb-2 text-3xl font-bold">
                {t("mainPage.aboutTitle")}
              </h2>
              <p className="text-lg leading-relaxed">
                {t("mainPage.aboutText")}
              </p>
            </section>

            <AnimatedRoleSection />
          </div>
        </main>
      </PageLayout>
    </div>
  );
}
