"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface RichTextareaProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const RichTextarea = ({ value, onChange, placeholder }: RichTextareaProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!value);

  // Sync editor content with value
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
      setIsEmpty(!value);
    }
  }, [value]);

  const execCommand = (command: string) => {
    if (command === "bold" || command === "italic" || command === "underline") {
      document.execCommand(command, true);
    } else if (command === "H1" || command === "H2") {
        console.log(command)
      // Use formatBlock for headings
      document.execCommand("formatBlock" , false , command);
    }

    // Update content
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      setIsEmpty(editorRef.current.innerHTML === "");
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      setIsEmpty(editorRef.current.innerHTML === "");
    }
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Toolbar */}
      <div className="flex gap-4 mb-2 ml-8">
        <Button variant="outline" size="sm" onClick={() => execCommand("bold")} className="font-bold">B</Button>
        <Button variant="outline" size="sm" onClick={() => execCommand("italic")} className="italic">I</Button>
        <Button variant="outline" size="sm" onClick={() => execCommand("underline")} className="underline">U</Button>
        <Button variant="outline" size="sm" onClick={() => execCommand("H1")}>H1</Button>
        <Button variant="outline" size="sm" onClick={() => execCommand("H2")}>H2</Button>
      </div>

      {/* Editable Div */}
      <div
        ref={editorRef}
        contentEditable
        className="ml-4 text-xl w-full h-[70vh] resize-none rounded-md bg-white px-3 py-2 placeholder:text-gray-400 focus:outline-none border-none overflow-y-auto"
        onInput={handleInput}
        suppressContentEditableWarning={true}
      ></div>

      {/* Placeholder */}
      {isEmpty && placeholder && (
        <div className="absolute top-3 left-5 text-gray-400 pointer-events-none select-none text-xl mt-10 ml-5">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default RichTextarea;
{/* <RichTextarea
  value={content}
  onChange={setContent}
  placeholder="Start writing your blog..."
/> */}
