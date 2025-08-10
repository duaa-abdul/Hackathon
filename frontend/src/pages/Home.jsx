import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [styles, setStyles] = useState([]);
  const [selectedHijab, setSelectedHijab] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: "", comment: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hijabstyles")
      .then((res) => setStyles(res.data.styles))
      .catch((err) => console.log(err));
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo?.token) {
      alert("Please login to submit a review");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/api/reviews/${selectedHijab._id}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Review submitted!");
      setSelectedHijab(null);
      setReviewData({ rating: "", comment: "" });
    } catch (err) {
      console.log(err);
      alert("Error submitting review");
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold mb-6 text-center text-blue-600">HIJAB GALLERY</h1>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {styles.length === 0 ? (
          <p>No styles found</p>
        ) : (
          styles.map((style) => (
            <div key={style._id} className="bg-white shadow rounded p-4">
              <img
                src={`http://localhost:8000${style.image}`}
                alt={style.title}
                  className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-bold">{style.title}</h2>
              <p>{style.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setSelectedHijab(style)}
                  className="bg-blue-800 text-white px-3 py-1 rounded"
                >
                  Add Review
                </button>
                <button
                  onClick={() => navigate(`/reviews/${style._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Show Reviews
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      {selectedHijab && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-[300px]">
            <h2 className="text-xl font-bold mb-7 text-blue-600">
              Review for: {selectedHijab.title}
            </h2>
            <form onSubmit={handleReviewSubmit}>
              <label className="block">
                Rating (1-5):
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  value={reviewData.rating}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, rating: e.target.value })
                  }
                  required
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </label>
              <label className="block mt-2">
                Comment:
                <textarea
                  name="comment"
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                  required
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </label>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-4 py-1 rounded"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHijab(null)}
                  className="bg-blue-400 text-white px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

};

export default Home;
