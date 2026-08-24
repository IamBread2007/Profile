import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="font-mono text-5xl font-bold text-primary mb-2">404</h1>
      <p className="font-mono text-accent mb-6">Page not found</p>
      <Link href="/" className="btn btn-accent btn-soft font-mono">
        ← return home
      </Link>
    </div>
  );
}
