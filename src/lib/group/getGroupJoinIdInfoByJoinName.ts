import prisma from "../prisma";

export default async function getGroupJoinIdInfoByJoinName(joinName: string) {
  const findJoinName = joinName
  try {
    const groupJoinIdInfo = await prisma.groupJoinId.findUniqueOrThrow({
      where: {
        joinName: findJoinName,
      },
    })
    return groupJoinIdInfo
  } catch (err) {
    throw new Error("cannot find joinId associated with this joinName.")
  }

}