"use server"

import getUserDataWithQrCodeId from "../user/getUserDataWithQrCodeId";
import prisma from "../prisma";

/**
 * 
 * @param qrCodeId 
 * @param updatingGroupId 
 * @param isMaster 
 * @returns updated group information
 * @throws new Error when it fails
 */
export default async function joinGroup(qrCodeId: string, updatingGroupId: number, isMaster: boolean) {

  let updateGroup;

  try {
    const groupId = updatingGroupId
    const user = await getUserDataWithQrCodeId(qrCodeId)
    const userId = user.userId
    if (isMaster == true) {
      updateGroup = await prisma.group.update({
        where: {
          groupId,
        },
        data: {
          masters: {
            connect: { userId }, // Connect the existing user
          },
        },
      })

      const updateUser = await prisma.user.update({
        where: {
          userId,
        },
        data: {
          masterGroup: {
            connect: { groupId }, // Connect the existing group
          },
        },
      });

    } else {
      updateGroup = await prisma.group.update({
        where: {
          groupId,
        },
        data: {
          slaves: {
            connect: { userId }, // Connect the existing user
          },
        },
      });

      const updateUser = await prisma.user.update({
        where: {
          userId,
        },
        data: {
          slaveGroup: {
            connect: { groupId }, // Connect the existing group
          },
        },
      });
    }

    return (updateGroup)

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error("An error occured when joining group at joinGroup.ts")
    }
  }
}