import { cookies } from "next/headers";
import Link from "next/link";
import Form from "next/form";
import gt from "@/lib/lang/gt";
import CookieErrorUI from "@/components/CookieErrorUI";
import getGroupJoinId from "@/lib/group/getGroupJoinId"
import getGroupInfo from "@/lib/group/getGroupInfo";
import getGroupInfoFull from "@/lib/group/getGroupInfoFull";
import deleteGroupJoinIdLogic from "@/lib/group/deleteGroupJoinIdLogic";
import deleteUserFromGroupLogic from "@/lib/group/deleteUserFromGroupLogic";
import masterOrSlaveOrThrow from "@/lib/group/masterOrSlaveOrThrow";

async function DeleteUserForm({ groupId, qrCodeId }: { groupId: number, qrCodeId: string }) {
  return (
    <Form action={deleteUserFromGroupLogic}>
      <input type="hidden" name="groupId" value={groupId} />
      <input type="hidden" name="qrCodeId" value={qrCodeId} />
      <button className="btn" type="submit">{gt("terms.delete")}</button>
    </Form>
  )
}

async function PrivilegedJoinIdTable({ groupId }: { groupId: number }) {

  const joinIdData = await getGroupJoinId(groupId)
  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex justify-end">
          <Link className="btn" href={`/dashboard/group/${groupId}/cgjid`}>{await gt("groupJoinId.generateGroupJoinId")}</Link>
        </div>
      </div>

      <table className="table">
        <caption>{await gt("groupJoinId.joinCode")}</caption>
        {/* head */}
        <thead>
          <tr>
            <th>joinId</th>
            <th>{await gt("groupJoinId.joinCode")}</th>
            <th>{await gt("groupJoinId.isMaster")}</th>
            <th>{await gt("groupJoinId.maxUse")}</th>
            <th>{await gt("groupJoinId.currentUse")}</th>
            <th>{await gt("terms.createdAt")}</th>
            <th>{await gt("terms.updatedAt")}</th>
            <th>{await gt("group.groupId")}</th>
            <th>{await gt("terms.delete")}</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(joinIdData.joinId).map(([id, value]) => (
            <tr key={id}>
              {Object.entries(value).map(([id, value]) => (
                <td key={id}>{value.toString()}</td>
              ))}
              <td>
                <Form action={deleteGroupJoinIdLogic}>
                  <input type="hidden" name="groupId" value={groupId} />
                  <input type="hidden" name="joinId" value={value.joinId} />
                  <button className="btn" type="submit">{gt("terms.delete")}</button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

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
    const masterOrSlave = await masterOrSlaveOrThrow(groupId, qrCodeId)
    const isMaster = masterOrSlave == "master"

    return (
      <div className="overflow-x-auto">
        <div className="flex  justify-between">
          <div className="flex justify-start">
            <Link role="button" className="btn" href="/dashboard/group">{await gt("group.group")}</Link>
          </div>
        </div>
        <table className="table">
          <caption>{await gt("group.group")}</caption>
          {/* head */}
          <thead>
            <tr>
              <th>{await gt("terms.id")}</th>
              <th>{await gt("terms.value")}</th>
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
          <caption>{await gt("group.masters")}</caption>
          {/* head */}
          <thead>
            <tr>
              <th>{await gt("dashboard.userId")}</th>
              <th>{await gt("dashboard.firstName")}</th>
              <th>{await gt("dashboard.lastName")}</th>
              <th>{await gt("terms.delete")}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupUserData.masters).map(([id, value]) => (
              <tr key={id}>
                <td>{value.userId}</td>
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
                {isMaster ?
                  <td>
                    <DeleteUserForm groupId={groupId} qrCodeId={value.qrCode} />
                  </td> :
                  <></>
                }
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <hr />
        <br />

        <table className="table">
          <caption>{await gt("group.slaves")}</caption>
          {/* head */}
          <thead>
            <tr>
              <th>{await gt("dashboard.userId")}</th>
              <th>{await gt("dashboard.firstName")}</th>
              <th>{await gt("dashboard.lastName")}</th>
              <th>{await gt("terms.delete")}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupUserData.slaves).map(([id, value]) => (
              <tr key={id}>
                <td>{value.userId}</td>
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
                {isMaster ?
                  <td>
                    <DeleteUserForm groupId={groupId} qrCodeId={value.qrCode} />
                  </td> :
                  <></>
                }
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
    return (<a>{`${await gt("terms.error")}: ${error}`}</a>)
  }
}