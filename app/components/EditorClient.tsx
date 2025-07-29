"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";

interface EditorClientProps {
  onChange: (data: unknown) => void;
}

export default function EditorClient({ onChange }: EditorClientProps) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        placeholder: "Start writing your blog post...",
        tools: {
          header: Header,
          list: List,
          quote: Quote,
        },
        onChange: async () => {
          const savedData = await editor.save();
          onChange(savedData);
        },
      });
      editorRef.current = editor;
    }

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [onChange]);

  return (
    <div
      id="editorjs"
      className="min-h-[300px] border border-gray-300 rounded-md p-4"
    ></div>
  );
}
