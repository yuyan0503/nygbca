"use server"

import getUserDataWithQrCodeId from "../user/getUserDataWithQrCodeId"

export default async function getLangPrefByQrCodeId(qrCodeId: string) {
  try {
    const userData = await getUserDataWithQrCodeId(qrCodeId)
    const langPref = userData.preferredLanguage
    return (langPref)

  } catch (err) {
    return undefined
  }
}