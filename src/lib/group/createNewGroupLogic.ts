"use server"
import { cookies } from "next/headers";
import createGroup from "./createGroup";
import joinGroup from "@/lib/group/joinGroup";
import { redirect } from 'next/navigation'
import { NoQrCodeIdInCookieError } from "../errors/errorclasses";


export default async function createNewGroupLogic(formData: FormData) {
  let newGroup: number;

  try {
    const cookieStore = await cookies()
    const qrCodeIdCookie = cookieStore.get('qrCodeId')

    if (!qrCodeIdCookie) {
      throw new NoQrCodeIdInCookieError("no qrCodeId found in cookie")
    }
    const qrCodeId = qrCodeIdCookie.value
    const group = await createGroup(formData);

    newGroup = group.groupId;

    await joinGroup(qrCodeId, newGroup, true)
  }

  catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error("an unknown error happened")
    }
  }

  return redirect(`/dashboard/group/${newGroup.toString()}`);
}