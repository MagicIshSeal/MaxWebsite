export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Max. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
