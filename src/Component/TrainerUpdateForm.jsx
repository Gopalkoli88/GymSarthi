import { Button } from "@/components/ui/button";
import { updateTrainerInfo } from "@/redux/trainerSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrainerSidePanel from "./TrainerSidePanel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserDetails, uploadUserPhoto } from "@/redux/userSlice";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const TrainerUpdateForm = () => {
  const { name, email, expertise, experience } = useSelector(
    (state) => state.trainer.trainerInfo
  );
  const { user } = useSelector((state) => state.user);

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newExpertise, setNewExpertise] = useState(expertise);
  const [newExperience, setNewExperience] = useState(experience);
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(user?.photoUrl || ""); // State to track image URL
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.photoUrl) {
      setImageUrl(user.photoUrl); // Update image URL when user photo changes
    }
  }, [user?.photoUrl]);

  const handleUpload = async () => {
    if (photo && user) {
      try {
        await dispatch(uploadUserPhoto({ userId: user._id, photo }));
        // Fetch the updated user details to get the new photo URL
        await dispatch(getUserDetails());
        toast.success("Photo uploaded successfully");
      } catch (err) {
        toast.error("Failed to upload photo");
      }
    }
  };
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const udpdateData = {
        name: newName,
        email: newEmail,
        expertise: newExpertise,
        experience: newExperience,
      };

      const result = await dispatch(updateTrainerInfo(udpdateData));

      if (updateTrainerInfo.fulfilled.match(result)) {
        toast.success(`Updated Trainer Info. Successfully.`);
        navigate("/trainer-dashboard")
      } else {
        throw new Error(
          result.payload?.message ||
            "An error occurred while creating the trainer."
        );
      }
    } catch (error) {
      console.log("Error from create trainer:", error.message);
      toast.error(error.message || "An error occurred");
    }
  };
  return (
    <>
      <TrainerSidePanel>
        {" "}
        <div className="flex items-center justify-center h-screen dark:bg-black">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md p-6 sm:p-8 dark:bg-[#1a1a1a] dark:text-white"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">
                Join Our Team
              </h3>
              <p className="text-sm text-muted-foreground">
                Fill out the form below to apply for a position.
              </p>
            </div>
            <div className="p-6">
              <form onSubmit={handleUpdate} className="grid gap-4">
                <div className="flex  gap-3">
                  <Input type="file" onChange={handleFileChange} />
                  <Button onClick={handleUpload}>Upload</Button>
                  {/* {error && <p>Error: {error}</p>} */}
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#2a2a2a] dark:text-white"
                    id="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#2a2a2a] dark:text-white"
                    id="email"
                    placeholder="Enter your email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    type="email"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                    htmlFor="expertise"
                  >
                    Expertise
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#2a2a2a] dark:text-white"
                    id="expertise"
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Enter your expertise"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                    htmlFor="experience"
                  >
                    Experience
                  </label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#2a2a2a] dark:text-white"
                    id="experience"
                    rows={3}
                    value={newExperience}
                    onChange={(e) => setNewExperience(e.target.value)}
                    placeholder="Enter your experience"
                    defaultValue={""}
                  />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </div>
          </div>
          <ToastContainer />
        </div>
      </TrainerSidePanel>
    </>
  );
};

export default TrainerUpdateForm;
