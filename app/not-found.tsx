export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-onyx text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="opacity-70 mt-2">Return to <a href="/" className="underline">home</a>.</p>
      </div>
    </main>
  );
}