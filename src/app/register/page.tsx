"use client";
/* eslint-disable @next/next/no-img-element */
import { AuthSignUp } from "../../../libs/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    setIsLoggingIn(true);
    // Call StartSession function with phone and password
    await AuthSignUp(email, password, firstName, lastName);
    setIsLoggingIn(false);
  };

  useEffect(() => {
    if (!isLoggingIn) {
      const loggedIn =
        typeof window !== "undefined" && localStorage.getItem("loggedIn");
      if (loggedIn === "true") {
        router.push("/");
        router.refresh();
      }
    }
  }, [router, isLoggingIn]);

  return (
    <section className="bg-white dark:bg-zinc-900 min-h-screen">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80")',
          }}
        ></div>
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-zinc-800 capitalize dark:text-white">
              Register
            </h1>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400">
              Register to access your account.
            </p>
            <div className="mt-6"></div>
            <form
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              onSubmit={handleSignUp}
            >
              <div>
                <label className="block mb-2 text-sm text-zinc-600 dark:text-zinc-200">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="block w-full px-5 py-3 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-lg dark:placeholder-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-zinc-600 dark:text-zinc-200">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Snow"
                  className="block w-full px-5 py-3 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-lg dark:placeholder-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-zinc-600 dark:text-zinc-200">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="johnsnow@example.com"
                  className="block w-full px-5 py-3 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-lg dark:placeholder-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-zinc-600 dark:text-zinc-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-lg dark:placeholder-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center">
                <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  <span>Register</span>
                  <MdArrowForwardIos className="w-3 h-3 rtl:-scale-x-100" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
