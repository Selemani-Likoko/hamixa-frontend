import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;


function UploadBook({ user }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("book", file);
    formData.append("user_id", user.id); // send user_id to backend

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus(data.message || "Upload complete!");
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("Upload failed.");
    }
  }

  return (
    <div>
      <h2>Upload Book</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".txt,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default UploadBook;
