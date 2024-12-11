"use server"

import { cookies } from 'next/headers'
import joinGroupByJoinName from "./joinGroupByJoinName";
import { redirect } from 'next/navigation'

export default async function joinGroupLogic(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const qrCodeIdCookie = cookieStore.get('qrCodeId')

    if (!qrCodeIdCookie) {
      // If the cookie is not found, return children
      throw new Error("cookie not found.")
    }
    const qrCodeId = qrCodeIdCookie.value
    const joinName = formData.get("joinName")?.toString()
    if (joinName == undefined) {
      throw new Error("joinName field is undefined")
    }
    joinGroupByJoinName(qrCodeId, joinName)
  } catch (err) {
    throw new Error("joining a group failed, check typo in joinName")
  }

  redirect("/dashboard/group")
}