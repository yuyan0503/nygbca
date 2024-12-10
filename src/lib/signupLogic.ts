"use server"
import prisma from "./prisma";

import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'
import { NoQrCodeIdInCookieError } from "./errors/errorclasses";

/**
 * 
 * @param formData 
 * @returns redirects to /dashboard
 * @throws new Error if form is incomplete, or some other error occurs e.g. a duplicate email
 */
export default async function signupLogic(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const qrCodeIdCookie = cookieStore.get('qrCodeId')

    if (!qrCodeIdCookie) {
      // If the cookie is not found, return children
      throw new NoQrCodeIdInCookieError
    }
    const qrCodeId = qrCodeIdCookie.value

    const email = formData.get('email')?.toString();
    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();

    if (email === undefined || firstName === undefined || lastName === undefined) {
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

  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error occurred.');
  }
  redirect("/dashboard")
}