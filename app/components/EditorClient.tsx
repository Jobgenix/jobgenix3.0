"use client";

import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import { useEffect, useRef } from "react";

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
          header: {
            class: Header as unknown as ToolConstructable,
            inlineToolbar: ["link", "marker", "bold", "italic"],
          },
          list: List,
          quote: Quote,
          paragraph: {
            class: Paragraph as unknown as ToolConstructable, // 👈 cast to satisfy TS
            inlineToolbar: ["bold", "italic", "link", "marker"],
          },
          marker: Marker as unknown as ToolConstructable,

          image: {
            class: ImageTool,
            config: {
              uploader: {
                /**
                 * Upload file to your backend
                 */
                async uploadByFile(file: File) {
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch("/api/blogs/uploadBlogImage", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fileType: file.type }),
                  });

                  const signedData = await res.json();
                  if (!res.ok || !signedData.success) {
                    throw new Error(
                      signedData.error || "Failed to get upload credentials"
                    );
                  }
                  const uploadFormData = new FormData();
                  uploadFormData.append("file", file);
                  uploadFormData.append("api_key", signedData.api_key);
                  uploadFormData.append("timestamp", signedData.timestamp);
                  uploadFormData.append("signature", signedData.signature);
                  uploadFormData.append("folder", signedData.folder);
                  const uploadRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${signedData.cloud_name}/upload`,
                    {
                      method: "POST",
                      body: uploadFormData,
                    }
                  );
                  const uploadData = await uploadRes.json();
                  if (!uploadRes.ok) {
                    throw new Error(
                      uploadData.error?.message || "Upload failed"
                    );
                  }
                  console.log("Upload successful:", uploadData);

                  return {
                    success: 1,
                    file: {
                      url: uploadData.secure_url, // must be the final hosted image URL
                    },
                  };
                },

                /**
                 * Upload by URL (when user pastes an image link)
                 */
                async uploadByUrl(url: string) {
                  return {
                    success: 1,
                    file: {
                      url,
                    },
                  };
                },
              },
            },
          },
        },
        inlineToolbar: true,
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
    <>
      <div
        id="editorjs"
        className="min-h-[300px] border border-gray-300 rounded-md p-4"
      ></div>
      {/* Load Color Plugin from CDN */}
    </>
  );
}
