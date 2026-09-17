import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-narrow flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="text-eyebrow text-brand-500">404</p>
      <h1 className="text-display-2 mt-3">This page could not be found.</h1>
      <p className="mt-4 text-body-lg text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-md bg-ink-900 px-5 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </main>
  );
}
