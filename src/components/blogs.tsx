/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Blogs } from "@/components/interface/blogs";
import Link from "next/link";

export default function Blog() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    // setIsLoading(true);

    const options = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BLOGS_URL_FETCH}`,
    };

    const response = await fetch(options.url, options);
    const data = await response.json();

    const blogs = data;
    setBlogs(blogs);
    // setIsLoading(false);
  }

  return (
    <section className="bg-white dark:bg-zinc-900 min-h-screen">
      <div className="container px-6 py-10 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-800 capitalize lg:text-3xl dark:text-white">
            recent posts{" "}
          </h1>
          <button className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-zinc-600 transition-colors duration-300 transform dark:text-zinc-400 hover:text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <hr className="my-8 border-zinc-200 dark:border-zinc-700" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5">
          {blogs
            .sort((a, b) => b.id - a.id)
            .map((blog) => (
              <div key={blog.id}>
                <img
                  className="object-cover object-center w-full h-40 rounded-lg"
                  src={blog.pictureUrl}
                  alt={blog.title}
                />
                <div className="mt-8">
                  {/* <span className="text-blue-500 uppercase">category</span> */}
                  <h1 className="mt-4 text-xl font-semibold text-zinc-800 dark:text-white">
                    {blog.title}
                  </h1>
                  <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                    {blog.body.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:underline hover:text-zinc-500">
                        Posted by: {blog.user.firstName}
                      </span>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href="/"
                      className="inline-block text-blue-500 underline hover:text-blue-400"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
