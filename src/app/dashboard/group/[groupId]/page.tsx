import getGroupInfo from "@/lib/group/getGroupInfo";
import getGroupInfoFull from "@/lib/group/getGroupInfoFull";
import Link from "next/link";
import { cookies } from "next/headers";
import PrivilegedJoinIdTable from "@/components/groupJoinId/PrivilegedJoinIdTable";
import CookieErrorUI from "@/components/CookieErrorUI";

export default async function Page({ params }: { params: Promise<{ groupId: string }> }) {
  const parameters = await params;

  try {
    const groupId = parseInt(parameters.groupId)
    const groupData = await getGroupInfo(groupId)
    const groupUserData = await getGroupInfoFull(groupId)

    const cookieStore = await cookies()
    const qrCodeIdCookie = cookieStore.get('qrCodeId')

    if (!qrCodeIdCookie) {
      // If the cookie is not found, return error
      return (<CookieErrorUI />)
    }
    const qrCodeId = qrCodeIdCookie.value
    const qrCodes = groupUserData.masters.map(item => item.qrCode);
    const isMaster = qrCodes.includes(qrCodeId)

    return (
      <div className="overflow-x-auto">
        <div className="flex  justify-between">
          <div className="flex justify-start">
            <Link role="button" className="btn" href="/dashboard/group">group</Link>
          </div>
        </div>
        <table className="table">
          <caption>Basic Information</caption>
          {/* head */}
          <thead>
            <tr>
              <th>id</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupData).map(([id, value]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{value.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <hr />
        <br />

        <table className="table">
          <caption>masters</caption>
          {/* head */}
          <thead>
            <tr>
              <th>userId</th>
              <th>firstName</th>
              <th>lastName</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupUserData.masters).map(([id, value]) => (
              <tr key={id}>
                <td>{value.userId}</td>
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <hr />
        <br />

        <table className="table">
          <caption>slaves</caption>
          {/* head */}
          <thead>
            <tr>
              <th>userId</th>
              <th>firstName</th>
              <th>lastName</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupUserData.slaves).map(([id, value]) => (
              <tr key={id}>
                <td>{value.userId}</td>
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <hr />
        <br />

        {isMaster == true ? <PrivilegedJoinIdTable groupId={groupId} /> : <></>}

      </div>
    )


  } catch (error) {
    return (<a>{`error: ${error}`}</a>)
  }
}