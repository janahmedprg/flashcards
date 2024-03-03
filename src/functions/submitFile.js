import React, { useState } from "react";

export default function SubmitFile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("http://34.42.246.209:5000/vision", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
          // Handle success, e.g., display a success message
        } else {
          console.error("Failed to upload file");
          // Handle failure, e.g., display an error message
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle network error
      }
    } else {
      alert("Please select a file");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
