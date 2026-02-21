import { Avatar, AvatarBadge, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/auth/session";
import { logoutAction } from "@/app/actions/auth/login";
import { CircleUser, LogOut, Mail, Settings } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <div className="p-6 flex flex-col space-y-8 items-center w-full h-screen">
      <Avatar className="mt-8 w-36 h-36">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarBadge className="p-4 bg-green-600 dark:bg-green-800" />
      </Avatar>
      {/* <div className="text-center">
        <h1 className="font-bold text-3xl">{user?.name}</h1>
        <h2 className="font-semibold text-xl text-foreground/50">
          {user?.email}
        </h2>
      </div> */}

      {/* User Informations */}
      <div className="flex flex-col gap-5 w-full overflow-y-auto bg-foreground/5 p-4 rounded-xl">
        {/* Email */}
        <div className="flex items-center gap-6">
          <span className="bg-slate-400/5 p-2 rounded-md">
            <CircleUser />
          </span>
          <div>
            <p className="text-foreground/50 font-semibold">Username</p>
            <p className="font-bold text-xl">{user?.name}</p>
          </div>
        </div>
        {/*  */}
        <div className="flex items-center gap-6">
          <div className="bg-slate-400/5 p-2 rounded-md">
            <Mail />
          </div>
          <div>
            <p className="text-foreground/50 font-semibold">Email</p>
            <p className="font-bold text-xl">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="w-full space-y-2">
        <p>Settings</p>
        <Link
          href={"/edit-profile"}
          className="inline-flex gap-4 items-center w-full bg-foreground/5 p-4 rounded-xl"
        >
          <Settings />
          Edit Profile
        </Link>
        <button
          onClick={logoutAction}
          className="inline-flex gap-4 items-center w-full bg-foreground/5 p-4 rounded-xl"
        >
          <LogOut />
          Log Out
        </button>
      </div>
    </div>
  );
}
