import prisma from "../prisma";

/**
 * 
 * @param qrCodeId 
 * @returns user object, including masterGroup and slaveGroup
 * @throws new Error if user is not found, etc.
 */
export default async function getAllGroupOfUuser(qrCodeId: string) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        qrCode: qrCodeId
      },
      include: {
        masterGroup: true,  // Include master groups
        slaveGroup: true    // Include slave groups
      }
    })
    return (user)
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error(' error happened while getting user group info: ' + err.message)
    } else {
      throw new Error(' error happened while getting user group info: unknown error occured')
    }
  }
}