import { ReactNode } from 'react'
import NavBar from '@/components/navbar/NavBar'
import { cookies } from 'next/headers'
import doesQrCodeIdExist from '@/lib/doesQrCodeIdExist'
import CookieErrorUI from '@/components/navbar/CookieErrorUI'

export default async function Layout({ children }: { children: ReactNode }) {

  const cookieStore = await cookies()
  const qrCodeIdCookie = cookieStore.get('qrCodeId')

  if (!qrCodeIdCookie) {
    // If the cookie is not found, return error
    return (<a>a cookie error happened.</a>)
  }
  const qrCodeId = qrCodeIdCookie.value
  const isQrCodeLegit = await doesQrCodeIdExist(qrCodeId)

  if (isQrCodeLegit) {
    return (
      <>
        <NavBar />
        <div className="container mx-auto px-4">
          {children}
        </div>
      </>
    )
  } else {
    return (
      <CookieErrorUI />
    )
  }
}