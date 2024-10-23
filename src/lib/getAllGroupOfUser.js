import authnicateByQr from "./authnicateByQr";
import prisma from "./prisma";

export default async function getAllGroupOfUuser(qrCodeId) {
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
    throw new Error(' error happened while getting user group info: ' + err.message)
  }
}