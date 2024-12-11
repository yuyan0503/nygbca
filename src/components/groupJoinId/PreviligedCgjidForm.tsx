"use server"

import Form from 'next/form'
import Link from "next/link";
import createGroupJoinIdLogic from '@/lib/group/createGroupJoinIdLogic';

export default async function PriviligedCgjidForm({ groupId }: { groupId: number }) {
  return (

    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-start">
          <Link className="btn" href={`/dashboard/group/${groupId}`}>{`group ${groupId}`}</Link>
        </div>
      </div>
      <Form action={createGroupJoinIdLogic}>

        <div className="form-control">
          <label className="form-control">
            <span className="label label-text">groupId</span>
            <input type="text" name="groupId" placeholder="joinName" className="input input-bordered w-full max-w-xs" value={groupId} required readOnly />
          </label>
        </div>

        <div className="form-control">
          <label className="form-control">
            <span className="label label-text">joinName. Must be unique</span>
            <input type="text" name="joinName" placeholder="joinName" className="input input-bordered w-full max-w-xs" required />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">maxUse</span>
            <input type="number" name="maxUse" placeholder="255" className="input input-bordered w-full max-w-xs" />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label label-text">isMaster</span>
            <input type="checkbox" name="isMaster" className="toggle" />
          </label>
        </div>
        <button className="btn btn-neutral" type="submit">Submit</button>
      </Form>
    </div>

  )
}
