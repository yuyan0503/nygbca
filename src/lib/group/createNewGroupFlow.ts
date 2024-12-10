"use server"
import { cookies } from "next/headers";
import createGroup from "./createGroup";
import joinGroup from "@/lib/group/joinGroup";
import { redirect } from 'next/navigation'
import { NoQrCodeIdInCookieError } from "../errors/errorclasses";


export default async function createNewGroupFlow(formData: FormData) {

  try {
    const cookieStore = await cookies()
    const qrCodeIdCookie = cookieStore.get('qrCodeId')

    if (!qrCodeIdCookie) {
      throw new NoQrCodeIdInCookieError("no qrCodeId found in cookie")
    }
    const qrCodeId = qrCodeIdCookie.value
    const group = await createGroup(formData);

    await joinGroup(qrCodeId, group.groupId, true)
    return redirect(`/dashboard/group/${group.groupId.toString()}`);
  }

  catch (error) {
    return console.error(error)
  }

}