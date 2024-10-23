"use server"
import prisma from "./prisma";

import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'

export default async function signupLogic(formData) {
  try {
    const cookieStore = await cookies()
    const qrCodeId = cookieStore.get('qrCodeId').value

    const email = formData.get('email');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');

    const user = await prisma.user.create({
      data: {
        qrCode: qrCodeId,
        email,
        firstName,
        lastName,
      },
    });

    /*    const user = await prisma.user.create({
          data: {
            qrCode: qrCodeId,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        })
    */
  } catch (error) {
    // Handle any errors here
    console.error("sign up failed:", error);

  }

  redirect("/dashboard")
}