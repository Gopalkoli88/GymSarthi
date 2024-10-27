// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/FITNESS_logo.png";
// import { Button } from "@/components/ui/button";

// const Header = ({ user }) => {
//   const navigate = useNavigate();
//   return (
//     <header className="bg-background w-full  px-4 lg:px-6 h-14 flex items-center shadow-sm mt-1 mb-2">
//       <Link
//         to="/"
//         className="flex items-center justify-center"
//         prefetch={false}
//       >
//         <DumbbellIcon className="h-14 w-14" />
//         <img className="mt-2 ml-5 h-10" src={logo} alt="Gym Fitness" />
//         <span className="sr-only">Gym Fitness</span>
//       </Link>
//       <nav className="ml-auto flex gap-4 sm:gap-6">
//         <Link
//           to="/"
//           className="text-base font-medium hover:underline underline-offset-4"
//           prefetch={false}
//         >
//           HOME
//         </Link>
//         <Link
//           to="/about"
//           className="text-base font-medium hover:underline underline-offset-4"
//           prefetch={false}
//         >
//           ABOUT
//         </Link>
//         <Link
//           to="/contact"
//           className="text-base font-medium hover:underline underline-offset-4"
//           prefetch={false}
//         >
//           CONTACT
//         </Link>
//         {/* Conditional rendering based on user role */}
//         {user && user.role === "member" && (
//           <Link
//             to="/member-dashboard"
//             className="text-base font-medium hover:underline underline-offset-4"
//             prefetch={false}
//           >
//            DASHBOARD
//           </Link>
//         )}
//         {user && user.role === "trainer" && (
//           <Link
//             to="/trainer-dashboard"
//             className="text-base font-medium hover:underline underline-offset-4"
//             prefetch={false}
//           >
//             DASHBOARD
//           </Link>
//         )}
//         {user && user.role === "admin" && (
//           <Link
//             to="/admin-dashboard"
//             className="text-base font-medium hover:underline underline-offset-4"
//             prefetch={false}
//           >
//             DASHBOARD
//           </Link>
//         )}

//         {/* Sign out feature */}
//         {/* {user && (
//           <Button
//             className="text-base font-medium  "
//             prefetch={false}
//             onClick={() => {
//               localStorage.removeItem("user");
//               localStorage.removeItem("token");
//               navigate("/signin");
//             }}
//           >
//             SIGN OUT
//           </Button>
//         )} */}
//         {!user && (
//           <Link
//             to="/signup"
//             replace
//             className="text-xl font-medium hover:underline underline-offset-4 "
//             prefetch={false}
//           >
//             <Button>SIGN UP</Button>{" "}
//           </Link>
//         )}

//         <hr className="border-l-2 border-blue-500 h-9  border-r-2" />

//         {!user && (
//           <Link
//             to="/signin"
//             replace
//             className="text-xl font-medium hover:underline underline-offset-4"
//             prefetch={false}
//           >
//             <Button> SIGN IN</Button>
//           </Link>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
// function DumbbellIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M14.4 14.4 9.6 9.6" />
//       <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
//       <path d="m21.5 21.5-1.4-1.4" />
//       <path d="M3.9 3.9 2.5 2.5" />
//       <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
//     </svg>
//   );
// }


//! Swapnil makes :
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/FITNESS_logo.png";
// import { Button } from "@/components/ui/button";

// const Header = ({ user }) => {
//   const navigate = useNavigate();
//   return (
//     <header className="flex items-center w-full px-4 mt-1 mb-2 shadow-sm bg-background lg:px-6 h-14">
//       <Link
//         to="/"
//         className="flex items-center justify-center"
//         prefetch={false}
//       >
//         <DumbbellIcon className="h-14 w-14" />
//         <img className="h-10 mt-2 ml-5" src={logo} alt="Gym Fitness" />
//         <span className="sr-only">Gym Fitness</span>
//       </Link>
//       <nav className="flex gap-4 ml-auto sm:gap-6">
//         <Link
//           to="/"
//           className="text-base font-medium hover:underline underline-offset-4"
//           prefetch={false}
//         >
//           HOME
//         </Link>
//         <Link
//           to="/about"
//           className="text-base font-medium hover:underline underline-offset-4"
//           prefetch={false}
//         >
//           ABOUT
//         </Link>
//         <Link
//           to="/contact"
//           className="text-base font-medium hover:underline underline-offset-4"
//           prefetch={false}
//         >
//           CONTACT
//         </Link>
//         {/* Conditional rendering based on user role */}
//         {user && user.role === "member" && (
//           <Link
//             to="/member-dashboard"
//             className="text-base font-medium hover:underline underline-offset-4"
//             prefetch={false}
//           >
//            DASHBOARD
//           </Link>
//         )}
//         {user && user.role === "trainer" && (
//           <Link
//             to="/trainer-dashboard"
//             className="text-base font-medium hover:underline underline-offset-4"
//             prefetch={false}
//           >
//             DASHBOARD
//           </Link>
//         )}
//         {user && user.role === "admin" && (
//           <Link
//             to="/admin-dashboard"
//             className="text-base font-medium hover:underline underline-offset-4"
//             prefetch={false}
//           >
//             DASHBOARD
//           </Link>
//         )}

//         {/* Sign out feature */}
//         {/* {user && (
//           <Button
//             className="text-base font-medium "
//             prefetch={false}
//             onClick={() => {
//               localStorage.removeItem("user");
//               localStorage.removeItem("token");
//               navigate("/signin");
//             }}
//           >
//             SIGN OUT
//           </Button>
//         )} */}
//         {!user && (
//           <Link
//             to="/signup"
//             replace
//             className="text-xl font-medium hover:underline underline-offset-4 "
//             prefetch={false}
//           >
//             <Button>SIGN UP</Button>{" "}
//           </Link>
//         )}

//         <hr className="border-l-2 border-r-2 border-blue-500 h-9" />

//         {!user && (
//           <Link
//             to="/signin"
//             replace
//             className="text-xl font-medium hover:underline underline-offset-4"
//             prefetch={false}
//           >
//             <Button> SIGN IN</Button>
//           </Link>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
// function DumbbellIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M14.4 14.4 9.6 9.6" />
//       <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
//       <path d="m21.5 21.5-1.4-1.4" />
//       <path d="M3.9 3.9 2.5 2.5" />
//       <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
//     </svg>
//   );
// }
// --------------------------------------------------------------------------------

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/FITNESS_logo.png";
// import { Button } from "@/components/ui/button";

// const Header = ({ user }) => {
//   const navigate = useNavigate();
//   return (
//     <header className="flex items-center justify-between w-full px-4 mt-1 mb-2 text-white bg-black shadow-lg lg:px-6 h-14">
//       <Link
//         to="/"
//         className="flex items-center justify-center"
//         prefetch={false}
//       >
//         <DumbbellIcon className="h-14 w-14" />
//         <img className="h-10 mt-2 ml-5" src={logo} alt="Gym Fitness" />
//         <span className="sr-only">Gym Fitness</span>
//       </Link>
//       <nav className="flex items-center gap-6">
//         <Link
//           to="/"
//           className="text-lg font-semibold transition duration-300 hover:text-blue-600"
//           prefetch={false}
//         >
//           HOME
//         </Link>
//         <Link
//           to="/about"
//           className="text-lg font-semibold transition duration-300 hover:text-blue-600"
//           prefetch={false}
//         >
//           ABOUT
//         </Link>
//         <Link
//           to="/contact"
//           className="text-lg font-semibold transition duration-300 hover:text-blue-600"
//           prefetch={false}
//         >
//           CONTACT
//         </Link>
//         {/* Conditional rendering based on user role */}
//         {user && user.role === "member" && (
//           <Link
//             to="/member-dashboard"
//             className="text-lg font-semibold transition duration-300 hover:text-blue-600"
//             prefetch={false}
//           >
//             DASHBOARD
//           </Link>
//         )}
//         {user && user.role === "trainer" && (
//           <Link
//             to="/trainer-dashboard"
//             className="text-lg font-semibold transition duration-300 hover:text-blue-600"
//             prefetch={false}
//           >
//             DASHBOARD
//           </Link>
//         )}
//         {user && user.role === "admin" && (
//           <Link
//             to="/admin-dashboard"
//             className="text-lg font-semibold transition duration-300 hover:text-blue-600"
//             prefetch={false}
//           >
//             DASHBOARD
//           </Link>
//         )}

//         {/* Sign out feature */}
//         {/* {user && (
//           <Button
//             className="text-base font-medium text-white"
//             prefetch={false}
//             onClick={() => {
//               localStorage.removeItem("user");
//               localStorage.removeItem("token");
//               navigate("/signin");
//             }}
//           >
//             SIGN OUT
//           </Button>
//         )} */}
//         {!user && (
//           <Link
//             to="/signup"
//             replace
//             className="hover:underline underline-offset-4"
//             prefetch={false}
//           >
//             <Button className="text-white transition duration-300 bg-blue-600 hover:bg-blue-700">
//               SIGN UP
//             </Button>
//           </Link>
//         )}

//         <hr className="border-l-2 border-r-2 border-blue-500 h-9" />

//         {!user && (
//           <Link
//             to="/signin"
//             replace
//             className="hover:underline underline-offset-4"
//             prefetch={false}
//           >
//             <Button className="text-white transition duration-300 bg-blue-600 hover:bg-blue-700">
//               SIGN IN
//             </Button>
//           </Link>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;

// function DumbbellIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M14.4 14.4 9.6 9.6" />
//       <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
//       <path d="m21.5 21.5-1.4-1.4" />
//       <path d="M3.9 3.9 2.5 2.5" />
//       <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
//     </svg>
//   );
// }



import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/FITNESS_logo.png";
import { Button } from "@/components/ui/button";

const Header = ({ user }) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between w-full px-4 mt-1 mb-2 text-white bg-black shadow-lg lg:px-6 h-14">
      <Link
        to="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <DumbbellIcon className="text-blue-600 h-14 w-14" />
        <img className="h-10 mt-2 ml-5" src={logo} alt="Gym Fitness" />
        <span className="sr-only">Gym Fitness</span>
      </Link>
      <nav className="flex items-center gap-6">
        {["/", "/about", "/contact"].map((path, index) => (
          <Link
            key={index}
            to={path}
            className="relative text-lg font-semibold transition duration-300 group"
            prefetch={false}
          >
            <span className="block">{path === '/' ? 'HOME' : path.slice(1).toUpperCase()}</span>
            <span className="absolute left-0 right-0 h-1 transition-transform duration-300 scale-x-0 bg-blue-600 group-hover:scale-x-100" />
          </Link>
        ))}

        {/* Conditional rendering based on user role */}
        {user && (
          <Link
            to={`/${user.role}-dashboard`}
            className="relative text-lg font-semibold transition duration-300 group"
            prefetch={false}
          >
            <span className="block">DASHBOARD</span>
            <span className="absolute left-0 right-0 h-1 transition-transform duration-300 scale-x-0 bg-blue-600 group-hover:scale-x-100" />
          </Link>
        )}

        {/* Sign out feature */}
        {/* {user && (
          <Button
            className="text-base font-medium text-white"
            prefetch={false}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            SIGN OUT
          </Button>
        )} */}
        
        {!user && (
          <Link
            to="/signup"
            replace
            className="hover:underline underline-offset-4"
            prefetch={false}
          >
            <Button className="text-white transition duration-300 bg-blue-600 hover:bg-blue-700">
              SIGN UP
            </Button>
          </Link>
        )}

        <hr className="border-l-2 border-r-2 border-blue-500 h-9" />

        {!user && (
          <Link
            to="/signin"
            replace
            className="hover:underline underline-offset-4"
            prefetch={false}
          >
            <Button className="text-white transition duration-300 bg-blue-600 hover:bg-blue-700">
              SIGN IN
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

function DumbbellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  );
}
