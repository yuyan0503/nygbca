import prisma from "../prisma"

/**
 * finds all groupId associated with the group
 * @param groupId 
 * @returns group object with joinId
 * @throws error if group is not found, etc.
 */
export default async function getGroupJoinId(groupId: number) {
  try {
    const findGroupId = groupId
    const group = await prisma.group.findUniqueOrThrow({
      where: {
        groupId: findGroupId,
      },
      include: {
        joinId: true
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