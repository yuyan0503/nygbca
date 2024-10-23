"use server"
import { redirect } from "next/dist/server/api-utils";
import prisma from "./prisma";

export default async function createGroup(formData) {
  try {
    const groupName = formData.get('groupName');
    const group = await prisma.group.create({
      data: {
        groupName,
      },
    });
    return group
  } catch (error) {
    throw new Error("creating group failed:", error);
  }

  //  redirect(`/dashboard/groups/${group.groupId}`)
}