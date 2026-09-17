import { cn } from "@/lib/utils/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "premium" | "navy";
};

export function Card({ children, className, variant = "premium" }: CardProps) {
  return (
    <div className={cn(variant === "navy" ? "card-navy" : "card-premium", className)}>
      {children}
    </div>
  );
}
