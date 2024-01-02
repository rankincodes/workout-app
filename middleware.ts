import { createClient } from '@/lib/utils/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

const baseUrl = process.env.NODE_ENV == 'production' ? `https://someworkout.app` : 'http://localhost:3000'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)
  const { data } = await supabase.auth.getSession()

  if (request.nextUrl.pathname === '/login' && data.session) {
    return NextResponse.redirect(baseUrl)
  } else if (!data.session && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(baseUrl + '/login')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
