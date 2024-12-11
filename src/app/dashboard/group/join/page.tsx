import joinGroupLogic from "@/lib/group/joinGroupLogic"
import Form from "next/form"
import Link from "next/link"

export default function Page() {
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-start">
          <Link className="btn" href={`/dashboard/group/`}>group</Link>
        </div>
      </div>
      <Form action={joinGroupLogic}>
        <div className="form-control">
          <label className="form-control">
            <span className="label label-text">input your joinName</span>
            <input type="text" name="joinName" placeholder="joinName" className="input input-bordered w-full max-w-xs" required />
          </label>
        </div>
        <button className="btn btn-neutral" type="submit">Submit</button>
      </Form>
    </div>

  )
}