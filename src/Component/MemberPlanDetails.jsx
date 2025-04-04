import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPlanInfo } from "@/redux/userSlice";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import MemberSidePanel from "./MemberSidePanel";
import { Card } from "@/components/ui/card";

const MemberPlanDetails = () => {
  const { user, status, error, plans } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      dispatch(fetchUserPlanInfo());
    }
  }, [dispatch, navigate, user]);

  if (status === "failed") {
    toast.error(error);
  }

  return (
    <MemberSidePanel>
      <div className="flex items-start justify-start min-h-screen p-6 bg-white mt-[-70px]">
        <div className="w-full max-w-4xl ml-12 space-y-6">
          <header className="w-full">
            <h1 className="text-3xl font-semibold text-black dark:text-white">
              My Plan Details
            </h1>
            <p className="mt-1 text-black dark:text-gray-400">
              Review your current plan and manage your subscription.
            </p>
          </header>

          <div className="space-y-8">
  {plans && plans.length > 0 ? (
    plans.map((plan) => (
      <div
        key={plan._id}
        className="p-6 transition-all bg-gray-900 border border-gray-700 rounded-lg shadow-md hover:shadow-lg hover:border-gray-600"
      >
        <div className="grid grid-cols-1 gap-4 text-gray-100 sm:grid-cols-2 sm:gap-6">
          {/* Plan Name and Description */}
          <div>
            <div className="text-xl font-semibold">{plan.name}</div>
            <div className="mt-2 text-sm text-gray-400">
              {plan.description}
            </div>
          </div>

          {/* Plan Price */}
          <div>
            <div className="text-xl font-semibold">Price</div>
            <div className="mt-2 text-sm text-gray-400">${plan.price}</div>
          </div>

          {/* Plan Duration */}
          <div>
            <div className="text-xl font-semibold">Duration</div>
            <div className="mt-2 text-sm text-gray-400">{plan.duration}</div>
          </div>

          {/* Trainer Name */}
          <div>
            <div className="text-xl font-semibold">Trainer</div>
            <div className="mt-2 text-sm text-gray-400">
              {plan.trainerId?.name || "N/A"}
            </div>
          </div>

          {/* Trainer's Email */}
          <div>
            <div className="text-xl font-semibold">Trainer's Email</div>
            <div className="mt-2 text-sm text-gray-400">
              {plan.trainerId?.email || "N/A"}
            </div>
          </div>

          {/* Plan Status */}
          <div>
            <div className="text-xl font-semibold">Status</div>
            <div className="mt-2 text-sm text-gray-400">{plan.status}</div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="p-6 text-center text-gray-400 bg-gray-900 border border-gray-700 rounded-lg">
      No Plan Available
    </div>
  )}
</div>
        </div>
      </div>
    </MemberSidePanel>
  );
};

export default MemberPlanDetails;
