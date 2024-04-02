"use client";

import { CiLogin } from "react-icons/ci";
import LogOut from "@/components/LogOut";

import Link from "next/link";

export default function Nav() {
  return (
    <header className="text-zinc-600 body-font bg-zinc-300 dark:bg-zinc-800">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto space-x-2">
          <Link
            href="/"
            className="inline-flex items-center bg-blue-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-400 rounded text-base mt-4 md:mt-0"
          >
            Home
          </Link>
          <Link
            href="/post"
            className="inline-flex items-center bg-blue-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-400 rounded text-base mt-4 md:mt-0"
          >
            Post
          </Link>
        </nav>
        <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-zinc-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <span className="ml-3 text-xl dark:text-white">Blog Post</span>
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0 space-x-2">
          <Link
            href="/login"
            className="inline-flex items-center bg-blue-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-400 rounded text-base mt-4 md:mt-0"
          >
            Login
            <CiLogin className="w-4 h-4 ml-1" />
          </Link>
          <LogOut />
        </div>
      </div>
    </header>
  );
}
