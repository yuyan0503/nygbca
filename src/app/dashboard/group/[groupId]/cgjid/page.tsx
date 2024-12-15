"use server"

import Link from "next/link";
import { cookies } from "next/headers";
import getGroupInfoFull from '@/lib/group/getGroupInfoFull';
import Form from 'next/form'
import createGroupJoinIdLogic from '@/lib/group/createGroupJoinIdLogic';
import CookieErrorUI from "@/components/CookieErrorUI";
import gt from "@/lib/lang/gt";
import ToastBox from "@/components/ToastBox";

export default async function Page({
  params, searchParams
}: {
  params: Promise<{ groupId: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const parameters = await params;
  const groupId = parseInt(parameters.groupId)
  const groupUserData = await getGroupInfoFull(groupId)
  const cookieStore = await cookies()
  const qrCodeIdCookie = cookieStore.get('qrCodeId')
  const status = (await searchParams).status
  const isError = status == "error"

  if (!qrCodeIdCookie) {
    // If the cookie is not found, return error
    return (<CookieErrorUI />)
  }
  const qrCodeId = qrCodeIdCookie.value
  const qrCodes = groupUserData.masters.map(item => item.qrCode);
  const isMaster = qrCodes.includes(qrCodeId)

  if (isMaster) {
    return (
      <>
        <div className="overflow-x-auto">
          <div className="flex justify-start">
            <Link className="btn" href={`/dashboard/group/${groupId}`}>{`${await gt("group.group")} ${groupUserData.groupName}`}</Link>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center mx-auto max-w-xs">

          <div className="prose">
            <h1 className="mb-2 text-center">{await gt("groupJoinId.generateGroupJoinId")}</h1>
          </div>

          <Form action={createGroupJoinIdLogic} className="w-full">
            <input type="hidden" name="groupId" placeholder="groupId" className="input input-bordered w-full max-w-xs" value={groupId} required readOnly />

            <div className="form-control">
              <label className="form-control mb-4 w-full">
                <span className="label label-text mb-2 w-full">{await gt("groupJoinId.joinCodeUniqueAware")}</span>
                <input type="text" name="joinName" placeholder={await gt("groupJoinId.joinCode")} className="input input-bordered w-full" required />
              </label>
            </div>

            <div className="form-control">
              <label className="form-control mb-2 w-full">
                <span className="label label-text mb-2 w-full">{await gt("groupJoinId.maxUse")}</span>
                <input type="number" name="maxUse" placeholder="255" className="input input-bordered w-full" />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label label-text">{await gt("groupJoinId.isMaster")}</span>
                <input type="checkbox" name="isMaster" className="toggle" />
              </label>
            </div>

            <button className="btn btn-primary mb-2 w-full" type="submit">{await gt("terms.submit")}</button>
            <Link className="btn btn-neutral mb-2 w-full" href="./">{await gt("terms.cancel")}</Link>
          </Form>
        </div>

        <div className="toast toast-end">
          {isError ? <ToastBox message="An error occured." color={"info"} /> : <></>}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="overflow-x-auto">
          <div className="flex justify-start">
            <Link className="btn" href={`/dashboard/group/${groupId}`}>{`group ${groupId}`}</Link>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center mx-auto max-w-xs">
          <div className="prose">
            <h1 className="mb-4 text-center">{await gt("terms.accessBlocked")}</h1>
            <p>{await gt("message.noPermission")}</p>
            <Link className="btn btn-primary mb-4 w-full" href={`/dashboard/group/${groupId}`}>{`group ${groupId}`}</Link>
          </div>
        </div>
      </>
    )
  }
}
