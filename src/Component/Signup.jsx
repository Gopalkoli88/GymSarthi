// import { useState } from "react";
// import { ArrowRight } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import signupImage from "../assets/signupImage.png"; // adjust the path as necessary
// import { Button } from "@/components/ui/button";
// import { useDispatch } from "react-redux";
// import { signupUser } from "@/redux/userSlice";
// import { Eye, EyeOff } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // todo : package for google authentcation
// // import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// export const SignUpTwo = () => {
//   // State hooks for form inputs
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("member"); // Default role
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

//   //todo : google client id :
//   // const clientId =
//   //   "742857501088-h87tefshg3lou4h02utmgoltndldau5s.apps.googleusercontent.com";

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       // Handle form submission logic here
//       const userData = {
//         name: fullName,
//         email: email,
//         password: password,
//         role: role,
//       };
//       const success = await dispatch(signupUser(userData));

//       if (signupUser.fulfilled.match(success)) {
//         toast.success(`${fullName} Created Successfully`);
//         setTimeout(() => {
//           navigate("/signin");
//         }, 4000);
//       } else {
//         throw new Error(
//           success.payload?.message ||
//             "An error occured while creating the member."
//         );
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occurred");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const handleGoogleSuccess = (response) => {
//     console.log("Google Response :", response); // You will get the Google profile information here
//   };

//   const handleGoogleFailure = (error) => {
//     console.error("Google Sign-In Error:", error);
//   };

//   return (
//     // <section className="flex justify-center items-center mt-12 flex-wrap overflow-hidden">
//     <section className="flex justify-center flex-wrap overflow-hidden ">
//       <div className="grid grid-cols-1 lg:grid-cols-2">
//         {/* Image -------- */}
//         <div className="relative flex items-start py-4 pb-8 right-10 pt-40 mt-10 sm:py-6 sm:pb-12 md:justify-center lg:py-8 lg:pb-16">
//           <div className="  flex items-center justify-center">
//             <img
//               className="rounded-md object-cover "
//               src={signupImage}
//               alt="signup image"
//             />
//           </div>
//         </div>
//         {/* Image-------- */}

//         <div className="flex items-center justify-center m-8  py-4 ml-18  px-8 sm:px-6 sm:py-12   lg:py-16">
//           <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
//             <h2 className="text-2xl font-bold leading-tight text-center text-white sm:text-4xl">
//               Sign up
//             </h2>
//             <p className="mt-2 text-base text-center text-[#64748b]">
//               Already have an account?{" "}
//               <Link
//                 to="/signin"
//                 className="font-medium text-green transition-all duration-200 hover:underline"
//               >
//                 Sign In
//               </Link>
//             </p>
//             <form onSubmit={handleSubmit} className="mt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="text-base font-medium text-left text-[#cbd5e1]"
//                   >
//                     Full Name
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       className="flex h-10 min-w-full  rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type="text"
//                       placeholder="Full Name"
//                       id="name"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="text-base font-medium text-[#cbd5e1]"
//                   >
//                     Email address
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type="email"
//                       placeholder="Email"
//                       id="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between">
//                     <label
//                       htmlFor="password"
//                       className="text-base font-medium text-[#cbd5e1]"
//                     >
//                       Password
//                     </label>
//                     <button
//                       type="button"
//                       onClick={togglePasswordVisibility}
//                       className="text-gray-400 hover:text-gray-600 focus:outline-none"
//                     >
//                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                     </button>
//                   </div>
//                   <div className="mt-1">
//                     <input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Button
//                     type="submit"
//                     className="inline-flex w-full items-center justify-center rounded-md bg-blue600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
//                   >
//                     Create Account <ArrowRight className="ml-2" size={16} />
//                   </Button>
//                 </div>
//               </div>
//             </form>
//             {/* Google Sign button */}
//             <div className="mt-3 space-y-3">
//               <button
//                 type="button"
//                 className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
//               >
//                 <span className="mr-2 inline-block">
//                   <svg
//                     className="h-6 w-6 text-rose-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
//                   </svg>
//                 </span>
//                 Sign in with Google
//               </button>
//               <button
//                 type="button"
//                 className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
//               >
//                 <span className="mr-2 inline-block">
//                   <svg
//                     className="h-6 w-6 text-[#2563eb]"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M12.004 2.002a10 10 0 0 0-3.153 19.475c.5.092.68-.22.68-.493v-2.12c-2.752.596-3.331-1.238-3.331-1.238-.45-1.139-1.097-1.44-1.097-1.44-.898-.622.067-.609.067-.609 1 .071 1.586 1.05 1.586 1.05.878 1.507 2.305 1.074 2.86.822.089-.635.342-1.074.622-1.318-2.09-.236-4.294-1.073-4.294-4.78 0-1.055.374-1.92.992-2.596-.099-.235-.433-1.18.095-2.458 0 0 .825-.265 2.709 1.025a9.416 9.416 0 0 1 4.945-1.365c1.688 0 3.272.711 4.417 1.818 1.102-1.205 1.743-2.709 1.743-4.206 0-1.415-.485-2.722-1.308-3.759-.839-1.044-2.002-1.747-3.331-2.149-.807-.158-1.581-.245-2.378-.245-2.051 0-3.965.679-5.565 1.802a7.244 7.244 0 0 0-2.21 3.924c-.579 1.772-.296 3.77 1.174 5.312-1.64.66-3.456 1.01-5.244 1.01-.657 0-1.314-.068-1.974-.177a10.026 10.026 0 0 0 8.446 5.717A10 10 0 0 0 12.004 2.002z"></path>
//                   </svg>
//                 </span>
//                 Sign up with Twitter
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </section>
//   );
// };

// import { useState } from "react";
// import { ArrowRight } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import signupImage from "../assets/signupImage.png"; // adjust the path as necessary
// import { Button } from "@/components/ui/button";
// import { useDispatch } from "react-redux";
// import { signupUser } from "@/redux/userSlice";
// import { Eye, EyeOff } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // todo : package for google authentcation
// // import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// export const SignUpTwo = () => {
//   // State hooks for form inputs
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("member"); // Default role
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

//   //todo : google client id :
//   // const clientId =
//   //   "742857501088-h87tefshg3lou4h02utmgoltndldau5s.apps.googleusercontent.com";

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       // Handle form submission logic here
//       const userData = {
//         name: fullName,
//         email: email,
//         password: password,
//         role: role,
//       };
//       const success = await dispatch(signupUser(userData));

//       if (signupUser.fulfilled.match(success)) {
//         toast.success(`${fullName} Created Successfully`);
//         setTimeout(() => {
//           navigate("/signin");
//         }, 4000);
//       } else {
//         throw new Error(
//           success.payload?.message ||
//             "An error occured while creating the member."
//         );
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occurred");
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const handleGoogleSuccess = (response) => {
//     console.log("Google Response :", response); // You will get the Google profile information here
//   };

//   const handleGoogleFailure = (error) => {
//     console.error("Google Sign-In Error:", error);
//   };

//   return (
//     // <section className="flex justify-center items-center mt-12 flex-wrap overflow-hidden">
//     <section className="flex justify-center flex-wrap overflow-hidden ">
//       <div className="grid grid-cols-1 lg:grid-cols-2">
//         {/* Image -------- */}
//         <div className="relative flex items-start py-4 pb-8 right-10 pt-40 mt-10 sm:py-6 sm:pb-12 md:justify-center lg:py-8 lg:pb-16">
//           <div className="  flex items-center justify-center">
//             <img
//               className="rounded-md object-cover "
//               src={signupImage}
//               alt="signup image"
//             />
//           </div>
//         </div>
//         {/* Image-------- */}

//         <div className="flex items-center justify-center m-8  py-4 ml-18  px-8 sm:px-6 sm:py-12   lg:py-16">
//           <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
//             <h2 className="text-2xl font-bold leading-tight text-center text-white sm:text-4xl">
//               Sign up
//             </h2>
//             <p className="mt-2 text-base text-center text-[#64748b]">
//               Already have an account?{" "}
//               <Link
//                 to="/signin"
//                 className="font-medium text-green transition-all duration-200 hover:underline"
//               >
//                 Sign In
//               </Link>
//             </p>
//             <form onSubmit={handleSubmit} className="mt-6">
//               <div className="space-y-4">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="text-base font-medium text-left text-[#cbd5e1]"
//                   >
//                     Full Name
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       className="flex h-10 min-w-full  rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type="text"
//                       placeholder="Full Name"
//                       id="name"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="text-base font-medium text-[#cbd5e1]"
//                   >
//                     Email address
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type="email"
//                       placeholder="Email"
//                       id="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between">
//                     <label
//                       htmlFor="password"
//                       className="text-base font-medium text-[#cbd5e1]"
//                     >
//                       Password
//                     </label>
//                     <button
//                       type="button"
//                       onClick={togglePasswordVisibility}
//                       className="text-gray-400 hover:text-gray-600 focus:outline-none"
//                     >
//                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                     </button>
//                   </div>
//                   <div className="mt-1">
//                     <input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Button
//                     type="submit"
//                     className="inline-flex w-full items-center justify-center rounded-md bg-blue600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
//                   >
//                     Create Account <ArrowRight className="ml-2" size={16} />
//                   </Button>
//                 </div>
//               </div>
//             </form>
//             {/* Google Sign button */}
//             <div className="mt-3 space-y-3">
//               <button
//                 type="button"
//                 className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
//               >
//                 <span className="mr-2 inline-block">
//                   <svg
//                     className="h-6 w-6 text-rose-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
//                   </svg>
//                 </span>
//                 Sign in with Google
//               </button>
//               <button
//                 type="button"
//                 className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
//               >
//                 <span className="mr-2 inline-block">
//                   <svg
//                     className="h-6 w-6 text-[#2563eb]"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M12.004 2.002a10 10 0 0 0-3.153 19.475c.5.092.68-.22.68-.493v-2.12c-2.752.596-3.331-1.238-3.331-1.238-.45-1.139-1.097-1.44-1.097-1.44-.898-.622.067-.609.067-.609 1 .071 1.586 1.05 1.586 1.05.878 1.507 2.305 1.074 2.86.822.089-.635.342-1.074.622-1.318-2.09-.236-4.294-1.073-4.294-4.78 0-1.055.374-1.92.992-2.596-.099-.235-.433-1.18.095-2.458 0 0 .825-.265 2.709 1.025a9.416 9.416 0 0 1 4.945-1.365c1.688 0 3.272.711 4.417 1.818 1.102-1.205 1.743-2.709 1.743-4.206 0-1.415-.485-2.722-1.308-3.759-.839-1.044-2.002-1.747-3.331-2.149-.807-.158-1.581-.245-2.378-.245-2.051 0-3.965.679-5.565 1.802a7.244 7.244 0 0 0-2.21 3.924c-.579 1.772-.296 3.77 1.174 5.312-1.64.66-3.456 1.01-5.244 1.01-.657 0-1.314-.068-1.974-.177a10.026 10.026 0 0 0 8.446 5.717A10 10 0 0 0 12.004 2.002z"></path>
//                   </svg>
//                 </span>
//                 Sign up with Twitter
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </section>
//   );
// };

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
import Header from "@/pages/Header";

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

  //todo : google client id :
  // const clientId =
  //   "742857501088-h87tefshg3lou4h02utmgoltndldau5s.apps.googleusercontent.com";

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
  const handleGoogleSuccess = (response) => {
    console.log("Google Response :", response); // You will get the Google profile information here
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Error:", error);
  };

  return (
    // <section className="flex justify-center items-center mt-12 flex-wrap overflow-hidden">
    <>
    <div className="mt-5">
    <Header />
    </div>
    <section className="flex justify-center flex-wrap overflow-hidden ">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image -------- */}
        {/* <div className="relative flex items-start py-4 pb-8 right-10 pt-40 mt-3 sm:py-6 sm:pb-12 md:justify-center lg:py-8 lg:pb-16"> */}
        <div className="relative flex items-start py-4  right-10  sm:py-6 sm:pb-12 md:justify-center lg:py-8 lg:pb-16">

          <div className="  flex items-center justify-center">
            <img
              className="rounded-md object-cover "
              src={signupImage}
              alt="signup image"
            />
          </div>
        </div>
        {/* Image-------- */}

        <div className="flex items-center justify-center m-8  py-4 ml-18  px-8 sm:px-6 sm:py-12   lg:py-16">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-2xl font-bold leading-tight text-center text-white sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-center text-[#64748b]">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-green-500 transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-left text-[#cbd5e1]"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      className="flex h-10 min-w-full  rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-[#cbd5e1]"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-[#cbd5e1]"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className="mt-1">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-blue600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </form>
            {/* Google Sign button */}
            <div className="mt-3 space-y-3">
              {/* <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign in with Google
              </button> */}
              {/* <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-[#2563eb]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.004 2.002a10 10 0 0 0-3.153 19.475c.5.092.68-.22.68-.493v-2.12c-2.752.596-3.331-1.238-3.331-1.238-.45-1.139-1.097-1.44-1.097-1.44-.898-.622.067-.609.067-.609 1 .071 1.586 1.05 1.586 1.05.878 1.507 2.305 1.074 2.86.822.089-.635.342-1.074.622-1.318-2.09-.236-4.294-1.073-4.294-4.78 0-1.055.374-1.92.992-2.596-.099-.235-.433-1.18.095-2.458 0 0 .825-.265 2.709 1.025a9.416 9.416 0 0 1 4.945-1.365c1.688 0 3.272.711 4.417 1.818 1.102-1.205 1.743-2.709 1.743-4.206 0-1.415-.485-2.722-1.308-3.759-.839-1.044-2.002-1.747-3.331-2.149-.807-.158-1.581-.245-2.378-.245-2.051 0-3.965.679-5.565 1.802a7.244 7.244 0 0 0-2.21 3.924c-.579 1.772-.296 3.77 1.174 5.312-1.64.66-3.456 1.01-5.244 1.01-.657 0-1.314-.068-1.974-.177a10.026 10.026 0 0 0 8.446 5.717A10 10 0 0 0 12.004 2.002z"></path>
                  </svg>
                </span>
                Sign up with Twitter
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
    </>
  );
};

