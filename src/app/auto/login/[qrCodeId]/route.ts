import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

import doesQrCodeIdExist from "@/lib/user/doesQrCodeIdExist";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ qrCodeId: string }> }
) {
  const qrCodeId = (await params).qrCodeId
  const isQrCodeLegit = await doesQrCodeIdExist(qrCodeId)
  if (isQrCodeLegit) {
    const cookieStore = await cookies();
    cookieStore.delete('qrCodeId');
    cookieStore.set('qrCodeId', qrCodeId);
  }
  const cookieStore = await cookies();
  const isQrCodeCookiePresent = cookieStore.has("qrCodeId")
  if (!isQrCodeCookiePresent) {
    redirect(`/login/signupform?qrcode=${qrCodeId}`)
  }
  redirect("/dashboard")
}