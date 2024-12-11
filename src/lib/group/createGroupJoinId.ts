import prisma from "../prisma";

/**
 * 
 * @param joiningGroupId 
 * @param joinName 
 * @param isMaster 
 * @returns groupJoinId
 * @throws new Error "creation of groupJoinId failed, most likely because of same joinName"
 */
export default async function createGroupJoinId(joiningGroupId: number, joinName: string, isMaster: boolean, maxUse?: number) {
  try {
    if (maxUse == undefined) {
      const groupJoinId = await prisma.groupJoinId.create({
        data: {
          joiningGroupId,
          joinName,
          isMaster,
        },
      })
      return (groupJoinId)
    } else {
      const groupJoinId = await prisma.groupJoinId.create({
        data: {
          joiningGroupId,
          joinName,
          isMaster,
          maxUse,
        },
      })
      return (groupJoinId)
    }

  } catch (err) {
    throw new Error("creation of groupJoinId failed, most likely because of same joinName")
  }
}