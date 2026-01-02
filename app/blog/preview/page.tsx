"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogPreviewPage() {
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("blogPreview");
    if (data) {
      setBlog(JSON.parse(data));
    } else {
      router.push("admin/add-blog");
    }
  }, [router]);

  if (!blog) return <p className="text-center mt-10">Loading preview...</p>;

  // Generate dummy snippet: 70% content + 30% SEO/dummy
  const generateSnippet = () => {
    const contentText = blog.content
      ? blog.content.replace(/<\/?[^>]+(>|$)/g, "")
      : "";
    const contentSnippetLength = Math.floor(contentText.length * 0.7);
    const dummySnippetLength = Math.floor(contentText.length * 0.3);

    const contentSnippet = contentText.slice(0, contentSnippetLength);
    const dummySnippet = blog.seo?.description
      ? blog.seo.description.slice(0, dummySnippetLength)
      : "Written by Admin".slice(0, dummySnippetLength);

    return contentSnippet + " " + dummySnippet;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Preview</h1>
        <button
          onClick={() => router.push("/admin/add-blog")}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Back to Edit
        </button>
      </div>

      {/* 🔹 Main Layout: 20% left div + 80% content */}
     <div className="space-y-6">
  {/* Blog Title */}
  <h1 className="text-4xl font-bold mb-4 text-center">{blog.title}</h1>

  {/* Featured Image */}
  {blog.seo?.featuredImage && (
    <div className="w-320 overflow-hidden rounded-2xl shadow-md">
      <img
        src={blog.seo.featuredImage}
        alt="Feature"
        className="w-full h-[400px] object-cover"
      />
    </div>
  )}

{/* Flex row below featured image */}
<div className="flex gap-4 mt-4">
  {/* Left 20% - Admin Card */}
 <div className="w-1/5 flex flex-col">
  {/* Label above admin card */}
  <p className="font-semibold text-sm mb-2 text-[#7A7A7A] dark:text-gray-400">
    Written by Admin
  </p>

  {/* Admin card */}
  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
    {/* Profile icon */}
    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-[#0060AF] font-bold">
      A
    </div>

    {/* Admin name + date */}
    <div className="flex flex-col">
      {/* Admin name */}
      <p className="font-semibold text-sm text-[#0060AF] dark:text-gray-200 mb-1">
        {blog.adminName || "Admin"}
      </p>

      {/* Date */}
      <p className="text-xs text-gray-500 dark:text-[#7A7A7A] mb-2">
        {blog.date
          ? new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
      </p>
    </div>
  </div>
</div>


  {/* Right 80% - Content / Snippet */}
 
 <div className="w-4/5">
  <div
    className="
      prose prose-slate dark:prose-invert
      [&_h1]:!text-4xl [&_h2]:!text-3xl [&_h3]:!text-2xl
      [&_h4]:!text-xl [&_h5]:!text-lg [&_h6]:!text-base
      [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
      [&_img]:my-4
      [&_iframe]:w-full [&_iframe]:h-100 [&_iframe]:my-4
    "
    dangerouslySetInnerHTML={{ __html: blog.content }}
  />
</div>
</div>


</div>

    </div>
  );
}
