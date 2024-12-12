"use server"

import Form from "next/form"
import signupLogic from "@/lib/signupLogic"

export default async function QrCodeSignupForm() {
  return (
    <Form action={signupLogic}>
      <input type="text" name="firstName" placeholder="firstName" className="input input-bordered w-full max-w-xs" required />
      <input type="text" name="lastName" placeholder="LastName" className="input input-bordered w-full max-w-xs" required />
      <input type="email" name="email" placeholder="example@example.com" className="input input-bordered w-full max-w-xs" required />
      <button className="btn btn-neutral" type="submit">Submit</button>
    </Form>
  )
}