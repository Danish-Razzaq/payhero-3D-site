import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MetricTile } from "@/components/ui/MetricTile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  robots: { index: false, follow: false },
  title: "Design tokens",
};

const colors = [
  ["ink-900", "bg-ink-900"],
  ["ink-800", "bg-ink-800"],
  ["brand-500", "bg-brand-500"],
  ["brand-400", "bg-brand-400"],
  ["success-700", "bg-success-700"],
  ["success-500", "bg-success-500"],
  ["slate-600", "bg-slate-600"],
  ["surface-200", "bg-surface-200"],
  ["danger-500", "bg-danger-500"],
  ["warn-500", "bg-warn-500"],
] as const;

export default function TokensPage() {
  return (
    <main id="main" className="container-page pt-32 pb-24 space-y-16">
      <SectionHeading eyebrow="Foundation" title="Design tokens" subcopy="Temporary QA route. Deleted before launch." />

      <section>
        <h2 className="text-h3 mb-4">Colour</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {colors.map(([name, cls]) => (
            <div key={name} className="space-y-2">
              <div className={`h-16 rounded-lg border border-line-150 ${cls}`} />
              <p className="text-caption text-slate-600">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-h3 mb-4">Type</h2>
        <div className="space-y-3">
          <p className="text-display-1">Display 1</p>
          <p className="text-display-2">Display 2</p>
          <p className="text-h2">Heading 2</p>
          <p className="text-h3">Heading 3</p>
          <p className="text-h4">Heading 4</p>
          <p className="text-body-lg">Body large — secondary copy at readable contrast.</p>
          <p className="text-slate-600">Body — slate-600 on white.</p>
          <p className="text-caption text-slate-600">Caption / helper</p>
          <p className="text-eyebrow text-brand-500">Eyebrow label</p>
          <p className="text-mono-metric" data-metric>
            $5,160
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-h3 mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="brand">Brand</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-4 rounded-lg bg-ink-900 p-6 flex flex-wrap gap-3">
          <Button variant="on-dark">On dark</Button>
          <Button variant="on-dark-ghost">Ghost on dark</Button>
        </div>
      </section>

      <section>
        <h2 className="text-h3 mb-4">Cards & badges</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <Badge tone="brand">Transparent</Badge>
            <h3 className="text-h4 mt-3">Premium card</h3>
            <p className="mt-2 text-body-sm text-slate-600">Hover to lift.</p>
          </Card>
          <Card variant="navy" className="p-6">
            <Badge tone="on-dark">Security</Badge>
            <h3 className="text-h4 mt-3">Navy card</h3>
            <p className="mt-2 text-body-sm text-white/70">Used in dark acts.</p>
          </Card>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <MetricTile label="Effective rate" value="2.58%" />
          <MetricTile label="Benchmark" value="2.10%" tone="brand" />
          <MetricTile label="Annual savings" value="$5,160" tone="success" />
        </div>
      </section>
    </main>
  );
}
