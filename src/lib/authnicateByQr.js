"use server"

import prisma from "./prisma";

export default async function authnicateByQr(qrCodeId) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        qrCode: qrCodeId
      },
    })
    return (user)
  }
  catch (err) {
    throw new Error('Authentication failed: ' + err.message)
  }
}
