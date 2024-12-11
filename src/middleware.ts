import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authnicateByQr from './lib/authnicateByQr';

export function middleware(request: NextRequest) {
  // Check if the qrCodeId cookie exists
  const qrCodeId = request.cookies.get('qrCodeId');

  // If the cookie is not present, redirect to the login page
  if (!qrCodeId) {
    const currentPath = request.nextUrl.pathname; // Get the current path
    const redirectUrl = new URL(`/login?continue=${currentPath}`, request.url); // Construct the redirect URL
    return NextResponse.redirect(redirectUrl); // Perform the redirect
  }

  try {
    authnicateByQr(qrCodeId.toString())
  } catch (err) {
    const currentPath = request.nextUrl.pathname; // Get the current path
    const redirectUrl = new URL(`/login?continue=${currentPath}`, request.url); // Construct the redirect URL
    return NextResponse.redirect(redirectUrl); // Perform the redirect
  }

  // Allow the request to continue if the cookie is present
  return NextResponse.next();
}

// Optional: Configure matcher to specify which paths this middleware should apply to
export const config = {
  matcher: ['/dashboard/:path*'], // Adjust this to your needs
};