"use client";
/* eslint-disable @next/next/no-img-element */
import { AuthSignIn } from "../../../libs/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    try {
      setIsLoggingIn(true);
      // Call StartSession function with phone and password
      await AuthSignIn(email, password);
      setIsLoggingIn(false);

      toast.success("Logged in successfully");
    } catch (error) {
      // Error posting blog
      console.error("Error posting blog:", error);
      toast.error("Credentials Is Incorrect, Please Try Again");
    }
  };

  useEffect(() => {
    if (!isLoggingIn) {
      const loggedIn =
        typeof window !== "undefined" && localStorage.getItem("loggedIn");
      if (loggedIn === "true") {
        toast.success("You're Already Logged in!");
        router.push("/");
        router.refresh();
      }
    }
  }, [router, isLoggingIn]);
  return (
    <section className="bg-white dark:bg-zinc-900 min-h-screen">
      <div className="container px-6 py-24 mx-auto lg:py-32">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <h1 className="mt-4 text-zinc-600 dark:text-zinc-300 md:text-lg">
              Welcome back
            </h1>
            <h1 className="mt-4 text-2xl font-medium text-zinc-800 capitalize lg:text-3xl dark:text-white">
              login to your account
            </h1>
          </div>
          <div className="mt-8 lg:w-1/2 lg:mt-0">
            <form className="w-full lg:max-w-xl" onSubmit={handleSignIn}>
              <div className="relative flex items-center">
                <span className="absolute">
                  <MdAlternateEmail className="w-6 h-6 mx-3 text-zinc-300 dark:text-zinc-500" />
                </span>
                <input
                  type="email"
                  className="block w-full py-3 text-zinc-700 bg-white border rounded-lg px-11 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <MdOutlinePassword className="w-6 h-6 mx-3 text-zinc-300 dark:text-zinc-500" />
                </span>
                <input
                  type="password"
                  className="block w-full px-10 py-3 text-zinc-700 bg-white border rounded-lg dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-8 md:flex md:items-center">
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Sign in
                </button>
                <Link
                  href="/register"
                  className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline dark:text-blue-400"
                >
                  Register instead
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
