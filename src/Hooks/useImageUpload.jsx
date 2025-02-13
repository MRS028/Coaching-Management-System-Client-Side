import { useState } from "react";
import axios from "axios";

const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  

  const uploadImage = async (file) => {
    if (!file) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    // const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const apiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY; 
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
      setUploading(true);
      setError(null);

      const response = await axios.post(url, formData);
      setImageUrl(response.data.data.url);

      return response.data.data.url; 
    } catch (err) {
      setError("Image upload failed.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, imageUrl, error };
};

export default useImageUpload;
