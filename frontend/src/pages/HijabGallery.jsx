import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const HijabGallery = () => {
  const [selectedHijab, setSelectedHijab] = useState(null);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    const fetchStyles = async () => {
      const res = await axios.get("http://localhost:8000/api/styles");
      setStyles(res.data);
    };

    fetchStyles();
  }, []);

 const handleReviewSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const rating = formData.get("rating");
  const comment = formData.get("comment");

  try {
    await axios.post(`http://localhost:8000/api/styles/${selectedHijab._id}/reviews`, {
      rating,
      comment,
      user: "Anonymous", // or replace with actual logged-in user
    });

    toast.success("Review submitted!");
    setSelectedHijab(null);
  } catch (err) {
    console.log(err);
    toast.error("Failed to submit review");
  }
};
  return (
    <>
      {/* your modal code */}
      {selectedHijab && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-lg font-bold">{selectedHijab.name}</h2>
            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-3">
              <input name="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" className="w-full border p-2" />
              <textarea name="comment" placeholder="Write your review..." className="w-full border p-2"></textarea>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Submit Review</button>
            </form>
            <button className="mt-4 text-red-500" onClick={() => setSelectedHijab(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HijabGallery;
