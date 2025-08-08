import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/authForm";
import Home from "./pages/Home";
import HijabGallery from "./pages/HijabGallery";  
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
           <Route path="/home" element={<Home />} />
           <Route path="/gallery" element={<HijabGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
