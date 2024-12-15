"use server"

import prisma from "../prisma"

export default async function updateCountOfQrCodeId(qrCodeId: string, updatedCount: number) {
  try {
    const updateCount = await prisma.user.update({
      where: {
        qrCode: qrCodeId,
      },
      data: {
        borderCrossCount: updatedCount,
      },
    })
    return (updateCount)

  } catch (err) {
    throw new Error("cannot update, probably the qrCodeId does not exist")
  }
}