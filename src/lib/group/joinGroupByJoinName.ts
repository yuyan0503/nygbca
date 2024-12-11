import getGroupJoinIdInfoByJoinName from "./getGroupJoinIdInfoByJoinName";
import joinGroup from "./joinGroup";

export default async function joinGroupByJoinName(qrCodeId: string, joinName: string) {
  try {
    const groupJoinIdInfo = await getGroupJoinIdInfoByJoinName(joinName)
    const updatingGroupId = groupJoinIdInfo.joiningGroupId
    const isMaster = groupJoinIdInfo.isMaster
    const groupInfo = joinGroup(qrCodeId, updatingGroupId, isMaster)
    return (groupInfo)
  } catch (err) {
    throw new Error("an error occured when joining group by joinName")
  }

}