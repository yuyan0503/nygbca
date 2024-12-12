import Link from 'next/link'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let continueUrlFragment = "";
  const continueUrl = (await searchParams).continue
  if (continueUrl != undefined) {
    continueUrlFragment = `?continue=${continueUrl}`
  }
  return (
    <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center min-h-screen">
      <div className="prose">
        <h1 className="mb-4 text-center">Welcome to nygbca</h1>
      </div>
      <Link className="btn btn-primary mb-4 w-full" href={`/login/scanqr${continueUrlFragment}`}>log in by scanning Qr Code</Link>
      <p className="mb-2">not working?</p>
      <Link className="btn btn-neutral mb-4 w-full" href={`/login/loginform${continueUrlFragment}`}>log in by entering Qr Code Id </Link>
      <p className="mb-2">Don't have an account?</p>
      <Link className="btn btn-neutral mb-2 w-full" href={`/login/signup${continueUrlFragment}`}>sign up by scanning Qr Code</Link>
    </div>
  )
}