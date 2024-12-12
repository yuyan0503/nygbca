import LogoutButton from '@/components/navbar/LogoutButton'
import NavBar from '@/components/navbar/NavBar'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center">
        <div className="prose">
          <h1 className="mb-4 text-center">Auto BC</h1>
        </div>
        <p className="mb-2">Choose Auto BC mode.</p>
        <Link className="btn btn-primary mb-2 w-full" href={`/bc/auto/enter`}>Enter</Link>
        <Link className="btn btn-primary mb-2 w-full" href={`/bc/auto/exit`}>Exit</Link>
        <hr className="mb-4 w-full" />
        <Link className="btn btn-neutral mb-2 w-full" href={`/bc`}>BC top</Link>
        <LogoutButton width={true} />
      </div>
    </>
  )
}