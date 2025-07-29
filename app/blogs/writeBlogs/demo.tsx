"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/app/components/LandingPage-New/nav";

export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [quote, setQuote] = useState("");
  const [points, setPoints] = useState<string[]>([]);
  const [pointInput, setPointInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const router = useRouter();

  const handleAddPoint = () => {
    if (pointInput.trim()) {
      setPoints([...points, pointInput]);
      setPointInput("");
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleSubmit = async (publish: boolean) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("quote", quote);
    formData.append("points", JSON.stringify(points));
    formData.append("tags", JSON.stringify(tags));
    formData.append("category", category);
    formData.append("status", publish ? "published" : "draft");
    if (image) formData.append("image", image);

    const res = await fetch("/api/admin/blog/create", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/admin/blog");
    } else {
      alert("Failed to create blog post");
    }
  };

  return (
    <>
      <Nav />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Blog Editor */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
          <input
            type="text"
            placeholder="Title"
            className="w-full text-3xl font-bold border-none focus:ring-0 outline-none mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Start writing your blog post..."
            className="w-full min-h-[250px] border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Side Panel */}
        <div className="bg-white rounded-lg p-6 shadow-md space-y-6">
          {/* Save / Publish */}
          <div className="flex justify-between gap-2">
            <button
              onClick={() => handleSubmit(false)}
              className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-md"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit(true)}
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            >
              Publish
            </button>
          </div>

          {/* Quote */}
          <div>
            <label className="block text-sm font-medium mb-1">Quote</label>
            <input
              type="text"
              placeholder="Add a quote..."
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-medium mb-1">Points</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add point"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                value={pointInput}
                onChange={(e) => setPointInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md px-3 hover:bg-blue-600"
                onClick={handleAddPoint}
              >
                +
              </button>
            </div>
            <ul className="list-disc ml-5 mt-2 text-sm text-gray-600 space-y-1">
              {points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Featured Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm"
              onChange={(e) => {
                if (e.target.files?.[0]) setImage(e.target.files[0]);
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="webdev">Web Dev</option>
              <option value="tutorial">Tutorial</option>
              <option value="career">Career</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md px-3 hover:bg-blue-600"
                onClick={handleAddTag}
              >
                +
              </button>
            </div>
            <div className="flex gap-2 flex-wrap mt-2 text-sm">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
