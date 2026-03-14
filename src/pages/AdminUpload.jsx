import React, { useState } from "react";

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a PDF or DOCX file.");
      return;
    }

    setLoading(true);
    setStatus("Uploading and rebuilding vectorstore...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setStatus(data.message || "Upload complete!");
    } catch (err) {
      setStatus("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Upload Panel</h2>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="border p-2 w-full rounded mb-3"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:bg-gray-300"
        >
          {loading ? "Processing..." : "Upload & Rebuild"}
        </button>
        <p className="text-center mt-4 text-gray-700">{status}</p>
      </div>
    </div>
  );
}
