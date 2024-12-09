"use server"

import Form from 'next/form'
import ToastBox from '../ToastBox';
import QrCodeIdLoginLogic from '@/lib/qrCodeIdLoginLogic';

export default async function QrCodeIdLogin() {

  return (
    <Form action={QrCodeIdLoginLogic}>
      <input type="text" name="qrCodeId" placeholder="Qr Code Id" className="input input-bordered w-full max-w-xs" />
      <button className="btn btn-neutral" type="submit">Submit</button>
    </Form>
  );
}
