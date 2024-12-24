import { ReactNode } from 'react';
import { cookies } from "next/headers";
import Link from 'next/link'
import LogoutButton from './LogoutButton';
import gt from '@/lib/lang/gt';
import styles from "./NavBar.module.css"
import checkIfAllowedBc from '@/lib/bc/checkIfAllowedBc';

export default async function NavBar({ children }: { children: ReactNode }) {

  const cookieStore = await cookies()
  const qrCodeIdCookie = cookieStore.get('qrCodeId')
  let isAllowedBc = false

  if (qrCodeIdCookie) {
    // If the cookie is not found, return error
    const qrCodeId = qrCodeIdCookie.value
    isAllowedBc = await checkIfAllowedBc(qrCodeId)
  }

  return (
    <div className="drawer lg:drawer-open h-screen h-lvh overflow-y-auto">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-lvh overflow-y-auto">
        <div className={`bg-base-100 flex hidden lg:block ${styles.navbarnarrow} ${styles.drag} w-full`}></div>

        {/* Navbar */}
        <div className={`navbar bg-base-100 flex lg:hidden ${styles.navbarstyles}`}>
          <div className={styles.nodrag}>
            <div className="flex-none">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <Link className="text-xl px-2" href="/dashboard">{await gt("appInfo.appName")}</Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto sm:p-4">
          {children}
        </div>

      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-100 min-h-full w-80 flex flex-col">
          {/* Sidebar content here */}
          <li className="lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="btn btn-square p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </label>
          </li>
          <li><Link className="text-xl" href="/dashboard">{await gt("appInfo.appName")}</Link></li>
          <li><Link href="/dashboard">{await gt("dashboard.dashboard")}</Link></li>
          <li>
            {isAllowedBc ? <Link href={`/bc`}>{await gt("bc.terms.bc")}</Link>
              : <></>}
          </li>
          <li><Link href="/dashboard/group">{await gt("group.groups")}</Link></li>
          <li><Link href="/dashboard/viewuser">{await gt("dashboard.userInfo")}</Link></li>
          <div className="flex-grow"></div>
          <li className="flex justify-end"><LogoutButton width={false} /></li>
        </ul>
      </div>

    </div>
  )
}