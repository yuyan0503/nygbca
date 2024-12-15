"use server"

import prisma from "../prisma"

export default async function deleteGroupJoinId(groupJoinId: number) {
  try {
    const deletedGroupJoinId = await prisma.groupJoinId.delete(
      {
        where: {
          joinId: groupJoinId,
        },
      }
    )
    return true
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    } else {
      throw new Error("an unknown error happened at deleteGroupJoinIdLogic")
    }
  }

}