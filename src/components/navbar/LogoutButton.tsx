"use client"

/**
 * set true for full width, set false for a normal button.
 * @param width
 * @returns a logout button
 */
export default function LogoutButton({ width }: { width: boolean }) {

  function logout() {
    document.cookie = "qrCodeId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  }

  if (width) {
    return (
      <button className="btn mb-2 w-full" onClick={() => logout()}>Logout</button>
    )
  } else {
    return (
      <button className="btn" onClick={() => logout()}>Logout</button>
    )
  }
}
