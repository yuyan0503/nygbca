"use server"

import prisma from "../prisma"

/**
 * 
 * @param groupId 
 * @returns full group info, including masters and slaves
 * @throws new Error if group was not found, etc. 
 */
export default async function getGroupInfoFull(groupId: number) {
  try {
    const findGroupId = groupId
    const group = await prisma.group.findUniqueOrThrow({
      where: {
        groupId: findGroupId,
      },
      include: {
        masters: true,  // Include master groups
        slaves: true    // Include slave groups
      }
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