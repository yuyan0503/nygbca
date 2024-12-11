"use server"
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'


import authnicateByQr from '@/lib/authnicateByQr';

export default async function QrCodeIdLoginLogic(formData: FormData) {
  try {
    const qrCodeId = formData.get('qrCodeId')?.toString();
    if (qrCodeId == undefined) {
      throw new Error("qrCodeId is undefined!")
    }
    // Use formData.get() to retrieve the value
    const result = await authnicateByQr(qrCodeId);
    const cookieStore = await cookies()
    cookieStore.set('qrCodeId', qrCodeId)
    redirect("/dashboard")

  } catch (error) {
    // Handle any errors from authnicateByQr here
    return console.error(error)
  }
}