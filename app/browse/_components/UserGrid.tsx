"use client";
import { TUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function UserGrid({ users, loading }: { users: TUser[], loading: boolean }) {
  
  if (loading) return <p className="text-center">Loading...</p>;
  if (!users.length) return <p className="text-center text-gray-500 mt-6">No users found</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map(u => (
        <Link key={u._id} href={`/profile/${u.username}`} 
              className="bg-white rounded-xl p-4 shadow border hover:scale-[1.03] transition cursor-pointer h-[290px] flex flex-col">

          <div className="flex gap-4 items-center">
            <Image src={u.profilePicture} width={70} height={70} alt="" className="rounded-full border"/>
            <div>
              <p className="font-semibold text-gray-900">{u.name}</p>
              <p className="text-sm text-gray-500">@{u.username}</p>
            </div>
          </div>

          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{u.bio}</p>

          {/* Teach vs Learn separated */}
          <div className="mt-auto space-y-2">

            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-blue-700">Teaches</p>
              <div className="flex flex-wrap gap-2">
                {u.skillsToTeach.map((s, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 px-2 py-[3px] rounded-md text-xs">{s}</span>
                ))}
              </div>
            </div>
            {/* <hr /> */}

            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-green-700">Learns</p>
              <div className="flex flex-wrap gap-2">
                {u.skillsToLearn.map((s, i) => (
                <span key={i} className="bg-green-100 text-green-700 px-2 py-[3px] rounded-md text-xs">{s}</span>
                ))}
              </div>
            </div>

          </div>

        </Link>
      ))}
    </div>
  );
}
