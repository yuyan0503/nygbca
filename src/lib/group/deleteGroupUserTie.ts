import prisma from "../prisma";
import doesQrCodeIdExist from "../doesQrCodeIdExist";
import masterOrSlaveOrThrow from "./masterOrSlaveOrThrow";

export default async function deleteGroupUserTie(groupId: number, qrCodeId: string) {
  try {
    const isQrCodeLegit = await doesQrCodeIdExist(qrCodeId)
    if (!isQrCodeLegit) {
      throw new Error("Qr code Id does not exist!")
    }

    const masterOrSlave = await masterOrSlaveOrThrow(groupId, qrCodeId)

    if (masterOrSlave == "master") {
      const deleteRelation = await prisma.user.update(
        {
          where: {
            qrCode: qrCodeId,
          }, data: {
            masterGroup: {
              disconnect: {
                groupId,
              }
            }
          }
        }
      )
    } else if (masterOrSlave == "slave") {
      const deleteRelation = await prisma.user.update(
        {
          where: {
            qrCode: qrCodeId,
          }, data: {
            slaveGroup: {
              disconnect: {
                groupId,
              }
            }
          }
        }
      )
    }
    return true
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    } else {
      throw new Error("An unknown error occured at deleteGroupUserTie.ts")
    }
  }
}