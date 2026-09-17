import { ButtonLink } from "@/components/ui/ButtonLink";

export function SimplePage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <main id="main" className="bg-surface-200">
      <section className="container-narrow pt-32 pb-20 sm:pt-40">
        {eyebrow ? <p className="text-eyebrow text-brand-500">{eyebrow}</p> : null}
        <h1 className="text-display-2 mt-3 text-ink-900">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-[48ch] text-body-lg text-slate-600">{description}</p>
        ) : null}
        {children}
      </section>
    </main>
  );
}

export function ContinueHome() {
  return (
    <div className="mt-8">
      <ButtonLink href="/upload" variant="primary">
        Upload Statement
      </ButtonLink>
    </div>
  );
}
