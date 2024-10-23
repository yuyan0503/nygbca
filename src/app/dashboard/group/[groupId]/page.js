import getGroupInfo from "@/lib/getGroupInfo";
import getGroupInfoFull from "@/lib/getGroupInfoFull";
import Link from "next/link";

export default async function Page({ params }) {
  const parameters = await params;
  let groupData = {}
  let groupUserData = {}

  try {
    const groupId = parameters.groupId
    groupData = await getGroupInfo(groupId)
    groupUserData = await getGroupInfoFull(groupId)
    console.log(groupUserData)

  } catch (error) {
    return (<a>{`error: ${error}`}</a>)
  }

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
          {Object.keys(groupData).map((id) => (
            <tr key={id}><td>{id}</td><td>{groupData[id].toString()}</td></tr>
          ))}
        </tbody>
      </table>
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
          {Object.keys(groupUserData.masters).map((id) => (
            <tr key={id}>
              <td>{groupUserData.masters[id].userId}</td>
              <td>{groupUserData.masters[id].firstName}</td>
              <td>{groupUserData.masters[id].lastName}</td>
            </tr>

          ))}
        </tbody>
      </table>

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
          {Object.keys(groupUserData.slaves).map((id) => (
            <tr key={id}>
              <td>{groupUserData.slaves[id].userId}</td>
              <td>{groupUserData.slaves[id].firstName}</td>
              <td>{groupUserData.slaves[id].lastName}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  )
}