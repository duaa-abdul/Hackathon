// import { useState } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { setToken, setUser } from "../utils/auth";
// import { Eye, EyeOff } from "lucide-react";

// const AuthForm = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("login");
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
//         formData
//       );
//       if (data.success) {
//         toast.success(data.message);
//         setToken(data.token);
//         setUser(data.user);
//         setFormData({ name: "", email: "", contact: "", password: "" });
//         navigate("/");
//       } else {
//         toast.error("Signup failed!");
//       }
//     } catch (e) {
//       toast.error(`Signup Error: ${e.message}`);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
//         { email: formData.email, password: formData.password }
//       );
//       if (data.success) {
//         setToken(data.token);
//         setUser(data.user);
//         setFormData({ name: "", email: "", contact: "", password: "" });
//         navigate("/home");
//       } else {
//         toast.error("Login failed!");
//       }
//     } catch (e) {
//       toast.error(`Login Error: ${e.message}`);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-rose-100 to-pink-200 px-4">
//       <div className="w-full max-w-md p-8 bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl transition-all duration-500">
//         <div className="flex justify-between mb-6">
//           <button
//             onClick={() => setActiveTab("login")}
//             className={`w-1/2 py-2 rounded-full font-semibold transition-all duration-300 ${
//               activeTab === "login"
//                 ? "bg-red-500 text-white"
//                 : "text-gray-600 hover:text-red-500"
//             }`}
//           >
//             Login
//           </button>
//           <button
//             onClick={() => setActiveTab("create")}
//             className={`w-1/2 py-2 rounded-full font-semibold transition-all duration-300 ${
//               activeTab === "create"
//                 ? "bg-red-500 text-white"
//                 : "text-gray-600 hover:text-red-500"
//             }`}
//           >
//             Create Account
//           </button>
//         </div>

//         {activeTab === "login" && (
//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label className="block text-gray-700 mb-1">Email</label>
//               <input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 type="email"
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <input
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   type={showPassword ? "text" : "password"}
//                   required
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-2.5 text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             <NavLink to="/forgot-password" className="block text-right text-sm text-red-500 hover:underline">
//               Forgot Password?
//             </NavLink>

//             <button
//               type="submit"
//               className="w-full py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transform hover:scale-105 transition"
//             >
//               Login
//             </button>
//           </form>
//         )}

//         {activeTab === "create" && (
//           <form onSubmit={handleSignUp} className="space-y-5">
//             <div>
//               <label className="block text-gray-700 mb-1">Full Name</label>
//               <input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 type="text"
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Email</label>
//               <input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 type="email"
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Contact</label>
//               <input
//                 name="contact"
//                 value={formData.contact}
//                 onChange={handleChange}
//                 type="text"
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Enter your contact number"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 mb-1">Password</label>
//               <input
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 type="password"
//                 required
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Enter your password"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transform hover:scale-105 transition"
//             >
//               Create Account
//             </button>
//           </form>
//         )}
//       </div>
//       <ToastContainer position="top-center" theme="colored" />
//     </div>
//   );
// };

// export default AuthForm;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setToken, setUser } from "../utils/auth";
import { Eye, EyeOff } from "lucide-react";

const AuthForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        formData
      );
      if (data.success) {
        toast.success(data.message);
        setToken(data.token);
        setUser(data.user);
        setFormData({ name: "", email: "", contact: "", password: "" });
        navigate("/");
      } else {
        toast.error("Signup failed!");
      }
    } catch (e) {
      toast.error(`Signup Error: ${e.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        { email: formData.email, password: formData.password }
      );
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        setFormData({ name: "", email: "", contact: "", password: "" });
        
        navigate("/home");
      } else {
        toast.error("Login failed!");
      }
    } catch (e) {
      toast.error(`Login Error: ${e.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {activeTab === "login" ? "Login to your account" : "Create a new account"}
        </h2>

        {activeTab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Contact</label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your contact number"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Toggle Tabs at Bottom */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "login"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "create"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
            }`}
          >
            Create Account
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};

export default AuthForm;
