"use server"

import prisma from "./prisma"

export default async function getGroupInfoFull(groupId) {
  try {
    const findGroupId = parseInt(groupId)
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
    throw new Error('error: ' + err.message)
  }
}