import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subcopy?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  subcopy,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-[48ch]", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-eyebrow mb-3",
            tone === "dark" ? "text-brand-400" : "text-brand-500",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-h2 text-balance">{title}</h2>
      {subcopy ? (
        <p
          className={cn(
            "text-body-lg mt-4",
            tone === "dark" ? "text-white/75" : "text-slate-600",
          )}
        >
          {subcopy}
        </p>
      ) : null}
    </div>
  );
}
