"use client";

/* eslint-disable @next/next/no-img-element */
import { PostBlog } from "../../../libs/blog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { GrCloudUpload } from "react-icons/gr";
import { MdArrowForwardIos } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

interface UploadedAssetData {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  id: string;
}

export default function Post() {
  const [result, setResult] = useState<UploadedAssetData | null>(null);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handlePost = async (event: any) => {
    event.preventDefault();
    try {
      await PostBlog(title, body, pictureUrl);
      // Blog posted successfully
      toast.success("Blog posted successfully");
      // Optionally redirect after successful post
      router.push("/"); // Redirect to home page or wherever you want
    } catch (error) {
      // Error posting blog
      console.error("Error posting blog:", error);
      toast.error("Error posting blog. Please try again later.");
      // Optionally handle specific error cases
      if (typeof error === "string" && error.startsWith("4")) {
        // Client error (e.g., 404)
        toast.error("Client error. Please check your input.");
      } else if (typeof error === "string" && error.startsWith("5")) {
        // Server error (e.g., 500)
        toast.error("Server error. Please try again later.");
      } else {
        // Generic error handling
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    if (!isLoggingIn) {
      const loggedIn =
        typeof window !== "undefined" && localStorage.getItem("loggedIn");
      if (loggedIn === "true") {
        router.push("/post");
      } else {
        toast("Login To Post!", {
          icon: "⚠️",
        });
        router.push("/");
      }
    }
  }, [router, isLoggingIn]);

  return (
    <>
      <section className="bg-white dark:bg-zinc-900 min-h-screen">
        <div className="flex justify-center">
          <div className="flex items-start w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-zinc-800 capitalize dark:text-white">
                Post Blog
              </h1>
              <form
                className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1"
                onSubmit={handlePost}
              >
                {/* title  */}
                <div>
                  <label className="block mb-2 text-sm text-zinc-600 dark:text-zinc-200">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title Here..."
                    className="block w-full px-5 py-3 mt-2 text-zinc-700 placeholder-zinc-400 bg-white border border-zinc-200 rounded-lg dark:placeholder-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* upload  */}

                <div>
                  <label
                    htmlFor="file"
                    className="block text-sm text-zinc-500 dark:text-zinc-300"
                  >
                    Image
                  </label>
                  <CldUploadWidget
                    signatureEndpoint="/api/sign-image"
                    onSuccess={(result) => {
                      setResult(result?.info as UploadedAssetData);
                    }}
                  >
                    {({ open }) => (
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-zinc-300 border-dashed cursor-pointer dark:bg-zinc-900 dark:border-zinc-700 rounded-xl"
                      >
                        <GrCloudUpload className="w-8 h-8 text-zinc-500 dark:text-zinc-400" />
                        <h2 className="mt-1 font-medium tracking-wide text-zinc-700 dark:text-zinc-200">
                          Image Upload
                        </h2>
                        <input
                          id="dropzone-file"
                          type="button"
                          className="hidden"
                          onClick={() => open()}
                        />
                      </label>
                    )}
                  </CldUploadWidget>

                  {/* <div> */}
                  {!result ? (
                    <input
                      className="hidden"
                      type="text"
                      value={pictureUrl}
                      onChange={(e) => setPictureUrl(e.target.value)}
                    />
                  ) : null}

                  {result ? (
                    <div className="flex flex-col items-center">
                      <CldImage
                        className="rounded-2xl m-3 w-3/4"
                        src={result.public_id}
                        width={result.width}
                        height={result.height}
                        alt="Uploaded Image"
                        onLoad={() => setPictureUrl(result.secure_url)}
                      />
                    </div>
                  ) : null}
                </div>
                {/* content  */}
                <div>
                  <label
                    htmlFor="Description"
                    className="block text-sm text-zinc-500 dark:text-zinc-300"
                  >
                    Content
                  </label>
                  <textarea
                    placeholder="Content here..."
                    className="block mt-2 w-full placeholder-zinc-400/70 dark:placeholder-zinc-500 rounded-lg border border-zinc-200 bg-white px-4 h-48 py-2.5 text-zinc-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-blue-300"
                    defaultValue={""}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>
                {/* post  */}
                <div className="flex flex-col items-center">
                  <button className="flex items-center justify-center w-1/6 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    <span>Post </span>
                    <MdArrowForwardIos className="w-3 h-3 rtl:-scale-x-100" />
                  </button>
                </div>
              </form>
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
