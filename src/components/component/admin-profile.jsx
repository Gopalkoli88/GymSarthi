import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminInfo,
  getPurchasedAndNonPurchased,
  updateAdminInfo,
} from "@/redux/adminSlice";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserDetails, updateUser, uploadUserPhoto } from "@/redux/userSlice";

export const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, error } = useSelector((state) => state.user);
  const { adminInfo } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user) {
      dispatch(getAdminInfo());
    } else {
      navigate("/signin");
    }
  }, [dispatch, user, navigate]);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [ownerInformation, setOwnerInformation] = useState("");
  const [achievements, setAchievements] = useState("");
  const [experience, setExperience] = useState("");
  const [sponsors, setSponsors] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false); // State to track changes
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(user?.photoUrl || ""); // State to track image URL

  useEffect(() => {
    if (adminInfo) {
      setNewName(adminInfo.name || "");
      setNewEmail(adminInfo.email || "");
      setContact(adminInfo.contact || "");
      setGymAddress(adminInfo.gymAddress || "");
      setOwnerInformation(adminInfo.ownerInformation || "");
      setAchievements(adminInfo.achievements || "");
      setExperience(adminInfo.experience || "");
      setSponsors(adminInfo.sponsors || "");
    }
  }, [adminInfo]);

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

  // photo upload :

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // const handleUpload = async () => {
  //   if (photo && user) {
  //     try {
  //       await dispatch(uploadUserPhoto({ userId: user._id, photo }));
  //       // Fetch the updated user details to get the new photo URL
  //       await dispatch(getUserDetails());
  //       toast.success("Photo uploaded successfully");
  //     } catch (err) {
  //       toast.error("Failed to upload photo");
  //     }
  //   }
  // };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (photo && user) {
      try {
        await dispatch(uploadUserPhoto({ userId: user._id, photo }));
        // Fetch the updated user details to get the new photo URL
        await dispatch(getUserDetails());
        toast.success("Photo uploaded successfully");
        setIsEditMode(false);
      } catch (err) {
        toast.error("Failed to upload photo");
      }
    }

    if (!isDirty) return; // Do nothing if no changes
   

    setIsEditMode(false);
    try {
      const adminData = {
        name: newName,
        email: newEmail,
        contact,
        gymAddress,
        ownerInformation,
        achievements,
        experience,
        sponsors,
      };
      

      await dispatch(updateAdminInfo(adminData));

      // Upload photo if exists
      //  if (photo) {
      //   await handleUpload();
      // }
      toast.success("Admin Info Successfully updated");
    } catch (error) {
      toast.error("Something went wrong during the update");
    }
  };

  const backendUrl = "http://localhost:5000";

  if (!adminInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex min-h-screen w-full dark:bg-background dark:text-foreground">
      <div className="flex flex-col sm:gap-4 sm:py-4 w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b  bg-background dark:bg-background dark:border-muted px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                {/* Add your MenuIcon here */}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="#" prefetch={false}>
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Admin Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="grid lg:col-span-2 xl:col-span-3 gap-4">
            <Card className="dark:bg-muted dark:text-foreground">
              <CardHeader>
                <CardTitle>Admin Profile</CardTitle>
                <CardDescription>
                  Detailed information about the gym admin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      {isEditMode ? (
                        <div>
                          <Input type="file" onChange={handleFileChange} />
                          {/* <Button
                            onClick={handleUpload}
                            disabled={status === "loading"}
                          >
                            {status === "loading"
                              ? "Uploading..."
                              : "Upload Photo"}
                          </Button> */}
                          {error && <p>Error: {error}</p>}
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        type="tel"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                          handleFieldChange();
                        }}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Gym Address</Label>
                      <Textarea
                        id="address"
                        value={gymAddress}
                        onChange={(e) => {
                          setGymAddress(e.target.value);
                          handleFieldChange();
                        }}
                        className="min-h-[100px]"
                        disabled={!isEditMode}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="owner">Owner Information</Label>
                      <Textarea
                        id="owner"
                        value={ownerInformation}
                        onChange={(e) => {
                          setOwnerInformation(e.target.value);
                          handleFieldChange();
                        }}
                        className="min-h-[100px]"
                        disabled={!isEditMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="achievements">Achievements</Label>
                      <Textarea
                        id="achievements"
                        value={achievements}
                        onChange={(e) => {
                          setAchievements(e.target.value);
                          handleFieldChange();
                        }}
                        className="min-h-[100px]"
                        disabled={!isEditMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      <Textarea
                        id="experience"
                        value={experience}
                        onChange={(e) => {
                          setExperience(e.target.value);
                          handleFieldChange();
                        }}
                        className="min-h-[100px]"
                        disabled={!isEditMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sponsors">Sponsors</Label>
                      <Textarea
                        id="sponsors"
                        value={sponsors}
                        onChange={(e) => {
                          setSponsors(e.target.value);
                          handleFieldChange();
                        }}
                        className="min-h-[100px]"
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
    </div>
  );
};

export default AdminProfile;

function BarChartIcon(props) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function ClipboardIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function CreditCardIcon(props) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

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

function LayoutDashboardIcon(props) {
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
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
