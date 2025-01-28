"use client";
//@ts-nocheck
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ImageIcon,
  Copy,
  Scissors,
  Superscript,
  Subscript,
} from "lucide-react"
import { Separator } from "@/app/components/ui/separator"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import UnderlineExtension from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import SuperscriptExtension from "@tiptap/extension-superscript"
import SubscriptExtension from "@tiptap/extension-subscript"
import Image from "@tiptap/extension-image"
import { useState } from "react"
import { Input } from "@/app/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import type { formSectionProps } from "@/types/formSectionProps"

export default function InternshipDescription({ setFormData }: formSectionProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [charCount, setCharCount] = useState(0)

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      SuperscriptExtension,
      SubscriptExtension,
      Image,
    ],
    content: `<p>Start typing the Description...</p>`,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none min-h-[390px] text-gray-600 [&>ul]:list-disc [&>ol]:list-decimal pl-[40px]",
      },
    },
    onCreate: ({ editor }) => {
      // Listen for the first user input and remove the placeholder
      editor.on("transaction", () => {
        if (editor.getHTML().includes("Start typing the Description...")) {
          editor.commands.clearContent() // Clears the placeholder content
        }
      })
    },
    onUpdate: ({ editor }) => {
      const text = editor.state.doc.textContent
      setFormData("description", editor.getHTML())
      setCharCount(text.length)
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl("")
    }
  }

  return (
    <div className="w-full  mx-auto ">
      <div className="flex items-baseline gap-2 mb-2">
        <h2 className="text-xl font-medium text-[#27724A]">Description</h2>
        <span className="text-gray-500 text-sm">({charCount}/3000)</span>
      </div>
      <Card className="border border-gray-200 rounded-lg overflow-hidden shadow-black/40 shadow-md">
        <CardContent className="p-0">
          {/* Editor Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-white">
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive("bold") ? "text-[#0095FF]" : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive("italic")
                  ? "text-[#0095FF] bg-gray-100"
                  : "text-[#0095FF] hover:text-[#0095FF]/90 bg-transparent"
              }`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive("underline") ? "text-[#0095FF] bg-gray-100" : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <Underline className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive("strike") ? "text-[#0095FF] bg-gray-100" : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="mx-1 h-6 bg-gray-200" />

            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive({ textAlign: "left" })
                  ? "text-[#0095FF] bg-gray-100"
                  : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive({ textAlign: "center" })
                  ? "text-[#0095FF] bg-gray-100"
                  : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive({ textAlign: "right" })
                  ? "text-[#0095FF] bg-gray-100"
                  : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive({ textAlign: "justify" })
                  ? "text-[#0095FF] bg-gray-100"
                  : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            >
              <AlignJustify className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="mx-1 h-6 bg-gray-200" />

            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive("bulletList") ? "text-[#0095FF] bg-gray-100" : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().toggleList("bulletList", {}).run()}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive("orderedList") ? "text-[#0095FF] bg-gray-100" : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().toggleList("orderedList", {}).run()}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="mx-1 h-6 bg-gray-200" />

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-[#0095FF] hover:text-[#0095FF]/90">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Insert Image</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2 mt-4">
                  <Input
                    type="url"
                    placeholder="Enter image URL..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Button onClick={addImage}>Insert</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[#0095FF] hover:text-[#0095FF]/90"
              onClick={() => {
                const content = editor.getHTML()
                navigator.clipboard.writeText(content)
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[#0095FF] hover:text-[#0095FF]/90"
              onClick={() => {
                const selection = editor.state.selection
                const content = editor.state.doc.textBetween(selection.from, selection.to)
                navigator.clipboard.writeText(content)
                editor.commands.deleteSelection()
              }}
            >
              <Scissors className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive("superscript") ? "text-[#0095FF]" : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
            >
              <Superscript className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${
                editor.isActive("subscript") ? "text-[#0095FF]" : "text-[#0095FF] hover:text-[#0095FF]/90"
              }`}
              onClick={() => editor.chain().focus().toggleSubscript().run()}
            >
              <Subscript className="h-4 w-4" />
            </Button>
          </div>

          {/* Content Area */}
          <div className="p-4 bg-white">
            <EditorContent editor={editor} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

