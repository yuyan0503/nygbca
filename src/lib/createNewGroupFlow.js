"use server"
import { cookies } from "next/headers";
import createGroup from "@/lib/createGroup";
import joinGroup from "@/lib/joinGroup";
import { redirect } from 'next/navigation'


export default async function createNewGroupFlow(formData) {
  let group = {}
  try {
    const cookieStore = await cookies()
    const qrCodeId = cookieStore.get('qrCodeId').value
    group = await createGroup(formData);

    await joinGroup(qrCodeId, (await group).groupId, true)
  }

  catch (error) {
    console.error(error)
  }
  
  return redirect(`/dashboard/group/${(await group).groupId}`);
}