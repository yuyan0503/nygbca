import { cookies } from "next/headers";
import Link from 'next/link'
import checkIfAllowedBc from "@/lib/bc/checkIfAllowedBc"
import LogoutButton from "@/components/navbar/LogoutButton";
import CookieErrorUI from "@/components/CookieErrorUI";

export default async function Page() {
  const cookieStore = await cookies()
  const qrCodeIdCookie = cookieStore.get('qrCodeId')

  if (!qrCodeIdCookie) {
    // If the cookie is not found, return error
    return (<CookieErrorUI />)
  }
  const qrCodeId = qrCodeIdCookie.value
  const isAllowedBc = await checkIfAllowedBc(qrCodeId)
  return (
    <>
      <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center">
        <div className="prose">
          <h1 className="mb-4 text-center">Welcome!</h1>
        </div>
        <p className="mb-2">Go to dashboard function</p>
        {isAllowedBc ? <Link className="btn btn-primary mb-2 w-full" href={`/bc`}>conduct BC</Link>
          : <></>}
        <Link className="btn btn-neutral mb-2 w-full" href={`/dashboard/group`}>Groups</Link>
        <Link className="btn btn-neutral mb-2 w-full" href={`/dashboard/viewuser`}>view user information</Link>
        <LogoutButton width={true} />
      </div>
    </>
  )

}