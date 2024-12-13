"use server"

import prisma from "./prisma";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

/**
 * 
 * @param formData 
 * @returns redirects to /dashboard
 * @throws new Error if form is incomplete, or some other error occurs e.g. a duplicate email
 */
export default async function signupLogic(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const qrCodeId = formData.get('qrCodeId')?.toString()
    const email = formData.get('email')?.toString();
    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();

    if (qrCodeId === undefined || email === undefined || firstName === undefined || lastName === undefined) {
      throw new Error("All fields are required.");
    }

    const user = await prisma.user.create({
      data: {
        qrCode: qrCodeId,
        email,
        firstName,
        lastName,
      },
    });

    cookieStore.set('qrCodeId', qrCodeId)
    cookieStore.set('langPref', user.preferredLanguage)

  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error occurred.');
  }

  const continueUrl = formData.get('continueUrl')?.toString()
  console.log(continueUrl)
  if (Boolean(continueUrl) && continueUrl != undefined) {
    redirect(continueUrl)
  } else {
    redirect("/dashboard")
  }
}