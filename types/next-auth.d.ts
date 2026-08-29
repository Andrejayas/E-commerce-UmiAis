import { type DefaultSession, type DefaultJWT } from 'next-auth';

// Extend the built-in session/JWT types so `session.user.id` and
// `session.user.role` are available everywhere without casting.
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}
