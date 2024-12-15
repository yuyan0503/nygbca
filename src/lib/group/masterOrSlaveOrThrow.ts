import getGroupInfoFull from "./getGroupInfoFull";

export default async function masterOrSlaveOrThrow(groupId: number, qrCodeId: string) {

  const groupInfoFull = await getGroupInfoFull(groupId)

  const masterQrCodes = groupInfoFull.masters.map(item => item.qrCode);
  const isMasterAlready = masterQrCodes.includes(qrCodeId)
  if (isMasterAlready) {
    return ("master")
  }

  const slaveQrCodes = groupInfoFull.slaves.map(item => item.qrCode);
  const isSlaveAlready = slaveQrCodes.includes(qrCodeId)
  if (isSlaveAlready) {
    return ("slave")
  }

  throw new Error("error, probably not in the group")
}