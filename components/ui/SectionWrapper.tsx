import { cn } from "@/lib/utils/cn";

type Act = "light" | "dark" | "surface";

const acts: Record<Act, string> = {
  light: "bg-white text-ink-900",
  dark: "bg-ink-900 text-white",
  surface: "bg-surface-200 text-ink-900",
};

type SectionWrapperProps = {
  children: React.ReactNode;
  act?: Act;
  id?: string;
  className?: string;
  size?: "default" | "lg";
};

export function SectionWrapper({
  children,
  act = "light",
  id,
  className,
  size = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      data-act={act === "surface" ? "light" : act}
      className={cn(
        "relative overflow-hidden",
        acts[act],
        size === "lg" ? "py-[var(--spacing-section-lg)]" : "py-[var(--spacing-section)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
