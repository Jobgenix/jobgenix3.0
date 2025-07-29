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
export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editorData, setEditorData] = useState<unknown>(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string>("");
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
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
  // see chatgpt
  const handleSubmit = async (publish: boolean, FeaturedImg: string) => {
    console.log("featuredImageUrl is", FeaturedImg);
    try {
      const res = await fetch("/api/blogs/write-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: editorData, // store as JSON
          // status: publish ? "published" : "draft",
          tags,
          featuredImage: FeaturedImg,
          category: category,
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
        setImagePreview("");
      } else {
        alert("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("An error occurred while creating the blog post.");
    }
  };

  const handlePreview = () => {
    alert("Preview functionality not implemented yet.");
  };

  const handlePublishClick = async (publish: boolean) => {
    if (image && !featuredImageUrl) {
      setLoading(true);
      console.log("clicked");
      console.log(image);

      setImageUploading(true);
      try {
        const res = await fetch("/api/blogs/uploadBlogImage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileType: image.type }),
        });
        const signedData = await res.json();
        if (!res.ok || !signedData.success) {
          throw new Error(
            signedData.error || "Failed to get upload credentials"
          );
        }
        const uploadFormData = new FormData();
        uploadFormData.append("file", image);
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
          throw new Error(uploadData.error?.message || "Upload failed");
        }
        setFeaturedImageUrl(uploadData.secure_url);
        toast.success("Image uploaded successfully!");
        setImageUploading(false);
        // Now call handleSubmit
        await handleSubmit(publish, uploadData.secure_url);
      } catch (error: unknown) {
        setImageUploading(false);
        if (error instanceof Error) {
          console.log(error);
          toast.error(error.message || "Failed to upload image");
        } else {
          console.log("Unexpected error:", error);
          toast.error("Failed to upload image");
        }
      } finally {
        setLoading(false);
      }
    } else {
      alert("upload image");
    }
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
                disabled={imageUploading}
              >
                <Save className="me-2" size={16} />
                Save Draft
              </button>
              <button
                onClick={() => handlePublishClick(true)}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md flex justify-center items-center"
                disabled={imageUploading}
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

          {/* Featured Image */}
          <div>
            <h3 className="text-[#111827] text-sm font-medium mb-2">
              Featured Image
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-md h-32 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition">
              <label className="w-full h-full flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(file);
                      setImagePreview(URL.createObjectURL(file)); // Set local preview
                    }
                  }}
                  disabled={imageUploading}
                />
                {imageUploading ? (
                  "Uploading..."
                ) : imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-28 object-contain"
                  />
                ) : (
                  "Drag and drop or click to upload"
                )}
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-[#111827] text-sm font-medium mb-2">
              Category
            </h3>
            <select
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="IT & Software">IT & Software</option>
              <option value="Marketing & Sales">Marketing & Sales</option>
              <option value="Design & Creatives">Design & Creatives</option>
              <option value="Business & Management">
                Business & Management
              </option>
              <option value="Data Science & AI">Data Science & AI</option>
              <option value="Internships">Internships</option>
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
