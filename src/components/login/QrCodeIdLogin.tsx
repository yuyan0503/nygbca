"use server"

import Form from 'next/form'
import Link from 'next/link';
import ToastBox from '../ToastBox';
import QrCodeIdLoginLogic from '@/lib/qrCodeIdLoginLogic';

export default async function QrCodeIdLogin() {

  return (
    <div className="mx-auto max-w-xs flex flex-col items-center justify-center min-h-screen">
      <Form action={QrCodeIdLoginLogic}>
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

  );
}
