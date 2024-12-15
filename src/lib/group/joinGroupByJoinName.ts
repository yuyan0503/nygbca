import prisma from "../prisma";
import deleteGroupUserTie from "./deleteGroupUserTie";
import getGroupInfoFull from "./getGroupInfoFull";
import getGroupJoinIdInfoByJoinName from "./getGroupJoinIdInfoByJoinName";
import joinGroup from "./joinGroup";
import updateGroupJoinIdCountOrThrow from "./updateGroupJoinIdCountOrThrow";

export default async function joinGroupByJoinName(qrCodeId: string, joinName: string) {
  try {
    const updatedGroupJoinIdCount = updateGroupJoinIdCountOrThrow(joinName)
    const groupJoinIdInfo = await getGroupJoinIdInfoByJoinName(joinName)
    const joinId = groupJoinIdInfo.joinId
    const updatingGroupId = groupJoinIdInfo.joiningGroupId
    const isMaster = groupJoinIdInfo.isMaster

    const groupInfoFull = await getGroupInfoFull(updatingGroupId)
    const masterQrCodes = groupInfoFull.masters.map(item => item.qrCode);

    const isMasterAlready = masterQrCodes.includes(qrCodeId)
    if (isMasterAlready) {
      return (groupInfoFull)
    }

    const slaveQrCodes = groupInfoFull.slaves.map(item => item.qrCode);
    const isSlaveAlready = slaveQrCodes.includes(qrCodeId)

    if (isSlaveAlready) {
      const deletedUserTie = await deleteGroupUserTie(updatingGroupId, qrCodeId)
      const groupInfo = await joinGroup(qrCodeId, updatingGroupId, isMaster)
    }

    const groupInfo = await joinGroup(qrCodeId, updatingGroupId, isMaster)
    return (groupInfo)

  } catch (err) {
    throw new Error("an error occured when joining group by joinName")
  }
}