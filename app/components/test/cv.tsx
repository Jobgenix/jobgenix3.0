"use client";

import { useState } from "react";

export default function UploadCV({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      // Validate file type
      if (!["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(selectedFile.type)) {
        setError("Invalid file type. Please upload a PDF or DOCX.");
        return;
      }

      setFile(selectedFile);
      setError(""); // Clear previous errors
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a valid file.");
      return;
    }

    setLoading(true);
    setError("");
    setSkills("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.skills) {
        setSkills(result.skills);
      } else {
        setError(result.error || "Failed to extract skills.");
      }
    } catch (err) {
      setError("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-lg font-semibold mb-3">Upload Your CV</h1>

      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="mb-3 block w-full border p-2 rounded"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {skills && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h2 className="font-semibold">Extracted Skills:</h2>
          <pre className="text-sm">{skills}</pre>
        </div>
      )}
    </div>
  );
}
