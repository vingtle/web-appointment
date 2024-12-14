import React, { useState, useEffect } from "react";
import axios from "axios";
import "./galleries.css";

const Galleries = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Fetch all photos from the backend
  const fetchPhotos = async () => {
    try {
      const response = await axios.get("/gallery/photos");
      if (Array.isArray(response.data)) {
        setPhotos(response.data);
      } else {
        setPhotos([]);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setPhotos([]);
      setError("Failed to load photos. Please try again later.");
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setNewPhoto(event.target.files[0]);
  };

  // Upload a new photo
  const handleUploadPhoto = async () => {
    if (!newPhoto) {
      setError("Please select a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", newPhoto);

    try {
      const response = await axios.post("/gallery/upload", formData);
      setPhotos([...photos, response.data]); // Add the new photo to the list
      setNewPhoto(null);
      setError("");
    } catch (error) {
      console.error("Error uploading photo:", error);
      setError("Failed to upload photo.");
    }
  };

  // Delete a photo by ID
  const handleDeletePhoto = async (photoId) => {
    try {
      await axios.delete(`/api/gallery/photos/${photoId}`);
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error("Error deleting photo:", error);
      setError("Failed to delete photo.");
    }
  };

  return (
    <div className="galleries-page">
      <h1 className="gallery-title">Galleries</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="photo-upload-section">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          type="button"
          className="upload-btn"
          onClick={handleUploadPhoto}
        >
          Upload Photo
        </button>
      </div>
      <div className="photo-gallery">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img
              src={`/upload/${photo.filename}`}
              alt="Gallery"
              className="photo-image"
            />
            <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galleries;
