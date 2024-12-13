import { cookies } from "next/headers";
import Link from 'next/link'
import checkIfAllowedBc from "@/lib/bc/checkIfAllowedBc"
import LogoutButton from "@/components/LogoutButton";
import CookieErrorUI from "@/components/CookieErrorUI";
import gt from "@/lib/lang/gt";

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
          <h1 className="mb-4 text-center">{await gt("terms.welcome")}</h1>
        </div>
        <p className="mb-2">{await gt("dashboard.dashboardFunction")}</p>
        {isAllowedBc ? <Link className="btn btn-primary mb-2 w-full" href={`/bc`}>{await gt("bc.terms.bc")}</Link>
          : <></>}
        <Link className="btn btn-neutral mb-2 w-full" href={`/dashboard/group`}>{await gt("group.groups")}</Link>
        <Link className="btn btn-neutral mb-2 w-full" href={`/dashboard/viewuser`}>{await gt("dashboard.userInfo")}</Link>
        <LogoutButton width={true} />
      </div>
    </>
  )

}