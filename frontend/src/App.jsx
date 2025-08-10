import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/authForm";
import Home from "./pages/Home";
import HijabGallery from "./pages/HijabGallery";  
import ReviewsPage from "./pages/ReviewsPage";
import ImageUploader from "./pages/ImageUploader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
           <Route path="/home" element={<Home />} />
           <Route path="/gallery" element={<HijabGallery />} />
      <Route path="/reviews/:hijabId" element={<ReviewsPage />} />
      <Route path="/upload-image" element={<ImageUploader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
