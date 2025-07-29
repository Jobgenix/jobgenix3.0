"use client";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import SubscriptExt from "@tiptap/extension-subscript";
import SuperscriptExt from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Image as ImageIcon,
  Italic,
  List,
  Paperclip,
  Settings,
  Strikethrough,
  Subscript,
  Superscript,
  Underline as UnderlineIcon,
} from "lucide-react";
import React, { useRef } from "react";

// Rich Text Editor Placeholder Component
export default function RichTextEditor({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (val: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      SuperscriptExt,
      SubscriptExt,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "flex-1 w-full h-full text-[#727272] text-base sm:text-lg md:text-2xl font-inter leading-tight focus:outline-none resize-y rounded-2xl py-4 px-4 sm:px-7 min-h-[200px]",
        placeholder,
      },
    },
  });

  // Refs for file inputs
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Handle image insert
  const handleImageInsert = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result as string }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle link attach (Paperclip)
  const handleAttachLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter the URL", previousUrl);
    if (url === null) return; // Cancelled
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-base sm:text-lg md:text-xl font-bold mb-2">
        {label} <span className="text-red-600">*</span>
      </label>
      <div className="w-full max-w-[52.9rem] min-h-[26.9rem] border border-[#0073e6a6] rounded-2xl bg-white flex flex-col">
        {editor && (
          <div className="w-full flex justify-around gap-2 border-b border-[#3b3b3b] py-4 sm:py-7 px-4 mb-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <Bold
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive("bold") ? "font-bold text-blue-900" : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <Italic
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive("italic") ? "font-bold text-blue-900" : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <UnderlineIcon
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive("underline") ? "font-bold text-blue-900" : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <Strikethrough
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive("strike") ? "font-bold text-blue-900" : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <List
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive("bulletList") ? "font-bold text-blue-900" : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <AlignLeft
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive({ textAlign: "left" })
                  ? "font-bold text-blue-900"
                  : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <AlignCenter
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive({ textAlign: "center" })
                  ? "font-bold text-blue-900"
                  : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <AlignRight
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive({ textAlign: "right" })
                  ? "font-bold text-blue-900"
                  : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("justify").run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <AlignJustify
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive({ textAlign: "justify" })
                  ? "font-bold text-blue-900"
                  : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <Superscript
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive("superscript") ? "font-bold text-blue-900" : ""
                  }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className="bg-transparent border-none p-0 m-0"
            >
              <Subscript
                size={18}
                strokeWidth={2.6}
                className={`text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto ${editor.isActive("subscript") ? "font-bold text-blue-900" : ""
                  }`}
              />
            </button>
            {/* Attach link to selected text */}
            <button
              type="button"
              className="bg-transparent border-none p-0 m-0"
              onClick={handleAttachLink}
            >
              <Paperclip
                size={18}
                strokeWidth={2.6}
                className="text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto"
              />
            </button>
            {/* Insert image */}
            <button
              type="button"
              className="bg-transparent border-none p-0 m-0"
              onClick={() => imageInputRef.current?.click()}
            >
              <ImageIcon
                size={18}
                strokeWidth={2.6}
                className="text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto"
              />
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageInsert}
              />
            </button>
            {/* Settings */}
            <button
              type="button"
              className="bg-transparent border-none p-0 m-0"
              onClick={() => {
                // Show a simple "Coming soon" toast (custom)
                const toast = document.createElement("div");
                toast.textContent = "Coming soon";
                toast.style.position = "fixed";
                toast.style.top = "50%";
                toast.style.left = "50%";
                toast.style.transform = "translate(-50%, -50%)";
                toast.style.background = "#0073E6";
                toast.style.color = "#fff";
                toast.style.padding = "0.75rem 1.5rem";
                toast.style.borderRadius = "0.75rem";
                toast.style.fontSize = "1rem";
                toast.style.zIndex = "9999";
                toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                document.body.appendChild(toast);
                setTimeout(() => {
                  toast.style.opacity = "0";
                  setTimeout(() => {
                    document.body.removeChild(toast);
                  }, 300);
                }, 1500);
              }}
            >
              <Settings
                size={18}
                strokeWidth={2.6}
                className="text-[#0073E6] cursor-pointer hover:text-blue-900 sm:h-[1.2rem] md:h-5 w-auto"
              />
            </button>
          </div>
        )}
        <EditorContent editor={editor} className="tiptap" />
      </div>
    </div>
  );
}
