import LogoutButton from '@/components/LogoutButton'
import NavBar from '@/components/NavBar'
import gt from '@/lib/lang/gt'
import Link from 'next/link'

export default async function Page() {
  return (
    <NavBar>
      <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center">
        <div className="prose">
          <h1 className="mb-4 text-center">{await gt("bc.autobc.autobc")}</h1>
        </div>
        <p className="mb-2">{await gt("bc.autobc.selectBcMode")}</p>
        <Link className="btn btn-primary mb-2 w-full" href={`/bc/auto/enter`}>{await gt("bc.terms.enter")}</Link>
        <Link className="btn btn-primary mb-2 w-full" href={`/bc/auto/exit`}>{await gt("bc.terms.exit")}</Link>
        <hr className="mb-4 w-full" />
        <Link className="btn btn-neutral mb-2 w-full" href={`/bc`}>{await gt("bc.terms.bcHome")}</Link>
        <LogoutButton width={true} />
      </div>
    </NavBar>
  )
}