import authnicateByQr from '@/lib/authnicateByQr'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
  try {
    const cookieStore = await cookies()
    const qrCodeIdCookie = cookieStore.get('qrCodeId')

    if (!qrCodeIdCookie) {
      // If the cookie is not found, return children
      return (
        <div className="container mx-auto px-4">
          {children}
        </div>
      )
    }

    const qrCodeId = qrCodeIdCookie.value
    const userInfo = await authnicateByQr(qrCodeId)
  } catch (err) {
    return (
      <div className="container mx-auto px-4">
        {children}
      </div>
    )
  }
  redirect("/dashboard")
}