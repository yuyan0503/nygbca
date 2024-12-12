import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {

  // Check if the qrCodeId cookie exists
  const hasQrCodeId = request.cookies.has('qrCodeId');

  // If the cookie is not present, redirect to the login page
  if (!hasQrCodeId) {
    const currentPath = request.nextUrl.pathname; // Get the current path
    const redirectUrl = new URL(`/login?continue=${currentPath}`, request.url); // Construct the redirect URL
    return NextResponse.redirect(redirectUrl); // Perform the redirect
  }

  // Allow the request to continue if the cookie is present
  return NextResponse.next();
}

// Optional: Configure matcher to specify which paths this middleware should apply to
export const config = {
  matcher: ['/dashboard/:path*', "/bc/:path*"], // Adjust this to your needs
};