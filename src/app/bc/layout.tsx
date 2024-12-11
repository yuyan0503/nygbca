import { ReactNode } from 'react'
import { cookies } from "next/headers";
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import checkIfAllowedBc from '@/lib/bc/checkIfAllowedBc'



export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const qrCodeIdCookie = cookieStore.get('qrCodeId')

  if (!qrCodeIdCookie) {
    // If the cookie is not found, return error
    return (<a>a cookie error happened.</a>)
  }
  const qrCodeId = qrCodeIdCookie.value
  const isAllowedBc = await checkIfAllowedBc(qrCodeId)
  if (isAllowedBc) {
    return (
      <div>
        {children}
      </div>
    )
  } else {

  }
  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col items-center justify-center mx-auto max-w-xs">
        <div className="prose">
          <h1 className="mb-4 text-center">Access Blocked</h1>
          <p>You have insufficient permissions to access this page.</p>
          <Link className="btn btn-primary mb-4 w-full" href={`/login`}>Go back to dashboard</Link>

        </div>

      </div>
    </>
  )
}