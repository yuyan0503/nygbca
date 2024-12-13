import LogoutButton from '@/components/LogoutButton'
import NavBar from '@/components/NavBar'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center">
        <div className="prose">
          <h1 className="mb-4 text-center">BorderControl</h1>
        </div>
        <p className="mb-2">Choose BC mode.</p>
        <Link className="btn btn-primary mb-2 w-full" href={`/bc/manual`}>BC manually</Link>
        <Link className="btn btn-primary mb-2 w-full" href={`/bc/auto`}>set up automatic BC</Link>
        <hr className="mb-4 w-full" />
        <Link className="btn btn-neutral mb-2 w-full" href={`/dashboard`}>back to dashboard</Link>
        <LogoutButton width={true} />
      </div>
    </>
  )
}