import { cookies } from 'next/headers'
import Link from 'next/link'

import getUserDataWithQrCodeId from "@/lib/user/getUserDataWithQrCodeId"
import ChangeLangButton from '@/components/ChangeLangButton'

export default async function Page() {

  try {
    const cookieStore = await cookies()
    const qrCodeIdCookie = cookieStore.get('qrCodeId')

    if (!qrCodeIdCookie) {
      // If the cookie is not found, return children
      return (<a>{"error: qrCodeId not found in browser cookie"}</a>)
    }
    const qrCodeId = qrCodeIdCookie.value
    const userData = await getUserDataWithQrCodeId(qrCodeId)

    return (
      <div className="overflow-x-auto">
        <div className="flex  justify-between">
          <div className="flex justify-start">
            <Link role="button" className="btn" href="/dashboard">home</Link>
          </div>
          <div className="flex justify-end">
            <ChangeLangButton qrCodeId={qrCodeId} width={false} />
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
            {Object.entries(userData).map(([id, value]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{value.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

  } catch (error) {
    return (<a>{`error: ${error}`}</a>)
  }
}


