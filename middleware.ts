import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

/**
 * Route protection via NextAuth middleware.
 *
 * - /admin/*  → requires ADMIN role
 * - /account/* → requires any authenticated session
 * - /checkout  → requires any authenticated session
 *
 * All other routes are public.
 */
export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Admin routes: require ADMIN role
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      // Authenticated but not admin → redirect to homepage
      if (token) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      // Not authenticated → let withAuth handle redirect to /login
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true = let the middleware function above handle it
      // Return false = withAuth will redirect to signIn page
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;

        // Protected routes that require a session
        const protectedPaths = ['/admin', '/account', '/checkout'];
        const isProtected = protectedPaths.some((path) =>
          pathname.startsWith(path),
        );

        if (isProtected) return !!token;

        // All other routes are public
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
  },
);

export const config = {
  // Apply middleware to these route patterns only
  matcher: ['/admin/:path*', '/account/:path*', '/checkout/:path*'],
};
