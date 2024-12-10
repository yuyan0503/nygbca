"use server"

import prisma from "./prisma";

import { AuthnicationError } from "./errors/errorclasses";

/**
 * Checks if the provided qrCodeId is valid and returns 
 * the user object associated with that qrCodeId.
 * 
 * @param qrCodeId - QR code ID of some user.
 * @returns The user object associated with the specified qrCodeId.
 * @throws {@link AuthenticationError} - Thrown when the user is not found.
 */
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
    if (err instanceof AuthnicationError) {
      throw new AuthnicationError(err.message);
    }
    throw new Error('Authentication failed: An unknown error occurred.');
  }
}
