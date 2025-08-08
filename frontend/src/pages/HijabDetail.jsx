import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HijabDetail = () => {
  const { id } = useParams();
  const [style, setStyle] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/styles`).then(res => {
      const selected = res.data.find(s => s._id === id);
      setStyle(selected);
    });
    axios.get(`http://localhost:8000/api/reviews/${id}`).then(res => setReviews(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:8000/api/reviews", {
      ...reviewData,
      hijabStyle: id,
      user: JSON.parse(localStorage.getItem("user"))._id
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setReviewData({ rating: 5, comment: "" });
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length).toFixed(1) : "No ratings yet";

  return (
    <div className="p-6">
      <img src={style.image} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{style.name}</h1>
      <p>{style.description}</p>
      <p className="mt-2 font-semibold">⭐ Average Rating: {averageRating}</p>

      <h2 className="text-xl mt-6 font-bold">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="number" min="1" max="5" value={reviewData.rating} onChange={e => setReviewData({ ...reviewData, rating: e.target.value })} className="border rounded px-3 py-1" />
        <textarea value={reviewData.comment} onChange={e => setReviewData({ ...reviewData, comment: e.target.value })} className="w-full border rounded p-2" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>

      <h2 className="text-xl mt-6 font-bold">Reviews</h2>
      {reviews.map(r => (
        <div key={r._id} className="border-b py-2">
          <p>⭐ {r.rating} - {r.comment}</p>
          <small>By: {r.user?.name}</small>
        </div>
      ))}
    </div>
  );
};

export default HijabDetail;
