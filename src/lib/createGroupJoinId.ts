import prisma from "./prisma";

export default async function createGroupJoinId(joiningGroupId:number, isMaster:boolean) {
  const groupJoinId = await prisma.groupJoinId.create({
    data: {
      isMaster,
      joiningGroupId,
    },
  })
  return (groupJoinId)
}