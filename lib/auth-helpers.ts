import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { Session } from 'next-auth';

/**
 * Returns the current session for authenticated users.
 * Redirects to /login if no session exists.
 */
export async function requireAuth(): Promise<Session> {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  return session;
}

/**
 * Returns the current session only for admin users.
 * Redirects to /login if not authenticated, or to / if not an admin.
 */
export async function requireAdmin(): Promise<Session> {
  const session = await requireAuth();
  if (session.user.role !== 'ADMIN') {
    redirect('/');
  }
  return session;
}

/**
 * Returns the current session without redirecting.
 * Use this where authentication is optional (e.g., homepage).
 */
export async function getOptionalSession(): Promise<Session | null> {
  return getServerSession(authOptions);
}
