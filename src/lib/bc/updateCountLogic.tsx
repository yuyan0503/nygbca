"use server"
import { redirect } from 'next/navigation'
import updateCountOfQrCodeId from './updateCountOfQrCodeId'

export default async function updateCountLogic(formData: FormData) {

  const qrCodeId = formData.get("qrCodeId")?.toString()
  if (qrCodeId == undefined) {
    throw new Error("Qr code Id is undefined!")
  }
  const updatedBorderCrossCount = formData.get("updatedBorderCrossCount")
  if (typeof updatedBorderCrossCount == null) {
    throw new Error("borderCount does not exist.")
  }
  const borderCrossCount = Number(updatedBorderCrossCount)
  const updatedCount = await updateCountOfQrCodeId(qrCodeId, borderCrossCount)
  redirect("/bc/manual")
}

//as the check is conducted on the page, no check if conductedd here.
//may be better to conduct checks here in the future.