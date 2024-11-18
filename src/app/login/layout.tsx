"use server"

import { cookies } from 'next/headers'
import authnicateByQr from '@/lib/authnicateByQr'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
  try {
    const cookieStore = await cookies()
    const qrCodeIdCookie = cookieStore.get('qrCodeId')
    
    if (!qrCodeIdCookie) {
      // If the cookie is not found, return children
      return (<>{children}</>)
    }
    const qrCodeId = qrCodeIdCookie.value
    const userInfo = await authnicateByQr(qrCodeId)

  } catch (error) {
    // Handle any errors from authnicateByQr here
    return (<>{children}</>)
  }
  redirect("/dashboard");
}
