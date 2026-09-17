import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { whoWeServe } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function WhoWeServeSection() {
  return (
    <SectionWrapper act="light" id="who-we-serve">
      <div className="container-page">
        <SectionHeading
          eyebrow={whoWeServe.eyebrow}
          title={whoWeServe.title}
          subcopy={whoWeServe.intro}
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {whoWeServe.tiles.map((tile) => (
            <li key={tile.href}>
              <Link
                href={tile.href}
                className="card-premium group relative flex aspect-[4/5] flex-col justify-end overflow-hidden p-4"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-700 to-brand-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
                <div className="relative flex items-end justify-between gap-2">
                  <p className="text-h4 text-white">{tile.label}</p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-200 ease-depth group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={16} aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
