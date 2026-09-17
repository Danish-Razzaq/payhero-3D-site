import { Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="PAYHERO home">
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md",
          onDark ? "bg-white" : "bg-ink-900",
        )}
      >
        <Zap
          size={16}
          className={onDark ? "text-ink-900" : "text-white"}
          aria-hidden
        />
      </span>
      <span
        className={cn(
          "text-[15px] font-semibold tracking-tight",
          onDark ? "text-white" : "text-ink-900",
        )}
      >
        PAYHERO
      </span>
    </Link>
  );
}
