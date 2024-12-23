import Link from 'next/link'
import LogoutButton from './LogoutButton';
import gt from '@/lib/lang/gt';
import styles from "./NavBar.module.css"

export default async function NavBar() {

  return (
    <div className={styles.navbarstyles}>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className={styles.nodrag}>
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
                <li><Link href="/dashboard">{await gt("dashboard.dashboard")}</Link></li>
                <li><Link href="/dashboard/group">{await gt("group.groups")}</Link></li>
                <li><Link href="/dashboard/viewuser">{await gt("dashboard.userInfo")}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar-center">
          <div className={styles.nodrag}>
            <Link className="btn btn-ghost text-xl" href="/dashboard">{await gt("appInfo.appName")}</Link>
          </div>
        </div>
        <div className="navbar-end">
          <div className={styles.nodrag}>
            <LogoutButton width={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

