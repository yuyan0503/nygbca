"use server"

import { redirect } from 'next/navigation'
import deleteGroupJoinId from "./deleteGroupJoinId"

export default async function deleteGroupJoinIdLogic(formData: FormData) {
  const joinId = formData.get("joinId")?.toString()
  const groupId = formData.get("groupId")?.toString()
  if ((joinId || groupId) == undefined) {
    throw new Error("Join Id is undefined!")
  }
  const isDeletesuccessful = await deleteGroupJoinId(Number(joinId))
  redirect(`/dashboard/group/${groupId}`)
}