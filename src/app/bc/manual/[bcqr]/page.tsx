"use server"

import getUserDataWithQrCodeId from "@/lib/user/getUserDataWithQrCodeId";
import Link from "next/link";
import Form from "next/form";
import checkIfUserInside from "@/lib/bc/checkIfUserInside";
import prisma from "@/lib/prisma";
import { redirect } from 'next/navigation'
import updateCount from "@/lib/bc/updateCount";
import gt from "@/lib/lang/gt";
import { buildCustomRoute } from "next/dist/server/lib/router-utils/filesystem";

export default async function Page({ params }: { params: Promise<{ bcqr: string }> }) {
  const parameters = await params;
  try {
    const qrCodeId = parameters.bcqr
    const result = await getUserDataWithQrCodeId(qrCodeId)
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
              <h1 className="mb-4 text-center">{await gt("bc.terms.exit")}</h1>
              <p>{await gt("bc.manualbc.exitMessage")}</p>
            </div>
            <Form action={updateCount} className="w-full">
              <input type="hidden" name="qrCodeId" value={qrCodeId} />
              <input type="hidden" name="updatedBorderCrossCount" value={updatedBorderCrossCount} />
              <button className="btn btn-primary mb-2 w-full" type="submit">{await gt("bc.terms.exit")}</button>
              <Link className="btn btn-neutral mb-2 w-full" href="./">{await gt("terms.cancel")}</Link>
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
              <h1 className="mb-4 text-center">{await gt("bc.terms.enter")}</h1>
              <p>{await gt("bc.manualbc.enterMessage")}</p>
            </div>
            <Form action={updateCount} className="w-full">
              <input type="hidden" name="qrCodeId" value={qrCodeId} />
              <input type="hidden" name="updatedBorderCrossCount" value={updatedBorderCrossCount} />
              <button className="btn btn-primary mb-2 w-full" type="submit">{await gt("bc.terms.enter")}</button>
              <Link className="btn btn-neutral mb-2 w-full" href="./">{await gt("terms.cancel")}</Link>
            </Form>
          </div>
        </div>
      )
    }
  } catch (err) {
    return (
      <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center min-h-screen">
        <div className="prose">
          <h1 className="mb-4 text-center">{await gt("terms.error")}</h1>
        </div>
        <p className="mb-2">{await gt("appInfo.message.anErrorOccured")}</p>
        <Link className="btn btn-primary mb-4 w-full" href="./">{await gt("terms.error")}</Link>
      </div>
    )
  }
}