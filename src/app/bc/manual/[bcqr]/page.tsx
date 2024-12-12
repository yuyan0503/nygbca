"use server"

import authnicateByQr from "@/lib/authnicateByQr";
import Link from "next/link";
import Form from "next/form";
import checkIfUserInside from "@/lib/bc/checkIfUserInside";
import prisma from "@/lib/prisma";
import { redirect } from 'next/navigation'
import updateCount from "@/lib/bc/updateCount";

export default async function Page({ params }: { params: Promise<{ bcqr: string }> }) {
  const parameters = await params;
  try {
    const qrCodeId = parameters.bcqr
    const result = await authnicateByQr(qrCodeId)
    const isInside = await checkIfUserInside(qrCodeId)
    const borderCrossCount = result.borderCrossCount
    const updatedBorderCrossCount = borderCrossCount + 1

    if (isInside) {
      return (
        <div className="relative">
          <Link className="btn btn-square top-2 left-2 z-10 fixed" href="/bc">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center min-h-screen">
            <div className="prose">
              <h1 className="mb-4 text-center">Exit</h1>
              <p>clicking the button below will cause the holder of this QR Code to exit.</p>
            </div>
            <Form action={updateCount} className="w-full">
              <input type="hidden" name="qrCodeId" value={qrCodeId} />
              <input type="hidden" name="updatedBorderCrossCount" value={updatedBorderCrossCount} />
              <button className="btn btn-primary mb-2 w-full" type="submit">Exit</button>
              <Link className="btn btn-neutral mb-2 w-full" href="./">cancel</Link>
            </Form>
          </div>
        </div>
      )
    } else {
      return (
        <div className="relative">
          <Link className="btn btn-square top-2 left-2 z-10 fixed" href="/bc">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
          <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center min-h-screen">
            <div className="prose">
              <h1 className="mb-4 text-center">Enter</h1>
              <p>clicking the button below will cause the holder of this QR Code to enter.</p>
            </div>
            <Form action={updateCount} className="w-full">
              <input type="hidden" name="qrCodeId" value={qrCodeId} />
              <input type="hidden" name="updatedBorderCrossCount" value={updatedBorderCrossCount} />
              <button className="btn btn-primary mb-2 w-full" type="submit">Enter</button>
              <Link className="btn btn-neutral mb-2 w-full" href="./">cancel</Link>
            </Form>
          </div>
        </div>
      )
    }
  } catch (err) {
    return (
      <div>
        <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center min-h-screen">
          <div className="prose">
            <h1 className="mb-4 text-center">Error</h1>
          </div>
          <p className="mb-2">an error occured</p>
          <Link className="btn btn-primary mb-4 w-full" href="./">cancel</Link>
        </div>
      </div>
    )
  }
}