"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input1";
import SeoSidebar from "@/components/seosidebar";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues
const Tiptap = dynamic(() => import("@/components/Tiptap"), { ssr: false });

export default function AddBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [seoData, setSeoData] = useState({ title: "", description: "", slug: "" });

  useEffect(() => {
    setSeoData((prev) => ({ ...prev, slug: title.toLowerCase().replace(/\s+/g, "-") }));
  }, [title]);

  const handleSeoChange = (field: string, value: string) => {
    setSeoData((prev) => ({ ...prev, [field]: value }));
  };

  const saveBlog = (status: "published" | "draft") => {
    const blogData = {
      id: Date.now(),
      title,
      content,
      seo: seoData,
      status,
      createdAt: new Date().toISOString(),
    };
    const existingBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    existingBlogs.push(blogData);
    localStorage.setItem("blogs", JSON.stringify(existingBlogs));
    alert(`${status === "published" ? "Published" : "Draft saved"} ✅`);
    console.log(blogData);
  };

  return (
    <div className="w-full min-h-screen flex flex-col border">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center border-b border-gray-300 bg-white shadow-sm p-3">
        <Button variant="outline" onClick={() => router.back()}>
          ← Back
        </Button>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => saveBlog("draft")}>
            Save Draft
          </Button>
          <Button variant="default" onClick={() => saveBlog("published")}>
            Publish
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 mt-17 w-full">
        <div className="flex-1 flex flex-col gap-4 p-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Blog Title"
            className="w-full text-2xl font-semibold"
          />

          <Tiptap
            value={content}
            onChange={setContent}
            className="focus:outline-none min-h-[300px] prose prose-slate max-w-none dark:prose-invert"
          />
        </div>

        <div className="lg:w-80 w-full p-4 ">
          <SeoSidebar
            title={seoData.title}
            description={seoData.description}
            slug={seoData.slug}
            onFieldChange={handleSeoChange}
          />
        </div>
      </div>
    </div>
  );
}
