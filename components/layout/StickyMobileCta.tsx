"use client";

import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useLocale } from "./LocaleProvider";

export function StickyMobileCta() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line-200 bg-white/95 px-4 py-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <ButtonLink href="/upload" variant="primary" className="w-full py-3">
        <Upload size={16} aria-hidden />
        {t("nav_analyze")}
      </ButtonLink>
    </div>
  );
}
