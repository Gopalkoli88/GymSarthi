import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/signupImage.png";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser } from "@/redux/userSlice";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/pages/Header";
import ForgotPassword from "@/Component/forgatePassword";
import { toast, ToastContainer } from "react-toastify";

const CLIENT_ID =
  "904448913509-jng79u6cad83a7ij4cseejn7s92t334i.apps.googleusercontent.com";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const userData = await dispatch(loginUser({ email, password })).unwrap();
      toast.success(`Welcome, ${userData.user.name}!`);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      let errorMessage = err?.msg;

      if (typeof errorMessage === "object") {
        errorMessage = JSON.stringify(errorMessage); // or extract key
      }

      toast.error(errorMessage || "Login failed. Please try again.");
      setErrors({ form: errorMessage || "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (res) => {
    setGoogleLoading(true);
    try {
      const decoded = jwtDecode(res.credential);
      console.log("password : ", decoded);
      const googleUser = {
        email: decoded.email,
        name: decoded.name,
        password: decoded.email,
        googleLogin: true,
        picture: decoded.picture,
      };

      const response = await dispatch(loginUser(googleUser));
      toast.success(`Welcome, ${response.user.name}!`);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      let errorMessage = err?.msg;

      if (typeof errorMessage === "object") {
        errorMessage = JSON.stringify(errorMessage); // or extract key
      }

      toast.error(errorMessage || "Login failed. Please try again.");
      setErrors({ form: errorMessage || "Login failed. Please try again." });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen px-4 -mt-2 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg md:flex">
          {/* Left Section */}
          <div className="flex flex-col justify-center p-8 md:w-1/2">
            {showForgotPassword ? (
              <>
                <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="mt-3 text-sm text-blue-400 hover:underline"
                >
                  ← Back to Login
                </button>
              </>
            ) : (
              <>
                <h2 className="mb-4 text-4xl font-bold text-center text-white">
                  Sign In
                </h2>
                <p className="mt-2 text-lg text-center text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-green-500 transition-colors duration-300 hover:underline hover:text-green-400"
                  >
                    Sign Up
                  </Link>
                </p>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
                      className="w-full p-3 mt-2 text-white transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
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
                        className="w-full p-3 pr-10 mt-2 text-white transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 flex items-center text-gray-400 transition-colors duration-300 right-3 hover:text-gray-200"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Forgot Password Link */}
                  <p className="text-right">
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </p>

                  <Button
                    type="submit"
                    className="w-full py-3 font-semibold transition duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 hover:scale-105"
                    disabled={status === "loading"}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>

                  {Object.values(errors).length > 0 && (
                    <div className="text-sm text-red-500 text-center space-y-1">
                      {Object.values(errors).map((msg, i) => (
                        <p key={i}>{msg}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-600" />
                    <span className="mx-4 text-gray-400">OR</span>
                    <hr className="flex-grow border-gray-600" />
                  </div>

                  {/* Google Sign-In Button */}
                  <div className="flex justify-center mt-4">
                    <GoogleOAuthProvider clientId={CLIENT_ID}>
                      {googleLoading ? (
                        <Button
                          className="bg-gray-600 cursor-not-allowed"
                          disabled
                        >
                          Processing...
                        </Button>
                      ) : (
                        <GoogleLogin
                          onSuccess={handleGoogleLogin}
                          onError={() => console.log("Google Sign-In Failed")}
                        />
                      )}
                    </GoogleOAuthProvider>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="hidden md:block md:w-1/2">
            <img
              src={signupImage}
              alt="Login Illustration"
              className="object-cover w-full h-full md:static"
            />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signin;
