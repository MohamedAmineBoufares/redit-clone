import Image from "next/image";
import ReditLog from "../../public/assets/reddit-logo.svg";
import ReditLogBold from "../../public/assets/reddit-logo-bold.svg";

import {
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

import { LeftSideHeaderIcons } from "../../utils/icons";

import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image fill={true} src={ReditLog} alt="Reddit logo" />
      </div>

      <div className="flex items-center mx-7 xl:min-w-[300px]:">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          type="search"
          placeholder="Search Reddit"
          className="flex-1 bg-transparent outline-none"
        />
        <button type="submit" hidden />
      </form>

      <div className="mx-5 hidden items-center  text-gray-500 space-x-2 lg:inline-flex">
        {LeftSideHeaderIcons.slice(0, 2).map(({ Icon }, index) => (
          <Icon key={index} className="icon" />
        ))}

        <hr className="h-10 border border-gray-100" />

        {LeftSideHeaderIcons.slice(2).map(({ Icon }, index) => (
          <Icon key={index} className="icon" />
        ))}
      </div>

      <div className="ml-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>

      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image fill={true} src={ReditLogBold} alt="Reddit logo" />
          </div>

          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>

          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image fill={true} src={ReditLogBold} alt="Reddit logo" />
          </div>

          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
