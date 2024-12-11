"use client"

import Link from 'next/link'

function logout() {
  document.cookie = "qrCodeId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.assign("/login")
}

export default function NavBar() {

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link href="/dashboard">Home</Link></li>
            <li><Link href="/dashboard/group">Group</Link></li>
            <li><Link href="/dashboard/viewuser">ViewUser</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link className="btn btn-ghost text-xl" href="/dashboard">39thCulture</Link>
      </div>
      <div className="navbar-end">
        <button className="btn" onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}

