import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Featured Artists</h1>
        <div className="grid gap-6">
          <Link 
            href="/artists/tianna-hall"
            className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold">Tianna Hall</h2>
            <p className="text-gray-600">Jazz Vocalist & Bandleader</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
