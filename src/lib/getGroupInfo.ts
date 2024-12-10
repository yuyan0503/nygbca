"use server"

import prisma from "./prisma"

/**
 * 
 * @param groupId 
 * @returns group info
 * @throws new Error if group was not found, etc.
 */
export default async function getGroupInfo(groupId: number) {
  try {
    const findGroupId = groupId
    const group = await prisma.group.findUniqueOrThrow({
      where: {
        groupId: findGroupId,
      },
    })
    return (group)
  }
  catch (err) {
    if (err instanceof Error) {
      throw new Error('error: ' + err.message)
    } else {
      throw new Error('error: unknown error occured')
    }
  }
}