"use client";

import Footer from "@/app/components/Footer/Footer";
import Nav from "@/app/components/LandingPage-New/nav";
import { Eye, Save, Send, Tag } from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const EditorClient = dynamic(() => import("../../components/EditorClient"), {
  ssr: false,
});

const navItemsForblog = [
  {
    id: 1,
    name: "Career Advice",
    children: [
      {
        name: "Resume and Cover Letter Tips",
      },
      {
        name: "Interview Preparation",
      },
      { name: "Job Search Strategies" },
      {
        name: "Personal Branding & Networking",
      },
      {
        name: "Career Growth & Development",
      },
    ],
  },

  {
    id: 2,

    name: "Industry Insights",
    children: [
      {
        name: "Job Market Trends",
      },
      {
        name: "Emerging Industries",
      },
      {
        name: "In-Demand Skills",
      },
      {
        name: "Technology and Automation Impact",
      },
      {
        name: "Sector-specific Insights",
      },
    ],
  },

  {
    id: 3,
    name: "Success Stories and Interviews",
    children: [
      { name: "Student Success Stories" },
      {
        name: "Industry Expert Interviews",
      },
      { name: "Job Seeker Journeys" },
      {
        name: "Startup Founders’ Stories",
      },
      {
        name: "Inspirational Career Transformations",
      },
    ],
  },
];
export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<number | "">("");
  const [subcategory, setsubcategory] = useState<string | "">("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editorData, setEditorData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const { status, data: session } = useSession();

  const router = useRouter();

  // Only show page if user has role "4"
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || session.user.role !== "4") {
      toast.error("You don't have right to access the page.");
      router.replace("/"); // or redirect to login or another page
    }
  }, [session, status, router]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs/write-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: editorData, // store as JSON
          // status: publish ? "published" : "draft",
          tags,
          category:
            typeof category === "number"
              ? navItemsForblog[category - 1].name
              : "",
          subcategory: subcategory,
        }),
      });

      if (res.ok) {
        console.log(res);
        toast.success("Blog uploaded successfully!");
        setTitle("");
        setImage(null);
        setCategory("");
        setTags([]);
        setTagInput("");
        setEditorData("");
      } else {
        alert("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("An error occurred while creating the blog post.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    alert("Preview functionality not implemented yet.");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5]">
      <Nav
        onLoginClick={() => {
          /* handle login click or leave empty */
        }}
      />

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
          <EditorClient onChange={setEditorData} />
        </div>

        {/* Side Panel */}
        <div className="bg-white rounded-lg p-4 shadow-md space-y-5 border border-gray-200">
          {/* Publish Section */}
          <div>
            <h3 className="text-[#111827] text-sm font-medium mb-3">Publish</h3>
            <div className="flex gap-2">
              <button
                onClick={() => alert("we are cooking this feature")}
                className="w-1/2 bg-gray-100 text-[#1F2937] text-sm font-medium py-2 rounded-md border border-gray-300 hover:bg-gray-200 transition flex justify-center items-center"
              >
                <Save className="me-2" size={16} />
                Save Draft
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md flex justify-center items-center"
              >
                <Send className="me-2" size={16} />
                Publish
              </button>
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          {/* Preview Section */}
          <div>
            <h3 className="text-[#111827] text-sm font-medium mb-3">Preview</h3>
            <button
              onClick={() => handlePreview()}
              className="w-full text-sm font-medium py-2 rounded-md flex justify-center items-center border border-gray-300 text-[#374151] hover:bg-gray-50 transition"
            >
              <Eye className="me-2" size={16} color="#374151" />
              Preview Post
            </button>
          </div>

          <hr className="border-t border-gray-200" />

          {/* Category */}
          <div>
            <h3 className="text-[#111827] text-sm font-medium mb-2">
              Category
            </h3>
            <select
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
              value={category ?? ""}
              onChange={(e) => setCategory(Number(e.target.value))}
            >
              <option value="">Select category</option>
              {navItemsForblog?.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={`${category > "0" ? "block" : "hidden"}`}>
            <h3 className="text-[#111827] text-sm font-medium mb-2">
              Sub-category
            </h3>
            <select
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
              value={subcategory}
              onChange={(e) => setsubcategory(e.target.value)}
            >
              <option value="">Select sub-category</option>
              {typeof category === "number" &&
                navItemsForblog[category - 1]?.children?.map((cat, index) => (
                  <option key={index} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Tag />
              <h3 className="text-[#111827] text-sm font-medium">Tags</h3>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag"
                className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md px-3 hover:bg-blue-600 text-sm"
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

      <Footer />
    </div>
  );
}
