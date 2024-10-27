import React, { useEffect, useState } from "react";
import MemberSidePanel from "./MemberSidePanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser, uploadUserPhoto } from "@/redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "@/components/ui/label";

const MemberProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(user?.photoUrl || ""); // State to track image URL

  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
  });

  const backendUrl = "http://localhost:5000";

  useEffect(() => {
    if (user?.photoUrl) {
      setImageUrl(user.photoUrl); // Update image URL when user photo changes
    }
  }, [user?.photoUrl]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

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

  const handleSave = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you can add any save logic, e.g., making an API call to save the profile data
    console.log("Profile saved", profile);
    await dispatch(updateUser(profile));
  };

  return (
    <div>
      {/* <div className="w-full max-w-md mx-auto bg-blue-400 border border-blue-600 rounded-lg shadow-sm"> */}
      <div className="w-full max-w-md mx-auto h-auto bg-blue-400 border border-blue-600 rounded-lg shadow-sm text-card-foreground transform transition-transform duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md">
        <div className="flex flex-col space-y-1.5 p-6 bg-black text-white py-6 px-8 rounded-t-lg">
          <div className="  items-center gap-4">
            <div>
              <div>
                {isEditing ? (
                  <div className="flex gap-3 mb-2">
                    <Input type="file" onChange={handleFileChange} />
                    <Button
                      onClick={handleUpload}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Uploading..." : "Upload Photo"}
                    </Button>
                    {/* {error && <p>Error: {error}</p>} */}
                  </div>
                ) : (
                  <div>
                    {imageUrl ? (
                      <img
                        src={`${imageUrl}`}
                        alt="user"
                        className="object-cover w-32 h-32 rounded-full  border-slate-50"
                      />
                    ) : (
                      <p>No photo uploaded</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mt-5">
                <Label htmlFor="name" className="">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-2"
                />
              </div>
              <div className="mt-5">
                <Label htmlFor="email" className="mt-5">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 p-8">
          <div className="flex justify-end">
            {isEditing ? (
              <div className="flex gap-4">
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={() => setIsEditing(!isEditing)}>Cancel</Button>
              </div>
            ) : (
              <Button onClick={toggleEdit}>Edit</Button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default MemberProfile;
