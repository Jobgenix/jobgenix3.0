"use client";
import React, { useState } from "react";
import Image from "next/image";


export function ImageUpload({
  handleFileChange,
}: {
  handleFileChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      handleFileChange(event);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-40 h-40 bg-white border-dashed border-gray-300 rounded-lg shadow-md">
      <div className="w-40">
        {previewUrl ? (
          <div className="relative">
            <Image
              src={previewUrl}
              alt="Preview"
              className="object-cover w-40  h-40 rounded-md shadow-md"
              width={40}
              height={40}
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 h-40"
          >
            <svg
              className="w-12 h-12 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h16M3 12a9 9 0 0118 0 9 9 0 01-18 0z"
              />
            </svg>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
