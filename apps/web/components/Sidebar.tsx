"use client";
import { FC, useRef } from "react";
import { Separator } from "@repo/ui/components/ui/separator";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  UserCog,
  BookCopy,
  Bot,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Image from "next/Image";

interface SidebarProps {}
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Sidebar: FC<SidebarProps> = ({}) => {
  const { openUserProfile } = useClerk();
  return (
    <aside
      id="cta-button-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <a href="/" className="flex items-center gap-2 ps-2 pb-5 border-b">
          <Image src="/logo.svg" width="36" height="36" alt={""} />
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap dark:text-white ${poppins.className}`}
          >
            Librarify.
          </span>
        </a>
        <div className="flex flex-col h-full justify-between">
          <ul className="space-y-2 pt-5 font-medium h-auto">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <LayoutDashboard />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/manage-users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <UserCog />
                <span className="ms-3">Manage users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/add-books"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BookCopy />
                <span className="flex-1 ms-3 whitespace-nowrap">Add Books</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/chat"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Bot />
                <span className="flex-1 ms-3 whitespace-nowrap">Diet Ai</span>
              </Link>
            </li>
            <li className="border-t my-2">
              <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LogOutIcon className="text-red-500" />
                <span className="flex-1 ms-3 whitespace-nowrap text-red-500">
                  <SignOutButton redirectUrl="/" />
                </span>
              </button>
            </li>
          </ul>
          <button
            id="dropdown-cta"
            className="p-4 flex items-center gap-x-4 rounded-lg bg-blue-50 dark:bg-blue-900 cursor-pointer"
            role="alert"
            onClick={() => {
              openUserProfile();
            }}
          >
            <UserButton />
            Profile
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
