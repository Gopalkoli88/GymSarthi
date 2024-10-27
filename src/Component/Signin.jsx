// import { Link, useNavigate } from "react-router-dom";
// import signupImage from "../assets/signupImage.png";
// import "../App.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { loginUser } from "@/redux/userSlice";
// import { Button } from "@/components/ui/button";
// import { Eye, EyeOff } from "lucide-react";
// import { Input } from "@/components/ui/input";

// export const Signin = () => {
//   const dispatch = useDispatch();
//   const status = useSelector((state) => state.user.status);
//   const error = useSelector((state) => state.user.error);
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await dispatch(loginUser({ email, password }));
//       const { user } = response.payload;

//       // if (user.role === "admin") {
//       //   navigate("/admin-dashboard");
//       // } else if (user.role === "trainer") {
//       //   navigate("/trainer-dashboard");
//       // } else {
//       //   navigate("/member-dashboard");
//       // }

//       if (user) {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Sign in error :", error);
//     }
//   };
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <section className="flex justify-center items-center mt-12 flex-wrap overflow-hidden">
//       <div className="grid grid-cols-1 lg:grid-cols-2">
//         {/* ---------------------------------------------- */}
//         {/* first part */}
//         <div className="flex items-center justify-center m-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
//           <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
//             <h2 className="text-3xl font-bold leading-tight text-center text-white sm:text-4xl">
//               Sign in
//             </h2>
//             <p className="mt-2 text-base text-center text-[#64748b]">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/signup"
//                 title=""
//                 className="font-medium text-green transition-all duration-200 hover:underline"
//               >
//                 Create a free account
//               </Link>
//             </p>

//             {/* todo : form  */}
//             <form
//               onSubmit={handleSubmit}
//               action="#"
//               method="POST"
//               className="mt-6"
//             >
//               <div className="space-y-4">
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="text-base font-medium text-left text-[#cbd5e1]"
//                   >
//                     Email address
//                   </label>
//                   <div className="mt-1">
//                     <Input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type="email"
//                       placeholder="Email"
//                       onChange={(e) => setEmail(e.target.value)}
//                       value={email}
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
//                     <Input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Button
//                     type="submit"
//                     className="inline-flex w-full items-center justify-center  rounded-md bg-blue600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 bg-blue-500"
//                     disabled={status == "loading"}
//                   >
//                     {status === "loading" ? "Logging in..." : "Login"}
//                   </Button>
//                    {error && <p>{error}</p>}
//                 </div>
//               </div>
//             </form>
//             <div className="mt-4 space-y-3">
//               <Button
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
//               </Button>
//               <Button
//                 type="button"
//                 className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
//               >
//                 <span className="mr-2 inline-block">
//                   <svg
//                     className="h-6 w-6 text-[#2563EB]"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
//                   </svg>
//                 </span>
//                 Sign in with Facebook
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="relative flex items-end px-4 pb-8 m-8 pt-40 sm:px-6 sm:pb-12 md:justify-center lg:px-8 lg:pb-16">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <img
//               className="rounded-md object-cover"
//               src={signupImage}
//               alt="login image"
//             />
//           </div>
//         </div>

//         {/* ------------------------------------------------------ */}
//       </div>
//     </section>
//   );
// };

// export default Signin;


// import { Link, useNavigate } from "react-router-dom";
// import signupImage from "../assets/signupImage.png";
// import "../App.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { loginUser } from "@/redux/userSlice";
// import { Button } from "@/components/ui/button";
// import { Eye, EyeOff } from "lucide-react";
// import { Input } from "@/components/ui/input";

// export const Signin = () => {
//   const dispatch = useDispatch();
//   const status = useSelector((state) => state.user.status);
//   const error = useSelector((state) => state.user.error);
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await dispatch(loginUser({ email, password }));
//       const { user } = response.payload;

//       // if (user.role === "admin") {
//       //   navigate("/admin-dashboard");
//       // } else if (user.role === "trainer") {
//       //   navigate("/trainer-dashboard");
//       // } else {
//       //   navigate("/member-dashboard");
//       // }

//       if (user) {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Sign in error :", error);
//     }
//   };
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <section className="flex justify-center items-center mt-12 flex-wrap overflow-hidden">
//       <div className="grid grid-cols-1 lg:grid-cols-2">
//         {/* ---------------------------------------------- */}
//         {/* first part */}
//         <div className="flex items-center justify-center m-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
//           <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
//             <h2 className="text-3xl font-bold leading-tight text-center text-white sm:text-4xl">
//               Sign in
//             </h2>
//             <p className="mt-2 text-base text-center text-[#64748b]">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/signup"
//                 title=""
//                 className="font-medium text-green transition-all duration-200 hover:underline"
//               >
//                 Create a free account
//               </Link>
//             </p>

//             {/* todo : form  */}
//             <form
//               onSubmit={handleSubmit}
//               action="#"
//               method="POST"
//               className="mt-6"
//             >
//               <div className="space-y-4">
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="text-base font-medium text-left text-[#cbd5e1]"
//                   >
//                     Email address
//                   </label>
//                   <div className="mt-1">
//                     <Input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type="email"
//                       placeholder="Email"
//                       onChange={(e) => setEmail(e.target.value)}
//                       value={email}
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
//                     <Input
//                       className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <Button
//                     type="submit"
//                     className="inline-flex w-full items-center justify-center  rounded-md bg-blue600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 bg-blue-500"
//                     disabled={status == "loading"}
//                   >
//                     {status === "loading" ? "Logging in..." : "Login"}
//                   </Button>
//                    {error && <p>{error}</p>}
//                 </div>
//               </div>
//             </form>
//             <div className="mt-4 space-y-3">
//               <Button
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
//               </Button>
//               <Button
//                 type="button"
//                 className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
//               >
//                 <span className="mr-2 inline-block">
//                   <svg
//                     className="h-6 w-6 text-[#2563EB]"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
//                   </svg>
//                 </span>
//                 Sign in with Facebook
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="relative flex items-end px-4 pb-8 m-8 pt-40 sm:px-6 sm:pb-12 md:justify-center lg:px-8 lg:pb-16">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <img
//               className="rounded-md object-cover"
//               src={signupImage}
//               alt="login image"
//             />
//           </div>
//         </div>

//         {/* ------------------------------------------------------ */}
//       </div>
//     </section>
//   );
// };

// export default Signin;
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/signupImage.png";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser } from "@/redux/userSlice";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Signin = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser({ email, password }));
      const { user } = response.payload;

      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Sign in error :", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="flex justify-center items-center mt-12 flex-wrap overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* ---------------------------------------------- */}
        {/* first part */}
        <div className="flex items-center justify-center m-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-center text-white sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-base text-center text-[#64748b]">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                title=""
                className="font-medium text-green-500 transition-all duration-200 hover:underline"
              >
                <span className="relative inline-block">
                  <span className="absolute inset-0 w-full h-0.5 bg-green-500 transition-transform duration-200 transform scale-x-0 origin-left"></span>
                  <span className="relative">Create a free account</span>
                </span>
              </Link>
            </p>

            {/* todo : form  */}
            <form
              onSubmit={handleSubmit}
              action="#"
              method="POST"
              className="mt-6"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-left text-[#cbd5e1]"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <Input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                    <Input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-500 transition duration-300"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Logging in..." : "Login"}
                  </Button>
                  {error && <p className="mt-2 text-red-500">{error}</p>}
                </div>
              </div>
            </form>

            {/* Enhanced styling for attractiveness */}
            {/* <div className="mt-6 text-center">
              <p className="text-gray-400">Or</p>
              <Button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-blue-500 px-4 py-2 font-semibold text-white transition-all duration-200 hover:bg-blue-600 focus:outline-none"
              >
                Reset Password
              </Button>
            </div> */}
          </div>
        </div>

        <div className="relative flex items-end px-4 pb-8 m-8 pt-40 sm:px-6 sm:pb-12 md:justify-center lg:px-8 lg:pb-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              className="rounded-md object-cover"
              src={signupImage}
              alt="login image"
            />
          </div>
        </div>
        {/* ------------------------------------------------------ */}
      </div>
    </section>
  );
};

export default Signin;


