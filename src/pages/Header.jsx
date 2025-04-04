import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/FITNESS_logo2.png";
import { Button } from "@/components/ui/button";

const Header = ({ user }) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between w-full px-4 mb-2 text-white bg-[#06090E] shadow-lg lg:px-6 h-16">
      <Link
        to="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        {/* <DumbbellIcon className="text-blue-600 h-14 w-14" /> */}
        <img className="p-2 mt-3 h-28 rotate-12  ml-5" src={logo} alt="Gym Fitness" />
        <span className="sr-only">Gym Fitness</span>
      </Link>
      <nav className="flex items-center gap-6 md:gap-10 lg:gap-12">
        {["/", "/about", "/contact"].map((path, index) => (
          <Link
            key={index}
            to={path}
            className="relative text-lg transition duration-300 group"
            prefetch={false}
          >
            <span className="block">
              {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
            </span>
            <span className="absolute left-0 right-0 h-0.5 transition-transform duration-300 scale-x-0 bg-blue-600 group-hover:scale-x-100" />
          </Link>
        ))}

        {/* Conditional rendering based on user role */}
        {user && (
          <Link
            to={`/${user.role}-dashboard`}
            className="relative text-lg transition duration-300 group"
            prefetch={false}
          >
            <span className="block">DASHBOARD</span>
            <span className="absolute left-0 right-0 h-0.5 transition-transform duration-300 scale-x-0 bg-blue-600 group-hover:scale-x-100" />
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

        <hr className="hidden border-l-2 border-r-2 border-blue-500 h-9 lg:block" />

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
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />{" "}
    </svg>
  );
}
