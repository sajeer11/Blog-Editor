"use client";
import { FC } from "react";

interface BlogEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const BlogEditor: FC<BlogEditorProps> = ({ value, onChange }) => {
  return (
    <div className="border rounded-lg p-3 bg-white  ">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing your blog..."
        className="w-full min-h-[350px] p-2 outline-none text-2xl"
      />
    </div>
  );
};

export default BlogEditor;
