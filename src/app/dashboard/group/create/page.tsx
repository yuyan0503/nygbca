"use server"

import Form from "next/form";
import Link from "next/link";
import createNewGroupFlow from "@/lib/createNewGroupFlow";

export default async function Page() {
  return (
    <>
      <div className="flex  justify-between">
        <div className="flex justify-start">
          <Link role="button" className="btn" href="/dashboard/group">group</Link>
        </div>
      </div>
      <br />
      <Form action={createNewGroupFlow}>
        <input type="text" name="groupName" placeholder="groupName" className="input input-bordered w-full max-w-xs" />
        <button className="btn btn-neutral" type="submit">Submit</button>
      </Form>
    </>

  )
}