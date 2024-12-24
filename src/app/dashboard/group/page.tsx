import CookieErrorUI from "@/components/CookieErrorUI"
import getAllGroupOfUuser from "@/lib/user/getAllGroupOfUser"
import { cookies } from "next/headers"
import Link from "next/link"
import gt from "@/lib/lang/gt"


export default async function Page() {
  const cookieStore = await cookies()
  const qrCodeId = cookieStore.get('qrCodeId')?.value
  if (qrCodeId == undefined) {
    return (
      <CookieErrorUI />
    )
  }
  const user = await getAllGroupOfUuser(qrCodeId)
  const masterGroup = user.masterGroup
  const slaveGroup = user.slaveGroup

  return (
    <div className="overflow-x-auto">
      <div className="flex  justify-between">
        <div className="flex justify-start">
          <Link role="button" className="btn" href="/dashboard">{await gt("dashboard.phrases.backToDashboard")}</Link>
        </div>
        <div className="flex justify-end join join-vertical sm:join-horizontal px-2">
          <Link role="button" className="btn join-item" href="/dashboard/group/join">{await gt("group.joinGroup")}</Link>
          <Link role="button" className="btn join-item" href="/dashboard/group/create">{await gt("group.createGroup")}</Link>
        </div>
      </div>
      <table className="table">
        <caption>{await gt("group.masterGroup")}</caption>

        {/* head */}
        <thead>
          <tr>
            <th>{await gt("group.groupId")}</th>
            <th>{await gt("group.groupName")}</th>
            <th>{await gt("bc.terms.bc")}</th>
            <th>{await gt("terms.createdAt")}</th>
            <th>{await gt("terms.updatedAt")}</th>
          </tr>
        </thead>
        <tbody>
          {masterGroup.map((group) => (
            <tr key={group.groupId}>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.groupId}</Link></td>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.groupName}</Link></td>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.isAllowedBorderControl.toString()}</Link></td>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.createdAt.toString()}</Link></td>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.updatedAt.toString()}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <br />
      <table className="table">
        <caption>{await gt("group.slaveGroup")}</caption>

        {/* head */}
        <thead>
          <tr>
            <th>{await gt("group.groupId")}</th>
            <th>{await gt("group.groupName")}</th>
            <th>{await gt("bc.terms.bc")}</th>
            <th>{await gt("terms.createdAt")}</th>
            <th>{await gt("terms.updatedAt")}</th>
          </tr>
        </thead>
        <tbody>
          {slaveGroup.map((group) => (
            <tr key={group.groupId}>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.groupId}</Link></td>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.groupName}</Link></td>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.isAllowedBorderControl.toString()}</Link></td>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.createdAt.toString()}</Link></td>
              <td><Link href={`/dashboard/group/${group.groupId}`}>{group.updatedAt.toString()}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

