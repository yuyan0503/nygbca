"use server"

import prisma from "./prisma";

export default async function doesQrCodeIdExist(qrCodeId: string) {
  try {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        qrCode: qrCodeId,
      },
    })
    return true

  } catch (err) {
    return false
  }
}