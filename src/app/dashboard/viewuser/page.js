import { cookies } from 'next/headers'
import Link from 'next/link'

import authnicateByQr from "@/lib/authnicateByQr"

export default async function Page() {

  let userData = {}

  try {
    const cookieStore = await cookies()
    const qrCodeId = cookieStore.get('qrCodeId').value
    userData = await authnicateByQr(qrCodeId)
    console.log(userData)
  } catch (error) {
    return (<a>{`error: ${error}`}</a>)
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex  justify-between">
        <div className="flex justify-start">
          <Link role="button" className="btn" href="/dashboard">home</Link>
        </div>
      </div>
      <table className="table">
        <caption>userInfo</caption>
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userData).map((id) => (
            <tr key={id}><td>{id}</td><td>{userData[id].toString()}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


