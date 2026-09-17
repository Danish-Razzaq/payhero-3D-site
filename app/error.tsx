"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="container-narrow flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <h1 className="text-display-2">Something went wrong.</h1>
      <p className="mt-4 text-body-lg text-slate-600">Please try again.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-11 items-center rounded-md bg-ink-900 px-5 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </main>
  );
}
