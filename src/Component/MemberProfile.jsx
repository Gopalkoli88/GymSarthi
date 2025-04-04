
import React, { useEffect, useState } from "react";
import MemberSidePanel from "./MemberSidePanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser, uploadUserPhoto } from "@/redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "@/components/ui/label";
import ScanQr from "./ScanQr";
import MyComponent from "./MyComponent"; // Import the MyComponent file
import AttendanceCalendar from "./AttendanceCalendar";

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
    console.log("Profile saved", profile);
    await dispatch(updateUser(profile));
  };
  
  return (
    

<div className="flex items-start justify-start min-h-screen p-6 bg-white mt-[-70px]">
  <div className="w-full max-w-4xl ml-12 space-y-6">
    <header className="w-full">
      <h1 className="text-3xl font-semibold text-black dark:text-white">
        Member Profile
      </h1>
      <p className="mt-1 text-black dark:text-gray-400">
        Detailed information about the gym member.
      </p>
    </header>

    <Card className="p-6 border border-gray-700 shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl">


      <CardContent>
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          <div className="relative flex flex-col items-center">
            {isEditing ? (
              <div className="flex flex-col items-center gap-3 ">
                <Input type="file" onChange={handleFileChange} className="cursor-pointer " />
                <Button
                  onClick={handleUpload}
                  disabled={status === 'loading'}
                  className="text-white transition-colors bg-gray-700 hover:bg-gray-600"
                >
                  {status === 'loading' ? 'Uploading...' : 'Upload Photo'}
                </Button>
              </div>
            ) : (
              <div className="w-24 h-24 overflow-hidden border-4 border-purple-500 rounded-full shadow-md sm:w-32 sm:h-32">
                {imageUrl ? (
                  <img src={imageUrl} alt="user" className="object-cover w-full h-full" />
                ) : (
                  <p className="text-xs text-center text-gray-300 sm:text-sm">No photo uploaded</p>
                )}
              </div>
            )}
          </div>

          <div className="grid flex-1 w-full grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Name
              </Label>
              <Input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 mt-2 text-white bg-gray-800 border-gray-600 rounded-lg focus:ring-purple-500"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 mt-2 text-white bg-gray-800 border-gray-600 rounded-lg focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col justify-center gap-4 sm:flex-row sm:justify-end">
        {isEditing ? (
          <>
            <Button onClick={handleSave} className="px-6 py-2 text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105">
              Save
            </Button>
            <Button onClick={() => setIsEditing(!isEditing)} className="px-6 py-2 text-white transition-colors bg-gray-700 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={toggleEdit} className="px-6 py-2 text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105">
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  </div>
</div>

  );
};

export default MemberProfile;
