"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import Underline from '@tiptap/extension-underline'
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import BulletList from "@tiptap/extension-bullet-list";

import MenuBar from "./menuBar";

export default function hostCard3({heading}: {heading: string}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Superscript,
      Subscript,
      BulletList,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Start typing the Internship Description</p>",
    editorProps: {
      attributes: {
        class:
          "rte prose prose-stone outline-none w-full min-h-60 rounded-lg p-4",
      },
    },
    immediatelyRender: false,
  });
  return (
    <>
      <div className="relative w-[700px] border border-blue-400 rounded-2xl">
        <h2 className="absolute -top-7 left-2">{heading}<span className="text-red-500">*</span> </h2>
        <MenuBar editor={editor} />
        
        <EditorContent  editor={editor} />
        
        
      </div>
    </>
  );
}
