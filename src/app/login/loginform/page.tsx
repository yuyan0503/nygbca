import Link from 'next/link';
import Form from 'next/form'
import QrCodeIdLoginLogic from '@/lib/qrCodeIdLoginLogic';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const continueUrl = (await searchParams).continue
  return (
    <div className="mx-auto max-w-xs">
      <div className="w-full flex flex-col items-center justify-center min-h-screen">
        <Form action={QrCodeIdLoginLogic} className="w-full">
          <input type="hidden" name="continueUrl" value={continueUrl} />
          <div className="form-control mb-4 w-full">
            <label className="form-control w-full mb-4">
              <span className="label label-text w-full mb-4">please input your QR Code Id.</span>
              <input type="text" name="qrCodeId" placeholder="qrCodeId" className="input input-bordered w-full" required />
            </label>
          </div>
          <button className="btn btn-primary mb-4 w-full" type="submit">Submit</button>
          <Link className="btn btn-neutral mb-4 w-full" href="/login">other login options</Link>
        </Form>
      </div>

    </div>

  )
}