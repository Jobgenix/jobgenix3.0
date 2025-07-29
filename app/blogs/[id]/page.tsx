"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import EditorJsHTML from "editorjs-html";
import Nav from "@/app/components/LandingPage-New/nav";

const edjsParser = EditorJsHTML({
  header: (block) => {
    const level = block.data.level || 2;
    return `<h${level} class="text-2xl font-bold mt-4 mb-2">${block.data.text}</h${level}>`;
  },
  paragraph: (block) => {
    return `<p class="text-lg leading-relaxed mb-4">${block.data.text}</p>`;
  },
  list: (block: { data: { items: { content: string }[] } }) => {
    const items = block.data.items
      .map((item) => `<li class="mb-1">${item.content}</li>`)
      .join("");
    return `<ul class="list-disc list-inside text-lg mb-4">${items}</ul>`;
  },
  quote: (block) => {
    return `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4">"${block.data.text}"</blockquote>`;
  },
});

interface Blog {
  id: string;
  title: string;
  content: unknown;
  featuredImage?: string;
  createdAt: string;
}

export default function BlogDetails() {
  // new page design, before that i have to protect these blog routes
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/getBlogsDetails/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();

        setBlog(data);
        console.log(data);

        // Parse content into HTML array
        const parsedHtml = edjsParser.parse(data.content) as string;
        const lines = parsedHtml.split(/(?=<h[1-6]|<p|<ul|<blockquote)/);
        if (lines.length > 0) {
          const splitIndex = 2; // Show first 2 blocks before image
          setFirstPart(lines.slice(0, splitIndex).join(""));
          setSecondPart(lines.slice(splitIndex).join(""));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <>
      <Nav />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>

        {/* First part of the blog */}
        <div
          className="prose max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: firstPart }}
        />

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="my-6">
            <Image
              src={blog.featuredImage}
              alt="Blog Featured"
              width={1000}
              height={600}
              className="rounded-lg w-full object-cover"
            />
          </div>
        )}

        {/* Rest of the Blog */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: secondPart }}
        />
      </div>
    </>
  );
}
