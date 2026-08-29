import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = { title: "Login — Umi Ai's Bakery" };

export default async function LoginPage() {
  // Already logged in → send to homepage
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-serif text-center mb-2">Selamat Datang</h1>
        <p className="text-center text-gray-500 mb-8">Masuk ke akun Umi Ai&apos;s Bakery</p>
        <LoginForm />
      </div>
    </main>
  );
}
