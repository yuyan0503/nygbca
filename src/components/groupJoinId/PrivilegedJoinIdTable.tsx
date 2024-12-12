"use server"

import Link from "next/link";
import getGroupJoinId from "@/lib/group/getGroupJoinId"


export default async function PrivilegedJoinIdTable({ groupId }: { groupId: number }) {

  const joinIdData = await getGroupJoinId(groupId)
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-end">
          <Link className="btn" href={`/dashboard/group/${groupId}/cgjid`}>create groupJoinId</Link>
        </div>
      </div>

      <table className="table">
        <caption>GroupJoinIds</caption>
        {/* head */}
        <thead>
          <tr>
            <th>joinId</th>
            <th>joinName</th>
            <th>isMaster</th>
            <th>maxUse</th>
            <th>currentUse</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>joiningGroupId</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(joinIdData.joinId).map(([id, value]) => (
            <tr key={id}>
              {Object.entries(value).map(([id, value]) => (
                <td>{value.toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}