import {
  getallPlansofTrainer,
  getTrainerInfo,
  updateTrainerInfo,
} from "@/redux/trainerSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TrainerSidePanel from "./TrainerSidePanel";
import { Button } from "@/components/ui/button";
import { getUserDetails, uploadUserPhoto } from "@/redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TrainerProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { plans, trainerInfo } = useSelector((state) => state.trainer);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      dispatch(getTrainerInfo());
      dispatch(getallPlansofTrainer());
    }
  }, [dispatch, user, navigate]);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false); // State to track changes
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(user?.photoUrl || "");

  useEffect(() => {
    if (trainerInfo) {
      setNewName(trainerInfo.name || "");
      setNewEmail(trainerInfo.email || "");
      setExpertise(trainerInfo.expertise || "");
      setExperience(trainerInfo.experience || "");
    }
  }, [trainerInfo]);

  useEffect(() => {
    if (user?.photoUrl) {
      setImageUrl(user.photoUrl); // Update image URL when user photo changes
    }
  }, [user?.photoUrl]);

  const handleFieldChange = () => {
    setIsDirty(true); // Mark form as dirty when any field changes
  };

  const handleEditButton = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancelButton = () => {
    setIsDirty(false);
    setIsEditMode(false);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    handleUpload();

    if (!isDirty) {
      setIsEditMode(false);
      return;
    } // Do nothing if no changes
    setIsEditMode(false);
    try {
      const trainerData = {
        name: newName,
        email: newEmail,
        expertise,
        experience,
      };

      await dispatch(updateTrainerInfo(trainerData));

      // Upload photo if exists
      //  if (photo) {
      //   await handleUpload();
      // }
      toast.success("Admin Info Successfully updated");
    } catch (error) {
      toast.error("Something went wrong during the update");
    }
  };

  if (!trainerInfo) {
    return <Button>Trainer No data...</Button>;
  }

  const backendUrl = "http://localhost:5000";

  return (
    <div>
      {/* <div
        className="h-auto bg-blue-400 border border-blue-600 rounded-lg shadow-sm text-card-foreground"
        x-chunk="dashboard-05-chunk-0"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-black whitespace-nowrap">
            Your Profile
          </h3>
          <p className="text-sm max-w-lg text-balance leading-relaxed text-[#999]">
            View and manage your personal information as a trainer.
          </p>
        </div>
        {/* <div className="p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <div className="font-medium text-black">Name:</div>
              <div className="text-black">{trainerInfo.name}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <div className="font-medium text-black">Email:</div>
              <div className="text-black">{trainerInfo.email}</div>
            </div>

            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <div className="font-medium text-black">Expertise:</div>
              <div className="text-black">{trainerInfo.expertise}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <div className="font-medium text-black">Experience:</div>
              <div className="text-black">{trainerInfo.experience} years</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
              <div className="font-medium text-black">Salary:</div>
              <div className="text-black">$ {trainerInfo.salary} </div>
            </div>
          </div>
        </div>
        <div className="flex items-center p-6">
          <Button onClick={() => navigate("/update-details")}>
            Update Profile
          </Button>
        </div> */}

      {/* </div> */}

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid lg:col-span-2 xl:col-span-3 gap-4">
          <Card className="dark:bg-muted dark:text-foreground">
            <CardHeader>
              <CardTitle> Profile</CardTitle>
              <CardDescription>
                Detailed information about the gym trainer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    {isEditMode ? (
                      <div className="flex gap-4">
                        <Input type="file" onChange={handleFileChange} />
                        {/* <Button
                          onClick={handleUpload}
                          disabled={status === "loading"}
                        >
                          {status === "loading"
                            ? "Uploading..."
                            : "Upload Photo"}
                        </Button> */}
                        {/* {error && <p>Error: {error}</p>} */}
                      </div>
                    ) : (
                      <div>
                        {imageUrl ? (
                          <img
                            src={`${imageUrl}`}
                            alt="user"
                            className="w-32 h-32 object-cover rounded-full"
                          />
                        ) : (
                          <p>No photo uploaded</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={newName}
                      onChange={(e) => {
                        setNewName(e.target.value);
                        handleFieldChange();
                      }}
                      disabled={!isEditMode}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                        handleFieldChange();
                      }}
                      disabled={!isEditMode}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact">Expertise</Label>
                    <Input
                      id="contact"
                      type="tel"
                      value={expertise}
                      onChange={(e) => {
                        setExpertise(e.target.value);
                        handleFieldChange();
                      }}
                      className="mt-2"
                      disabled={!isEditMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Experience</Label>
                    <Textarea
                      id="address"
                      value={experience}
                      onChange={(e) => {
                        setExperience(e.target.value);
                        handleFieldChange();
                      }}
                      className="min-h-[100px] mt-2"
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {isEditMode ? (
                <div className="flex gap-6">
                  {" "}
                  <Button className="  h-10" onClick={handleUpdate}>
                    Save Changes
                  </Button>
                  <Button className="w-24  h-10" onClick={handleCancelButton}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button className="w-24  h-10" onClick={handleEditButton}>
                  Edit
                </Button>
              )}
            </CardFooter>
            <ToastContainer />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TrainerProfile;
