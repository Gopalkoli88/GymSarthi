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
 

  // return (
  //   <TrainerSidePanel>
  //         {/* <h3 className="mb-3 text-2xl font-bold tracking-tight text-gray-100">
  //           My Plans
  //         </h3>
  //         <p className="mb-6 text-sm text-gray-400">
  //           View and manage the plans you are responsible for.
  //         </p> */}
  //       <div className="flex items-start justify-start min-h-screen p-6 bg-white mt-[-70px]">
  //       <div className="w-full max-w-4xl ml-12 space-y-6">
  //         <header className="w-full">
  //           <h1 className="text-3xl font-semibold text-black dark:text-white">
  //           My Plans
  //           </h1>
  //           <p className="mt-1 text-black dark:text-gray-400">
  //           View and manage the plans you are responsible for.
  //           </p>
  //         </header>


  //         <div className="space-y-4">
  //           {plans.map((plan) => (
  //             <div
  //               key={plan._id}
  //               className="p-6 transition-all bg-gray-900 border border-gray-700 rounded-lg shadow-md "
  //             >
  //               <div className="flex items-center justify-between">
  //                 <div>
  //                   <div className="text-lg font-semibold text-gray-100">
  //                     {plan.name}
  //                   </div>
  //                   <div className="text-sm text-gray-400">
  //                     {plan.users.length} members, {plan.duration}
  //                   </div>
  //                 </div>
  //                 <div className="flex gap-3">
  //                   <Button
  //                     className="px-4 py-2 text-sm font-medium text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
  //                     onClick={() => navigate(`/task-form/${plan._id}`)}
  //                   >
  //                     Add Task
  //                   </Button>
  //                   <Button
  //                     className="px-4 py-2 text-sm font-medium text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
  //                     onClick={() => navigate(`/plan-details/${plan._id}`)}
  //                   >
  //                     View Details
  //                   </Button>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //         </div>
  //         </div>
        
     
  //   </TrainerSidePanel>
  // );
  return (
    <TrainerSidePanel>
      <div className="flex items-start justify-start min-h-screen p-6 bg-white mt-[-70px]">
        <div className="w-full max-w-4xl ml-12 space-y-6">
          <header className="w-full">
            <h1 className="text-3xl font-semibold text-black dark:text-white">
              My Plans
            </h1>
            <p className="mt-1 text-black dark:text-gray-400">
              View and manage the plans you are responsible for.
            </p>
          </header>
  
          {plans.length > 0 ? (
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="p-6 transition-all bg-gray-900 border border-gray-700 rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-gray-100">
                        {plan.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {plan.users.length} members, {plan.duration}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="px-4 py-2 text-sm font-medium text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
                        onClick={() => navigate(`/task-form/${plan._id}`)}
                      >
                        Add Task
                      </Button>
                      <Button
                        className="px-4 py-2 text-sm font-medium text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
                        onClick={() => navigate(`/plan-details/${plan._id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No Plans Purchased UI
            <div className="p-6 text-center text-gray-400 bg-gray-900 border border-gray-700 rounded-lg">
            No Trainer Plan Available
          </div>
          )}
        </div>
      </div>
    </TrainerSidePanel>
  );
  
};

export default TrainerPlans;