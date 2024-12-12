"use server"

import prisma from "./prisma";
import { AuthnicationError } from "./errors/errorclasses";

export default async function doesQrCodeIdExist(qrCodeId: string) {
  try {
    const userData = prisma.user.findUnique({
      where: {
        qrCode: qrCodeId,
      },
    })

    if (Boolean(userData)) {
      return true
    } else {
      return false
    }
  } catch (err) {
    throw new AuthnicationError("an unknown error happened when checking if QrCodeId exist")
  }
}