import prisma from "../prisma";
import getGroupJoinIdInfoByJoinName from "./getGroupJoinIdInfoByJoinName";
import joinGroup from "./joinGroup";

export default async function joinGroupByJoinName(qrCodeId: string, joinName: string) {
  try {
    const groupJoinIdInfo = await getGroupJoinIdInfoByJoinName(joinName)
    const maxUse = groupJoinIdInfo.maxUse
    const updatedUse = groupJoinIdInfo.currentUse + 1
    if (maxUse < updatedUse) {
      throw new Error("it cannot be used anymore, due to maxUse<=currentUse")
    }
    const joinId = groupJoinIdInfo.joinId
    const updatingGroupId = groupJoinIdInfo.joiningGroupId
    const isMaster = groupJoinIdInfo.isMaster
    const groupInfo = joinGroup(qrCodeId, updatingGroupId, isMaster)
    const updateGroupJoinIdCount = await prisma.groupJoinId.update({
      where: {
        joinId,
      },
      data: {
        currentUse: updatedUse,
      }
    })
    return (groupInfo)
  } catch (err) {
    throw new Error("an error occured when joining group by joinName")
  }

}