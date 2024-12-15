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
    } else {
      const maxUse = Number(formData.get('maxUse'));
      const result = await createGroupJoinId(groupId, joinName, isMaster, maxUse)
    }

  } catch (error) {
    // Handle any errors here
    redirect(`/dashboard/group/${groupId.toString()}/cgjid?status=error`);
  }

  // Redirect after processing
  redirect(`/dashboard/group/${groupId.toString()}`);
}