import React from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/michael-dam-mEZ3PoFGs_k-unsplash (1).jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUserPaymentInfo,
  fetchUserPlanInfo,
  fetchUserTasksInfo,
  fetchUserTrainerInfo,
} from "@/redux/userSlice";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import MemberSidePanel from "./MemberSidePanel";
import { Card } from "@/components/ui/card";

const MemberPlanDetails = () => {
  const { user, trainer, status, error, plans, payments, tasks } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      dispatch(fetchUserPlanInfo());
    }
  }, [dispatch, navigate, user]);

  if (status == "failed") {
    toast.error(error);
  }

  return (
    <>
    <div>
      <MemberSidePanel>
        {" "}
        {/* <div className="flex flex-col space-y-1.5 "> */}
        <div className="grid gap-8">

        <div
            className="h-auto bg-blue-400 border border-blue-600 rounded-lg shadow-sm text-card-foreground transform transition-transform duration-300 ease-in-out     hover:shadow-md"
            data-v0-t="card"
          >
                        <div className="flex flex-col space-y-1.5 p-6 bg-blue-400 rounded-t-lg">

          {/* <h3 className="whitespace-nowrap tracking-tight text-white text-3xl font-bold"> */}
          <h3 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">

            Plan Details
          </h3>
          <p className="text-[#b3b3b3] text-xl">
            Review your current plan and manage your subscription.
          </p>
        </div>
        {plans &&
          plans.length > 0 ?
          plans.map((plan) => (
            <>
              <Card className="h-auto bg-blue-400 border m-4 border-blue-600 rounded-lg shadow-sm text-card-foreground transform transition-transform duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md p-4">
                {" "}
                <div className="grid grid-cols-3  gap-4 items-center justify-center p-2 ">
                  <div className="grid gap-1">
                    <div className="text-lg font-bold text-white">
                      Fitness House Premium
                    </div>
                    <div className="text-sm font-medium text-[#b3b3b3]">
                      {plan.name}
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-lg font-bold text-white">
                      Description
                    </div>
                    <div className="text-sm font-medium text-[#b3b3b3]">
                      {plan.description}
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-lg font-bold text-white">Price</div>
                    <div className="text-sm font-medium text-[#b3b3b3]">
                      $ {plan.price}
                    </div>
                  </div>
                  <div className="grid gap-1 mt-3">
                    <div className="text-lg font-bold text-white">Duration</div>
                    <div className="text-sm font-medium text-[#b3b3b3]">
                      {plan.duration}
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-lg font-bold text-white">Trainer</div>
                    <div className="text-sm font-medium text-[#b3b3b3]">
                      {plan.trainerId.name}
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-lg font-bold text-white">Trainer's Email</div>
                    <div className="text-sm font-medium text-[#b3b3b3]">
                      {plan.trainerId.email}
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-lg font-bold text-white">Status</div>
                    <div className="text-sm font-medium text-[#b3b3b3]">
                      {plan.status}
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )) : <div>
          <Button className="m-2">No Plan</Button>
          </div>
            }
            </div>
            </div>
      </MemberSidePanel>
      </div>
    </>
  );
};

export default MemberPlanDetails;
