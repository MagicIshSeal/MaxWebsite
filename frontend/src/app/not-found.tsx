import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">404 — Not found</h1>
      <Link href="/" className="underline">Back to home</Link>
    </div>
  );
}
