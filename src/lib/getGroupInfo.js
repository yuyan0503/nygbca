"use server"

import prisma from "./prisma"

export default async function getGroupInfo(groupId) {
  try {
    const findGroupId = parseInt(groupId)
    const group = await prisma.group.findUniqueOrThrow({
      where: {
        groupId: findGroupId,
      },
    })
    console.log(group)
    return (group)
  }
  catch (err) {
    throw new Error('error: ' + err.message)
  }
}