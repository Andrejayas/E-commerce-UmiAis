'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

interface Props {
  children: React.ReactNode;
  session?: Session | null;
}

/**
 * Wraps the app with NextAuth SessionProvider so client components
 * can use useSession(), signIn(), and signOut() hooks.
 */
export function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
