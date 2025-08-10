import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewsPage = () => {
  const { hijabId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [hijab, setHijab] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/reviews/${hijabId}`);
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchHijabDetails = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/hijabstyles");
        const found = res.data.styles.find((style) => style._id === hijabId);
        setHijab(found);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews();
    fetchHijabDetails();
  }, [hijabId]);

  return (
    <div className="p-6 max-w-xl mx-auto bg-blue-50 rounded-lg shadow-lg mt-8">
      <button
        onClick={() => navigate("/home")}
        className="mb-6 bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md shadow"
      >
        &larr; Back to Home
      </button>
      {hijab && (
        <>
          <h1 className="text-3xl font-extrabold mb-6 text-blue-900">{`Reviews for: ${hijab.title}`}</h1>
          {reviews.length === 0 ? (
            <p className="text-center text-blue-700 text-lg">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border border-blue-300 p-5 mb-4 rounded-lg bg-white shadow-md hover:shadow-lg transition"
              >
                <p className="text-blue-800 font-semibold text-lg">
                  Rating: <span className="text-yellow-400">{review.rating} / 5</span>
                </p>
                <p className="mt-2 text-blue-700 italic">{`"${review.comment}"`}</p>
                {review.user && (
                  <p className="mt-3 text-blue-600 text-sm text-right">
                    — {review.user.name || "Anonymous"}
                  </p>
                )}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsPage;
