import React, { useEffect } from "react";
import MemberSidePanel from "./MemberSidePanel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserTrainerInfo } from "@/redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";

const MemberTrainerProfile = () => {
  const { trainers, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      dispatch(fetchUserTrainerInfo());
    }
  }, [dispatch, navigate, user]);

  if (trainers.length === 0) {
    <Button>No Trainers...</Button>;
  }

  const backendUrl = "http://localhost:5000";
  return (
    <div>
      <MemberSidePanel>
        <div className="grid gap-8">
          {/* <div
            className="h-auto bg-blue-400 border border-blue-600 rounded-lg shadow-sm text-card-foreground"
            data-v0-t="card"
          > */}
          {/* <div
            className="w-full max-w-md mx-auto h-auto bg-blue-400 border border-blue-600 rounded-lg shadow-sm text-card-foreground transform transition-transform duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md"
            data-v0-t="card"
          > */}

          <div
            className="h-auto bg-blue-400 border border-blue-600 rounded-lg shadow-sm text-card-foreground transform transition-transform duration-300 ease-in-out  hover:shadow-md"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6 bg-blue-400 rounded-t-lg">
              <h3 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">
                Trainer Profile
              </h3>
              <p className="text-[#b3b3b3] text-xl">
                Get in touch with your personal trainer.
              </p>
            </div>

            {trainers && trainers.length > 0 ? (
              trainers.map((trainer) => (
                <>
                  <div className="grid gap-4 p-6  bg-blue-400 border m-4 border-blue-600 rounded-lg shadow-sm text-card-foreground transform transition-transform duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md p-4 ">
                    <div className="flex items-center gap-4">
                      <img
                        src={`${trainer.photoUrl}`}
                        width={64}
                        height={64}
                        alt="Trainer Avatar"
                        className="rounded-full"
                        style={{ aspectRatio: "64 / 64", objectFit: "cover" }}
                      />
                      <div>
                        <div className="text-lg font-bold text-white">
                          {trainer && trainer.name.toUpperCase()}
                        </div>
                        <div className="text-sm text-[#b3b3b3]">
                          Certified Personal Trainer
                        </div>
                        <div className="text-sm text-[#b3b3b3]">
                          Expertise: {trainer && trainer.expertise}
                        </div>
                        <div className="text-sm text-[#b3b3b3]">
                          Experience: {trainer && trainer.experience}
                        </div>
                        <div className="text-sm text-[#b3b3b3]" />
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <Button className="m-2">No Trainer</Button>
 )}
          </div>
        </div>
      </MemberSidePanel>
    </div>
  );
};

export default MemberTrainerProfile;
