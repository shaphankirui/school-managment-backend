"use client";

import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { AuthSignOut } from "../../libs/auth";
import toast from "react-hot-toast";

export default function LogOut() {
  const router = useRouter();
  const handleSignOut = (event: any) => {
    event.preventDefault();
    AuthSignOut();
    toast.success("Logged Out successfully");
    router.push("/login");
    router.refresh();
  };

  // Conditionally render the button only if the user is logged in
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("loggedIn");
  if (!accessToken) {
    return null; // If not logged in, return null to not render the button
  }
  return (
    <>
      <button
        onClick={handleSignOut}
        className="inline-flex items-center bg-blue-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-400 rounded text-base mt-4 md:mt-0"
      >
        Log Out
        <CiLogout className="w-4 h-4 ml-1" />
      </button>
    </>
  );
}
