"use server"
import { redirect } from 'next/navigation'
import createGroupJoinId from './createGroupJoinId';

export default async function createGroupJoinIdLogic(formData: FormData) {
  const groupId = Number(formData.get('groupId'));
  try {
    const joinName = formData.get('joinName')?.toString();
    if (joinName == undefined) {
      throw new Error("joinName is undefined!")
    }
    const isMaster = Boolean(formData.get('isMaster'));

    if (formData.get('maxUse') == "") {
      const result = await createGroupJoinId(groupId, joinName, isMaster)
      console.log(result)
      console.log("noMax")
      console.log(`/dashboard/group/${groupId.toString()}`)
    } else {
      const maxUse = Number(formData.get('maxUse'));
      const result = await createGroupJoinId(groupId, joinName, isMaster, maxUse)
      console.log(result)
    }

    // Redirect after processing

  } catch (error) {
    // Handle any errors here
    return console.error(error)
  }

  redirect(`/dashboard/group/${groupId.toString()}`);

}