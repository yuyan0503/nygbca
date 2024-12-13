import LogoutButton from '@/components/LogoutButton'
import NavBar from '@/components/NavBar'
import gt from '@/lib/lang/gt'
import Link from 'next/link'

export default async function Page() {
  return (
    <>
      <NavBar />
      <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center">
        <div className="prose">
          <h1 className="mb-4 text-center">{await gt("bc.terms.bc")}</h1>
        </div>
        <p className="mb-2">{await gt("bc.autobc.selectBcMode")}</p>
        <Link className="btn btn-primary mb-2 w-full" href={`/bc/manual`}>{await gt("bc.terms.manualBcSetup")}</Link>
        <Link className="btn btn-primary mb-2 w-full" href={`/bc/auto`}>{await gt("bc.terms.autoBcSetup")}</Link>
        <hr className="mb-4 w-full" />
        <Link className="btn btn-neutral mb-2 w-full" href={`/dashboard`}>{await gt("dashboard.phrases.backToDashboard")}</Link>
        <LogoutButton width={true} />
      </div>
    </>
  )
}