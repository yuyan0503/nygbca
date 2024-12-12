"use server"

import Link from "next/link";
import { cookies } from "next/headers";
import getGroupInfoFull from '@/lib/group/getGroupInfoFull';
import PriviligedCgjidForm from '@/components/groupJoinId/PreviligedCgjidForm';

export default async function Page({ params }: { params: Promise<{ groupId: string }> }) {
  const parameters = await params;
  const groupId = parseInt(parameters.groupId)
  const groupUserData = await getGroupInfoFull(groupId)
  const cookieStore = await cookies()
  const qrCodeIdCookie = cookieStore.get('qrCodeId')

  if (!qrCodeIdCookie) {
    // If the cookie is not found, return error
    return (<a>a cookie error happened.</a>)
  }
  const qrCodeId = qrCodeIdCookie.value
  const qrCodes = groupUserData.masters.map(item => item.qrCode);
  const isMaster = qrCodes.includes(qrCodeId)
  if (isMaster) {
    return (
      <PriviligedCgjidForm groupId={groupId} />
    );
  } else {
    return (
      <div>
        <div className="overflow-x-auto">
          <div className="flex justify-start">
            <Link className="btn" href={`/dashboard/group/${groupId}`}>{`group ${groupId}`}</Link>
          </div>
        </div>
        <a>user does not have sufficient permission to view this page.</a>
      </div>

    )
  }
}
