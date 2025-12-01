import { TUser } from "@/types/types";
import Image from "next/image";

export default function UserCard({ user }: { user: TUser }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={user.profilePicture}
          width={80}
          height={80}
          alt="profile"
          className="rounded-full border object-cover"
        />
        <h3 className="font-semibold text-lg">{user.name}</h3>
        <p className="text-gray-500 text-sm">@{user.username}</p>
        <p className="text-gray-600 text-sm text-center">{user.bio}</p>

        <div className="flex flex-wrap gap-1 text-xs mt-2">
          {user.skillsToTeach.slice(0, 3).map((s: string, i: number) => (
            <span key={i} className="bg-blue-600 text-white px-2 py-1 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
