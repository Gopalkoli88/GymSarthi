import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/FITNESS_logo.png";
import { Button } from "@/components/ui/button";

export const logoutFuncationality = () => {};

const Header = ({ user }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-background w-full  px-4 lg:px-6 h-14 flex items-center shadow-sm mt-2 mb-2">
      <Link
        to="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <DumbbellIcon className="h-14 w-14" />
        <img className="mt-2 ml-5 h-10" src={logo} alt="Gym Fitness" />
        <span className="sr-only">Gym Fitness</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {!user && (
          <Link
            to="/signup"
            replace
            className="text-xl font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Sign Up
          </Link>
        )}

        {!user && (
          <Link
            to="/signin"
            replace
            className="text-xl font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Sign In
          </Link>
        )}
        <Link
          to="/"
          className="text-xl font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-xl font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-xl font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Contact
        </Link>
        {/* Conditional rendering based on user role */}
        {user && user.role === "member" && (
          <Link
            to="/member-dashboard"
            className="text-xl font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Dashboard
          </Link>
        )}
        {user && user.role === "trainer" && (
          <Link
            to="/trainer-dashboard"
            className="text-xl font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Trainer Dashboard
          </Link>
        )}
        {user && user.role === "admin" && (
          <Link
            to="/admin-dashboard"
            className="text-xl font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Admin Dashboard
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
