import { NextResponse, NextRequest } from "next/server";
// import middleware from "next-auth/middleware";

export { default } from "next-auth/middleware";

// !! PROTECTED ROUTES !! //

// export default middleware
// Demo - this is technically already handled by NextAuth
// --   This is just to show how middleware works in NextJS 13
// export function middleware(request: NextRequest) {
//   // redirects to /new-page when it hits /users
//   return NextResponse.redirect(new URL('/new-page', request.url))
// }
// NextJS Convention - Next knows to look for this, same as layout,error,page,route,etc.
export const config = {
  // middleware only executed on this path 
  // *: zero or more parameters ie no matter what
  // +: one or more parameters ie one or more parameters 
  // ?: zero or one parameters ie (?)
  matcher: [
    '/dashboard/:path*',
    '/community/:path*',
    '/journal/:path*',
    '/transformation/:path*',
    '/change-password/:path*'
  ]
  // matcher: ['/users/:id*']
}


export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { headers: corsHeaders })
  }

  let authCookie = request.cookies.get('__Secure-next-auth.session-token') || request.cookies.get('next-auth.session-token')

  if (!authCookie || authCookie.value.length === 0) return NextResponse.redirect(new URL('/api/auth/signin', request.url))
}
