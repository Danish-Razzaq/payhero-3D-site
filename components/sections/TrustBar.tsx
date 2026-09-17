import { FileText, Lock, Phone, ShieldCheck } from "lucide-react";
import { trustBar } from "@/content/home";

const icons = {
  lock: Lock,
  "shield-check": ShieldCheck,
  "file-text": FileText,
  phone: Phone,
} as const;

export function TrustBar() {
  return (
    <section data-act="light" className="hero-enter-trust border-y border-line-150 bg-white">
      <ul className="container-page flex gap-8 overflow-x-auto py-5 md:flex-wrap md:justify-center md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {trustBar.map((item) => {
          const Glyph = icons[item.icon];
          return (
            <li
              key={item.label}
              className="flex shrink-0 items-center gap-2 text-[13px] font-medium text-slate-600"
            >
              <Glyph size={14} className="text-brand-500" aria-hidden />
              {item.label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
