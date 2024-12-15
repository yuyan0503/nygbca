import { ReactNode } from 'react'
import NavBar from '@/components/NavBar'
import { cookies } from 'next/headers'
import doesQrCodeIdExist from '@/lib/user/doesQrCodeIdExist'
import CookieErrorUI from '@/components/CookieErrorUI'

export default async function Layout({ children }: { children: ReactNode }) {

  const cookieStore = await cookies()
  const qrCodeIdCookie = cookieStore.get('qrCodeId')

  if (!qrCodeIdCookie) {
    // If the cookie is not found, return error
    return (<CookieErrorUI />)
  }
  const qrCodeId = qrCodeIdCookie.value
  const isQrCodeLegit = await doesQrCodeIdExist(qrCodeId)

  if (isQrCodeLegit) {
    return (
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="container mx-auto px-4 flex flex-col flex-1">
          {children}
        </div>
      </div>
    )
  } else {
    return (
      <CookieErrorUI />
    )
  }
}