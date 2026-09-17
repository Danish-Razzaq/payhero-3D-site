"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Upload, X } from "lucide-react";
import { headerCta, headerNav } from "@/content/navigation";
import { cn } from "@/lib/utils/cn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { useLocale } from "./LocaleProvider";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLocale();
  const homeExperience = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY);
      lastY = y;

      const probe = document.elementFromPoint(window.innerWidth / 2, 36);
      const act = probe?.closest("[data-act]")?.getAttribute("data-act");
      setOverDark(act === "dark");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDark = homeExperience || (overDark && !open);

  return (
    <header
      className={cn(
        "hero-enter-nav fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,box-shadow] duration-200 ease-depth",
        hidden && !open && "-translate-y-full",
        open
          ? "bg-white"
          :         scrolled
          ? onDark
            ? "bg-ink-900/80 backdrop-blur-xl border-b border-white/10 shadow-raised"
            : "bg-white/85 backdrop-blur-xl border-b border-line-150 shadow-raised"
          : "bg-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between lg:h-[72px]">
        <Logo onDark={onDark} />

        <ul className="hidden items-center md:flex">
          {headerNav.map((item) => {
            const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-2 text-[14px] font-medium transition-colors rounded-md",
                    onDark
                      ? current
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : current
                        ? "text-ink-900"
                        : "text-slate-600 hover:text-ink-900",
                    current &&
                      "after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:bg-brand-500",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          <LanguageToggle onDark={onDark} />
          <ButtonLink
            href={headerCta.href}
            size="sm"
            variant={onDark ? "on-dark" : "primary"}
            className="animate-upload-glow"
          >
            <Upload size={16} aria-hidden />
            {t("nav_analyze")}
          </ButtonLink>
        </div>

        <button
          type="button"
          className={cn("md:hidden p-2", onDark ? "text-white" : "text-ink-900")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-line-150 bg-white px-6 pb-8 pt-4"
        >
          <ul className="flex flex-col gap-1">
            {headerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-3 text-base font-medium text-ink-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <LanguageToggle />
            <ButtonLink href={headerCta.href} variant="primary" className="w-full">
              <Upload size={16} aria-hidden />
              {t("nav_analyze")}
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
