"use server"

import prisma from "./prisma";

export default async function authnicateByQr(qrCodeId: string) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        qrCode: qrCodeId
      },
    })
    return (user)
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(`Authentication failed: ${err.message}`);
    }
    throw new Error('Authentication failed: An unknown error occurred.');
  }
}
