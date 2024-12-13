"use server"

import prisma from "../prisma";

/**
 * @returns info of group that was just created.
 * @throws new Error when creation of group fails
 */
export default async function createGroup(formData: FormData) {

  try {
    const groupName = formData.get('groupName')?.toString();
    if (groupName == undefined) {
      throw new Error("groupName is undefined!")
    }

    const isAllowedBorderControl = Boolean(formData.get('isAllowedBorderControl'))

    const group = await prisma.group.create({
      data: {
        groupName,
        isAllowedBorderControl,
      },
    });
    return group

  } catch (error) {

    if (error instanceof Error) {
      throw new Error(`creating group failed: ${error.message}`);
    } else {
      throw new Error("unknown error occured");
    }
  }
}