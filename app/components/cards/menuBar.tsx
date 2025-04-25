"use client";
import React from "react";
import { Editor } from "@tiptap/react";
import { HiMiniBold, HiMiniItalic, HiMiniStrikethrough } from "react-icons/hi2";
import {
  RiAlignLeft,
  RiAlignRight,
  RiAlignCenter,
  RiAlignJustify,
} from "react-icons/ri";
import {
  MdFormatListBulleted,
  MdOutlineSuperscript,
  MdSubscript,
} from "react-icons/md";
import { ImUnderline } from "react-icons/im";

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }
  return (
    <div className="control-group w-full border-b border-slate-200  p-2 flex justify-between items-center">
      <div className="button-group flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "p-2 bg-slate-200 rounded-md text-[#0073E6]"
              : "p-2 text-[#0073E6]"
          }
        >
          <HiMiniBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "p-2 bg-slate-200 rounded-md text-[#0073E6]"
              : "p-2 text-[#0073E6]"
          }
        >
          <HiMiniItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "p-2 bg-slate-200 rounded-md text-[#0073E6]"
              : "p-2 text-[#0073E6]"
          }
        >
          <ImUnderline />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "p-2 bg-slate-200 rounded-md text-[#0073E6]"
              : "p-2 text-[#0073E6]"
          }
        >
          <HiMiniStrikethrough />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "p-2 bg-slate-200 rounded-md text-[#0073E6]"
              : "p-2 text-[#0073E6]"
          }
        >
          <RiAlignLeft />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "p-2 bg-slate-200 rounded-md text-[#0073E6]"
              : "p-2 text-[#0073E6]"
          }
        >
          <RiAlignCenter />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "p-2 bg-slate-200 rounded-md text-[#0073E6]"
              : "p-2 text-[#0073E6]"
          }
        >
          <RiAlignRight />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "p-2 bg-slate-200 rounded-md text-[#0073E6]"
              : "p-2 text-[#0073E6]"
          }
        >
          <RiAlignJustify />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("bulletList")
              ? "p-2 bg-slate-200 rounded-md "
              : "p-2 "
          }text-[#0073E6]`}
        >
          <MdFormatListBulleted />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`${
            editor.isActive("superscript")
              ? "p-2 bg-slate-200 rounded-md "
              : "p-2 "
          }text-[#0073E6]`}
        >
          <MdOutlineSuperscript />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`${
            editor.isActive("subscript")
              ? "p-2 bg-slate-200 rounded-md "
              : "p-2 "
          }text-[#0073E6]`}
        >
          <MdSubscript />
        </button>
      </div>
    </div>
  );
}
