import Link from "next/link";
import { footerNav, footerSocial } from "@/content/navigation";
import { site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-30 bg-ink-900 text-white">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Logo onDark />
            <p className="mt-4 text-body-sm text-white/70">{site.tagline}</p>
          </div>

          <FooterColumn title="Solutions" links={footerNav.solutions} />
          <FooterColumn title="Tools" links={footerNav.tools} />
          <FooterColumn title="Company" links={footerNav.company} />

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/70">
              Connect
            </p>
            <ul className="space-y-2.5">
              {footerSocial.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line-dark pt-6 text-caption text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PAYHERO. All rights reserved.</p>
          <p>{site.serviceAreaLine}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/70">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-body-sm text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
