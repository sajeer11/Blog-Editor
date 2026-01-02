"use client";

import { Video } from "@/Video";
import ImageResize from "tiptap-extension-resize-image";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

import Image from "@tiptap/extension-image";
import { FC, useEffect } from "react";
import { EditorContent, useEditor, useEditorState, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

// ✅ Import named exports for color
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

interface TiptapProps {
  value: string;
  onChange: (html: string) => void;
  className?: string;
}

// Toggle heading H1–H6
const toggleHeading = (editor: Editor, level: 1 | 2 | 3 | 4 | 5 | 6) => {
  editor.chain().focus().toggleHeading({ level }).run();
};

// Wrap selected text in quotes
const wrapInQuotes = (editor: Editor) => {
  if (!editor) return;
  const { from, to } = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(from, to, " ");
  if (selectedText) {
    editor.chain().focus().deleteRange({ from, to }).insertContent(`“${selectedText}”`).run();
  }
};

const Tiptap: FC<TiptapProps> = ({ value, onChange, className }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      ImageResize,
      Video,
      TextStyle, // ✅ Needed for color
      Color,     // ✅ Color extension
      TextAlign.configure({ types: ["heading", "paragraph", "bulletList", "orderedList"] }),
      Placeholder.configure({
        placeholder: "Start your blog.... ",
        showOnlyWhenEditable: true,
        includeChildren: true,
      }),
    ],
    content: value || " ",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: "focus:outline-none min-h-[300px]" }
    },
    immediatelyRender: false,
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return {};
      return {
        isBold: ctx.editor.isActive("bold"),
        isItalic: ctx.editor.isActive("italic"),
        isStrike: ctx.editor.isActive("strike"),
        isUnderline: ctx.editor.isActive("underline"),
        isCode: ctx.editor.isActive("code"),
        isHeading: [1, 2, 3, 4, 5, 6].map((lvl) =>
          ctx.editor?.isActive("heading", { level: lvl })
        ),
        isBulletList: ctx.editor.isActive("bulletList"),
        isOrderedList: ctx.editor.isActive("orderedList"),
        canUndo: ctx.editor.can().chain().undo().run(),
        canRedo: ctx.editor.can().chain().redo().run(),
      };
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return <p className="text-gray-400">Loading editor...</p>;

  return (
    <div className="rounded-lg bg-white w-full ml-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 border-b border-gray-200">
        {/* Bold / Italic / Strike / Code */}
        <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={editorState?.isBold ? "bg-gray-200" : ""}>B</Button>
        <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={editorState?.isItalic ? "bg-gray-200" : ""}>I</Button>
        <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleStrike().run()} className={editorState?.isStrike ? "bg-gray-200" : ""}>S</Button>
        <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleCode().run()} className={editorState?.isCode ? "bg-gray-200" : ""}>{"</>"}</Button>
        <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editorState?.isUnderline ? "bg-gray-200" : ""}>U</Button>

        {/* Headings H1–H6 */}
        {([1, 2, 3, 4, 5, 6] as const).map((lvl, idx) => (
          <Button key={lvl} variant="outline" size="sm" onClick={() => toggleHeading(editor, lvl)} className={editorState?.isHeading?.[idx] ? "bg-gray-200" : ""}>H{lvl}</Button>
        ))}

        {/* Quotes */}
        <Button variant="outline" size="sm" onClick={() => wrapInQuotes(editor)}>❝ ❞</Button>

        {/* Lists */}
        <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editorState?.isBulletList ? "bg-gray-200" : ""}>• List</Button>
        <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editorState?.isOrderedList ? "bg-gray-200" : ""}>1.</Button>

        {/* Text Alignment */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}
        >
          <AlignLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}
        >
          <AlignRight className="w-4 h-4" />
        </Button>

        {/* Undo / Redo */}
        <Button variant="outline" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editorState?.canUndo}>Undo</Button>
        <Button variant="outline" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editorState?.canRedo}>Redo</Button>

        {/* Image / Video */}
        <Button variant="outline" size="sm" onClick={() => {
          const url = prompt("Enter image URL");
          if (url && editor) editor.chain().focus().setImage({ src: url }).run();
        }}>🖼️ Image</Button>

        <Button variant="outline" size="sm" onClick={() => {
          const url = prompt("Enter video URL (YouTube/Vimeo/etc.)");
          if (url && editor) editor.chain().focus().insertContent({ type: "video", attrs: { src: url, width: "100%", height: "360px" } }).run();
        }}>🎥 Video</Button>

        {/* Text color buttons */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="w-8 h-8 p-0 border-0 cursor-pointer"
          title="Text Color"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().unsetColor().run()}
          title="Remove Color"
        >
          ✖
        </Button>
      </div>

      {/* Editor content */}
      <div className="p-3 focus:outline-none min-h-[300px] max-w-full">
        <EditorContent
          editor={editor}
          className={`
            focus:outline-none min-h-[300px] max-w-full
            [&_h1]:!text-4xl [&_h2]:!text-3xl [&_h3]:!text-2xl
            [&_h4]:!text-xl [&_h5]:!text-lg [&_h6]:!text-base
            prose prose-slate dark:prose-invert
            [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
            [&_img]:w-full [&_img]:my-4
            [&_iframe]:w-full [&_iframe]:h-100 [&_iframe]:my-4
          `}
        />
      </div>
    </div>
  );
};

export default Tiptap;
