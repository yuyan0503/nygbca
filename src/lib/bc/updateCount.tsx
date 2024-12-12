"use server"
import { redirect } from 'next/navigation'

export default async function updateCount(formData: FormData) {
  const qrCodeId = formData.get("qrCodeId")?.toString()
  const updatedBorderCrossCount = formData.get("updatedBorderCrossCount")
  if (typeof updatedBorderCrossCount == null) {
    throw new Error("borderCount does not exist.")
  }
  const borderCrossCount = Number(updatedBorderCrossCount)

  const updateCount = await prisma.user.update({
    where: {
      qrCode: qrCodeId,
    },
    data: {
      borderCrossCount,
    },
  })
  redirect("/bc/manual")
}