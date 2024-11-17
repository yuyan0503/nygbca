import { cookies } from 'next/headers'

import NavBar from '@/components/NavBar'
import authnicateByQr from '@/lib/authnicateByQr'
import LoginFormChooser from '@/components/login/LoginFormChooser'

export default async function Layout({ children }) {

  try {
    const cookieStore = await cookies()
    const qrCodeId = cookieStore.get('qrCodeId').value
    const userInfo = await authnicateByQr(qrCodeId)

  } catch (error) {
    console.log(error)
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