"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";
import { LocaleProvider } from "@/components/layout/LocaleProvider";
import { MotionProvider } from "@/lib/motion/MotionProvider";
import { SmoothScrollProvider } from "@/lib/motion/SmoothScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <MotionProvider>
        <SmoothScrollProvider>
          <TooltipProvider delayDuration={200}>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                className: "font-sans",
              }}
            />
          </TooltipProvider>
        </SmoothScrollProvider>
      </MotionProvider>
    </LocaleProvider>
  );
}
