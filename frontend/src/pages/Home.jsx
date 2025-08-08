import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [styles, setStyles] = useState([]);
  const [selectedHijab, setSelectedHijab] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: "", comment: "", });

  useEffect(() => {
    axios.get("http://localhost:8000/api/hijabstyles")
      .then(res => setStyles(res.data.styles))
      .catch(err => console.log(err));
  }, []);

  console.log("styles" , styles);
  `j`
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/reviews/${selectedHijab._id}`, reviewData );
      
      alert("Review submitted!");
      setSelectedHijab(null); 
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 grid md:grid-cols-2 gap-4">
      {styles.length === 0 ? (
        <p>No styles found</p>
      ) : (
        Array.isArray(styles) && styles?.map(style => (
          <div key={style._id} className="bg-white shadow rounded p-4">
            <img src={style.image} alt="" className="w-full h-48 object-cover" />
            <h2 className="text-xl font-bold">{style.name}</h2>
            <p>{style.description}</p>
            <button
              onClick={() => setSelectedHijab(style)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add Review
            </button>
          </div>
        ))
      )}

      {/* Review Modal */}
      {selectedHijab && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-[300px]">
            <h2 className="text-xl font-bold mb-2">
              Review for: {selectedHijab.name}
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
                  onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                  required
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </label>
              <label className="block mt-2">
                Comment:
                <textarea
                  name="comment"
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  required
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </label>
              <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-1 rounded">
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setSelectedHijab(null)}
                className="ml-2 bg-gray-400 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
