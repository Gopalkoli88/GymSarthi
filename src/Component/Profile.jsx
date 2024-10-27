import { Button } from "@/components/ui/button";
import { updateUser } from "@/redux/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const Profile = () => {
  const { email, name, role } = useSelector((state) => state.user.user);
  const [newEmail, setNewEmail] = useState(email);
  const [newName, setNewName] = useState(name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ email: newEmail, name: newName }));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const gotoDashboard = () => {
    if (role == "member") {
      navigate("/member-dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <header className="bg-background shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#" rel="ugc">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg>
            </a>
            <h1 className="text-xl font-bold">GYM House</h1>
          </div>
          <Button onClick={gotoDashboard}>Dashboard</Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Member Profile
            </h3>
            <p className="text-sm text-muted-foreground">
              View and edit your personal information, fitness goals, and
              progress.
            </p>
          </div>
          <form onSubmit={handleUpdate} className="p-6 grid gap-6">
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <Button type="submit">Update</Button>
          </form>
          <ToastContainer />
        </div>
      </main>
      <footer className="bg-background text-center py-4">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground">
            &copy; 2023 Gym Management. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
