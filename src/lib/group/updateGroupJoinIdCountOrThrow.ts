import prisma from "../prisma";
import getGroupJoinIdInfoByJoinName from "./getGroupJoinIdInfoByJoinName";

export default async function updateGroupJoinIdCountOrThrow(joinName: string) {
  try {
    const groupJoinIdInfo = await getGroupJoinIdInfoByJoinName(joinName)
    const maxUse = groupJoinIdInfo.maxUse
    const updatedUse = groupJoinIdInfo.currentUse + 1

    if (maxUse < updatedUse) {
      throw new Error("it cannot be used anymore, due to maxUse<=currentUse")
    }

    const updatedGroupJoinId = await prisma.groupJoinId.update({
      where: {
        joinName,
      },
      data: {
        currentUse: updatedUse,
      }
    })

    return true

  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    } else {
      throw new Error("an unknown error occured when updating groupJoinId")
    }
  }
}