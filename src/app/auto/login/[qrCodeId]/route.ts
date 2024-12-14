import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

import doesQrCodeIdExist from "@/lib/doesQrCodeIdExist"

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
  redirect("/dashboard")
}