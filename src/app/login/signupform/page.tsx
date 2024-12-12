"use server"

import Link from 'next/link';
import Form from "next/form"
import signupLogic from "@/lib/signupLogic"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const continueUrl = (await searchParams).continue
  const qrCodeId = (await searchParams).qrcode
  return (
    <div className="mx-auto max-w-xs flex flex-col items-center justify-center min-h-screen">
      <Form action={signupLogic} className="w-full">
        <div className="prose">
          <h1 className="mb-2 text-center">Sign up</h1>
        </div>
        <input type="hidden" name="continueUrl" value={continueUrl} />
        <div className="form-control mb-4 w-full">
          <label className="form-control w-full">
            <span className="label label-text w-full">QR Code Id</span>
            <input type="text" name="qrCodeId" placeholder="qrCodeId" value={qrCodeId} className="input input-bordered w-full" readOnly required />
          </label>
        </div>
        <div className="form-control mb-4 w-full">
          <label className="form-control w-full">
            <span className="label label-text w-full">first Name</span>
            <input type="text" name="firstName" placeholder="firstName" className="input input-bordered w-full" required />
          </label>
        </div>
        <div className="form-control mb-4 w-full">
          <label className="form-control w-full">
            <span className="label label-text w-full">last Name</span>
            <input type="text" name="lastName" placeholder="lastName" className="input input-bordered w-full" required />
          </label>
        </div>
        <div className="form-control mb-4 w-full">
          <label className="form-control w-full">
            <span className="label label-text w-full">email</span>
            <input type="email" name="email" placeholder="example@example.com" className="input input-bordered w-full" required />
          </label>
        </div>
        <button className="btn btn-primary mb-2 w-full" type="submit">Submit</button>
        <Link className="btn btn-neutral mb-2 w-full" href="/login">cancel</Link>
      </Form>
    </div>

  )
}