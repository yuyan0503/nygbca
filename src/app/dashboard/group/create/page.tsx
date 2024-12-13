"use server"

import Form from "next/form";
import Link from "next/link";
import { cookies } from "next/headers";
import createNewGroupFlow from "@/lib/group/createNewGroupFlow";
import getUserDataWithQrCodeId from "@/lib/user/getUserDataWithQrCodeId";
import CookieErrorUI from "@/components/CookieErrorUI";
import gt from "@/lib/lang/gt";

async function IsBcAllowedCheckbox() {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label label-text">{await gt("bc.terms.bc")}</span>
        <input type="checkbox" name="isAllowedBorderControl" className="toggle" />
      </label>
    </div>
  )
}

export default async function Page() {

  const cookieStore = await cookies()
  const qrCodeIdCookie = cookieStore.get('qrCodeId')

  if (!qrCodeIdCookie) {
    // If the cookie is not found, return error
    return (<CookieErrorUI />)
  }
  const qrCodeId = qrCodeIdCookie.value
  const userData = await getUserDataWithQrCodeId(qrCodeId)
  const isFirstAccount = userData.userId == 1

  return (
    <>
      <div className="flex justify-start">
        <Link role="button" className="btn" href="/dashboard/group">{await gt("group.group")}</Link>
      </div>

      <div className="w-full flex flex-col items-center justify-center mx-auto max-w-xs">

        <div className="prose">
          <h1 className="mb-2 text-center">{await gt("group.createGroup")}</h1>
        </div>

        <Form action={createNewGroupFlow} className="w-full">

          <div className="form-control mb-4 w-full">
            <label className="form-control w-full mb-4">
              <span className="label label-text w-full mb-4 text-center">{await gt("group.groupName")}</span>
              <input type="text" name="groupName" placeholder={await gt("group.groupName")} className="input input-bordered w-full" required />
            </label>
          </div>

          {isFirstAccount ? <IsBcAllowedCheckbox /> : <></>}

          <button className="btn btn-primary mb-2 w-full" type="submit">{await gt("terms.submit")}</button>
          <Link className="btn btn-neutral mb-2 w-full" href="./">{await gt("terms.cancel")}</Link>

        </Form>
      </div>
    </>
  )
}