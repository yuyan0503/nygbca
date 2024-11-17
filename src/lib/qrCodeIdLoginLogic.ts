"use server"
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'


import authnicateByQr from '@/lib/authnicateByQr';

export default async function QrCodeIdLoginLogic(formData: any) {
  try {
    const qrCodeId = formData.get('qrCodeId');
    // Use formData.get() to retrieve the value
    const result = await authnicateByQr(qrCodeId);
    const cookieStore = await cookies()
    cookieStore.set('qrCodeId', qrCodeId)

  } catch (error) {
    // Handle any errors from authnicateByQr here

    if (error instanceof Error) {
      return ("Authentication failed:" + error);
    } else {
      return ("Authentication failed:unknown error occured");
    }
  }

  redirect("/dashboard")
}