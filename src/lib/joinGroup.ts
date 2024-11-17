"use server"

import authnicateByQr from "./authnicateByQr";
import prisma from "./prisma";

export default async function joinGroup(qrCodeId:string, updatingGroupId:number, isMaster:boolean) {

  let updateGroup;

  try {
    const groupId = updatingGroupId
    const user = await authnicateByQr(qrCodeId)
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

    return(updateGroup)

  } catch (error) {
    console.error("joining group failed:", error);
  }
}