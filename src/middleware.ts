import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register')

  // If trying to access auth page while logged in, redirect to dashboard
  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If trying to access protected page without being logged in
  if (!accessToken && !isAuthPage) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    
    // Add ?from=[path] to redirect back after login
    response.cookies.delete('token')
    
    return response
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
