import axios from "axios";
import { useState } from "react";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await axios.post("http://localhost:8000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedUrl(data.imageUrl);
      alert("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {uploadedUrl && (
        <div>
          <p>Uploaded Image URL:</p>
          <code>{uploadedUrl}</code>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

