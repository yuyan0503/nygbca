"use server"

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import doesQrCodeIdExist from '../doesQrCodeIdExist';
import getLangPrefByQrCodeId from '../lang/getLangPrefByQrCodeId';

export default async function QrCodeIdLoginLogic(formData: FormData) {
  try {
    // Use formData.get() to retrieve the value
    const qrCodeId = formData.get('qrCodeId')?.toString();
    if (qrCodeId == undefined) {
      throw new Error("qrCodeId is undefined!")
    }

    const isQrCodeLegit = await doesQrCodeIdExist(qrCodeId)
    if (isQrCodeLegit) {
      const langPref = await getLangPrefByQrCodeId(qrCodeId)
      const cookieStore = await cookies()
      cookieStore.set('qrCodeId', qrCodeId)
      if (langPref) {
        cookieStore.set("langPref", langPref)
      }
    } else {
      throw new Error("qrCode does not exist!")
    }

  } catch (error) {
    // Handle any errors from getUserDataWithQrCodeId here
    const continueUrl = formData.get('continueUrl')?.toString();
    if (Boolean(continueUrl) && continueUrl != undefined) {
      redirect(`/login/loginform?continue=${continueUrl}&status=loginerror`)
    } else {
      redirect("/login/loginform?status=loginerror")
    }
  }

  const continueUrl = formData.get('continueUrl')?.toString();
  if (Boolean(continueUrl) && continueUrl != undefined) {
    redirect(continueUrl)
  } else {
    redirect("/dashboard")
  }
}