import { auth } from "./auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  // Define authentication routes
  const authRoutes = ['/signin', '/signup']
  const isAuthRoute = authRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  
  // Define protected routes
  const protectedRoutes = ['/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))

  // Handle authentication routes
  if (isAuthRoute) {
    if (session) {
      // If user is already logged in and tries to access auth routes,
      // redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // Allow access to auth routes for non-authenticated users
    return NextResponse.next()
  }

  if (request.nextUrl.pathname === '/') {
    if (session) {
      // If user is logged in and tries to access home, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // Allow non-authenticated users to access home
    return NextResponse.next()
  }

  // Handle protected routes
  if (isProtectedRoute) {
    if (!session) {
      // If user is not logged in and tries to access protected routes,
      // redirect to sign in page
      const signInUrl = new URL('/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }
    // Allow access to protected routes for authenticated users
    return NextResponse.next()
  }

  // Allow all other routes
  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/signin',
    '/signup',
    '/',
    '/dashboard'
  ]
}