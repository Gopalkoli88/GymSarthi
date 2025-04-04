import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/signupImage.png"; // adjust the path as necessary
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { signupUser } from "@/redux/userSlice";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/pages/Header";

import { jwtDecode } from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

// todo : package for google authentcation
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


export const SignUpTwo = () => {
  // State hooks for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member"); // Default role
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Handle form submission logic here
      const userData = {
        name: fullName,
        email: email,
        password: password,
        role: role,
      };
      const success = await dispatch(signupUser(userData));

      if (signupUser.fulfilled.match(success)) {
        toast.success(`${fullName} Created Successfully`);
        setTimeout(() => {
          navigate("/signin");
        }, 4000);
      } else {
        throw new Error(
          success.payload?.message ||
            "An error occured while creating the member."
        );
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen px-6 py-12 -mt-2 bg-gradient-to-br from-gray-900 to-black">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg shadow-lg md:flex">
          {/* Left Section */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={signupImage}
              alt="Signup Illustration"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-center p-10 rounded-lg md:w-1/2">
            <h2 className="mb-6 text-4xl font-bold text-center text-white">
              Create an Account
            </h2>
            <p className="mt-2 text-lg text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-green-500 transition-colors duration-300 hover:underline hover:text-green-400"
              >
                Sign In
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-300"
                >
                  Full Name
                </Label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-4 mt-2 text-white transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 mt-2 text-white transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-300"
                  >
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 mt-2 text-white transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 flex items-center text-gray-400 transition-colors duration-300 right-4 hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full py-4 font-semibold transition duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 hover:scale-105"
              >
                Sign Up <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

