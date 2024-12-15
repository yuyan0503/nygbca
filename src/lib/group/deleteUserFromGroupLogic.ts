"use server"

import { redirect } from "next/navigation"
import deleteGroupUserTie from "./deleteGroupUserTie"

export default async function deleteUserFromGroupLogic(formData: FormData) {
  const groupId = Number(formData.get("groupId"))
  const qrCodeId = formData.get("qrCodeId")?.toString()
  if ((qrCodeId) == undefined) {
    throw new Error("undefined!")
  }
  const deletedTie = await deleteGroupUserTie(groupId, qrCodeId)
  redirect(`/dashboard/group/${groupId}`)
}