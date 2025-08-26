"use client";
import { useState } from "react";

export default function ExcelUploader() {
  const [jsonData, setJsonData] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setJsonData(data);
  };

  return (
    <div>
      <input label="file_uploder" type="file" accept=".xlsx,.xls" onChange={handleFile} />
      {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )}
    </div>
  );
}
