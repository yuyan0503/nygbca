import authnicateByQr from '@/lib/authnicateByQr'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import doesQrCodeIdExist from '@/lib/doesQrCodeIdExist'

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
    const isQrCodeLegit = doesQrCodeIdExist(qrCodeId)

    if (!isQrCodeLegit) {
      // If the cookie is wrong, return children
      return (
        <div className="container mx-auto px-4">
          {children}
        </div>
      )
    }

  } catch (err) {
    return (
      <div className="container mx-auto px-4">
        {children}
      </div>
    )
  }
  redirect("/dashboard")
}