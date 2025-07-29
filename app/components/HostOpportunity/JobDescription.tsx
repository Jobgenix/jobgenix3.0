// "use client";

import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";

export default function JobInternshipDescription({ onChange }: { onChange?: (desc: string) => void }) {
  const [desc, setDesc] = useState("");
  return (
    <div className="mb-8">
      <RichTextEditor
        label="Job/Internship Description"
        placeholder="Start typing the Internship Description"
        value={desc}
        onChange={val => {
          setDesc(val);
          onChange?.(val);
        }}
      />
      <div className="flex justify-end space-x-4 mt-6 font-montserrat font-semibold text-base sm:text-lg max-w-[52.9rem]">
        <button
          className={`border border-[#0073E6] py-2 px-4 sm:py-[0.6rem] sm:px-5 rounded-[1.9rem]
              focus:bg-transparent focus:text-[#0073E6]
              bg-blue-700 text-white
          `}
        >
          Save as Draft
        </button>
        <button
          className={`border border-[#0073E6] py-2 px-4 sm:py-[0.6rem] sm:px-5 rounded-[1.9rem] md:min-w-28
        focus:bg-transparent focus:text-[#0073E6]
        bg-blue-700 text-white
    `}
        >
          Next
        </button>
      </div>
    </div>
  );
}
