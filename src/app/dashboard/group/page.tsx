import getAllGroupOfUuser from "@/lib/getAllGroupOfUser"
import { cookies } from "next/headers"
import Link from "next/link"


export default async function Page() {
  const cookieStore = await cookies()
  const qrCodeId = cookieStore.get('qrCodeId')?.value
  if (qrCodeId == undefined) {
    return (
      <a>a cookie error occured.Please log out and sign in again.</a>
    )
  }
  const user = await getAllGroupOfUuser(qrCodeId)
  const masterGroup = user.masterGroup
  const slaveGroup = user.slaveGroup

  return (
    <div className="overflow-x-auto">
      <div className="flex  justify-between">
        <div className="flex justify-start">
          <Link role="button" className="btn" href="/dashboard">home</Link>
        </div>
        <div className="flex justify-end">
          <Link role="button" className="btn" href="/dashboard/group/join">join group</Link>
          <Link role="button" className="btn" href="/dashboard/group/create">create group</Link>
        </div>
      </div>
      <table className="table">
        <caption>masterGroup</caption>

        {/* head */}
        <thead>
          <tr>
            <th>groupId</th>
            <th>groupName</th>
            <th>isAllowedBorderControl</th>
            <th>createdAt</th>
            <th>updatedAt</th>
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
        <caption>slaveGroup</caption>

        {/* head */}
        <thead>
          <tr>
            <th>groupId</th>
            <th>groupName</th>
            <th>isAllowedBorderControl</th>
            <th>createdAt</th>
            <th>updatedAt</th>
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

