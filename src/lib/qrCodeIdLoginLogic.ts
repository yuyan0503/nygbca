"use server"
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'


import getUserDataWithQrCodeId from '@/lib/user/getUserDataWithQrCodeId';
import doesQrCodeIdExist from './doesQrCodeIdExist';

export default async function QrCodeIdLoginLogic(formData: FormData) {
  try {
    // Use formData.get() to retrieve the value
    const qrCodeId = formData.get('qrCodeId')?.toString();
    if (qrCodeId == undefined) {
      throw new Error("qrCodeId is undefined!")
    }

    const isQrCodeLegit = await doesQrCodeIdExist(qrCodeId)
    if (isQrCodeLegit) {
      const cookieStore = await cookies()
      cookieStore.set('qrCodeId', qrCodeId)
    } else {
      throw new Error("qrCode does not exist!")
    }

  } catch (error) {
    // Handle any errors from getUserDataWithQrCodeId here
    return console.error(error)
  }

  const continueUrl = formData.get('continueUrl')?.toString();
  if (Boolean(continueUrl) && continueUrl != undefined) {
    redirect(continueUrl)
  } else {
    redirect("/dashboard")
  }
}