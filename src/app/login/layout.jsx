"use server"

import { cookies } from 'next/headers'
import authnicateByQr from '@/lib/authnicateByQr'
import { redirect } from 'next/navigation'

export default async function Layout({ children }) {
  try {
    const cookieStore = await cookies()
    const qrCodeId = cookieStore.get('qrCodeId').value
    const userInfo = await authnicateByQr(qrCodeId)

  } catch (error) {
    // Handle any errors from authnicateByQr here
    return (<>{children}</>)

  }

  redirect("/dashboard");

}
