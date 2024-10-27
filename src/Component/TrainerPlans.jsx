import { getallPlansofTrainer, getTrainerInfo } from "@/redux/trainerSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TrainerSidePanel from "./TrainerSidePanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TrainerPlans = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { plans } = useSelector((state) => state.trainer);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      dispatch(getTrainerInfo());
      dispatch(getallPlansofTrainer());
    }
  }, [dispatch, user]);
  return (
    <TrainerSidePanel>
      {" "}
      <div
            className="h-auto bg-blue-400 border border-blue-600 rounded-lg shadow-sm text-card-foreground border-opacity-50 "
            x-chunk="dashboard-05-chunk-1"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-black whitespace-nowrap">
            My Plans
          </h3>
          <p className="text-sm max-w-lg text-balance leading-relaxed text-[#999]">
            View and manage the plans you are responsible for.
          </p>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {plans.map((plan) => (
              <>
                <Card className="grid grid-cols-[1fr_auto] items-center gap-4 p-5 border-opacity-20">
                  <div>
                    <div className="font-medium text-black">{plan.name}</div>
                    <div className="text-sm text-[#999]">
                      {plan.users.length} members, {plan.duration}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      className="w-1/2 p-2"
                      onClick={() => {
                        navigate(`/task-form/${plan._id}`);
                      }}
                    >
                      Add Task
                    </Button>
                    <Button
                      className="w-1/2 p-2"
                      onClick={() => {
                        navigate(`/plan-details/${plan._id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              </>
            ))}

            {/* <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div>
          <div className="font-medium text-black">
            Yoga for Beginners
          </div>
          <div className="text-sm text-[#999]">
            15 members, 8 weeks
          </div>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-9 rounded-md px-3 bg-[#333] text-white">
          View Details
        </button>
      </div>
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div>
          <div className="font-medium text-black">
            Nutrition Coaching
          </div>
          <div className="text-sm text-[#999]">
            20 members, 6 months
          </div>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-9 rounded-md px-3 bg-[#333] text-white">
          View Details
        </button>
      </div> */}
          </div>
        </div>
      </div>
    </TrainerSidePanel>
  );
};

export default TrainerPlans;
