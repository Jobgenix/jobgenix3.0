"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Nav from "@/app/components/LandingPage-New/nav";

interface EditorBlock {
  id: string;
  type: string;
  data: {
    text?: string;
  };
}

interface EditorContent {
  time: number;
  blocks: EditorBlock[];
  version: string;
}

interface Blog {
  id: string;
  title: string;
  content: EditorContent;
  tags?: string[];
  authorId: string;
  createdAt?: string;
  featuredImage?: string;
  authorName?: string;
  authorImage?: string;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { category, subcategory } = useParams();
  const decodedcategory = decodeURIComponent(category as string);
  const decodedsubcategory = decodeURIComponent(subcategory as string);
  console.log(decodedcategory, decodedsubcategory);

  useEffect(() => {
    fetchBlogs(1, true);
    // eslint-disable-next-line
  }, []);

  const fetchBlogs = async (pageToFetch = 1, replace = false) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/blogs/getCategoryblogs?category=${decodedcategory}&subcategory=${decodedsubcategory}&page=${pageToFetch}&limit=9`
      );
      const data = await res.json();
      console.log(data);

      if (data.success) {
        setBlogs((prev) => (replace ? data.data : [...prev, ...data.data]));
        setHasMore(data.data.length === 9);
        setPage(pageToFetch);
        console.log(data);
      }
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchBlogs(page + 1);
    }
  };
  const router = useRouter();

  return (
    <>
      <Nav onLoginClick={() => {}} />
      <section className="py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-blue-600 font-medium">Our blog</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Your Career’s Not Waiting. Why Are You?
          </h2>
          <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto">
            Small steps. Big impact. Learn from mistakes, follow insider tips,
            get job ready – fast, simple, and straight to the point.
          </p>
          {/* Search Bar */}
          <div className="flex justify-center mt-6">
            <input
              type="text"
              placeholder="Search"
              className="w-64 md:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        {/* Blog Cards */}
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={blog.id || index}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col"
            >
              <div className="relative w-full h-48 rounded-md overflow-hidden">
                {blog.featuredImage && (
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                )}
              </div>
              <p className="text-blue-600 text-sm font-medium mt-4">
                {blog.tags && blog.tags[0]}
              </p>
              <h3
                className="text-lg font-semibold text-gray-900 mt-1 hover:underline cursor-pointer"
                onClick={() => router.push(`/blogs/${blog.id}`)}
              >
                {blog.title} ↗
              </h3>
              <p className="text-gray-600 text-sm mt-2 flex-1">
                {blog.content.blocks?.length > 0 &&
                blog.content.blocks[0]?.data?.text
                  ? blog.content.blocks[0].data.text.slice(0, 100) + "..."
                  : "No preview available"}
              </p>

              {/* Author */}
              <div className="flex items-center mt-4">
                <Image
                  src={"/brand/jobGenix-black-blue.svg"}
                  alt="author"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />

                <div className="ml-2">
                  <p className="text-gray-900 text-sm font-medium">
                    {/* {blog.authorName} */}
                    Team Jobgenix
                  </p>
                  <p className="text-gray-500 text-xs">
                    {blog.createdAt &&
                      new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Load More */}
        <div className="flex justify-center mt-10">
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-blue-600 font-medium shadow-sm hover:bg-gray-50"
            onClick={handleLoadMore}
            disabled={loading || !hasMore}
          >
            {loading ? "Loading..." : hasMore ? "Load more" : "No more blogs"}
          </button>
        </div>
      </section>
    </>
  );
}
