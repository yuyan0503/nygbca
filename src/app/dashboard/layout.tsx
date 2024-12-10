import { cookies } from 'next/headers'

import NavBar from '@/components/NavBar'
import authnicateByQr from '@/lib/authnicateByQr'
import LoginFormChooser from '@/components/login/LoginFormChooser'
import { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {

  try {
    const cookieStore = await cookies()
    const qrCodeIdCookie = cookieStore.get('qrCodeId')

    if (!qrCodeIdCookie) {
      // If the cookie is not found, return children
      return (<LoginFormChooser />)
    }
    const qrCodeId = qrCodeIdCookie.value
    const userInfo = await authnicateByQr(qrCodeId)

  } catch (error) {
    // Handle any errors from authnicateByQr here
    return (
      <LoginFormChooser />
    )

  }

  return (
    <>
      <NavBar />
      {children}
    </>

  )
}