import { getallPlansofTrainer, getTrainerInfo } from "@/redux/trainerSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TrainerSidePanel from "./TrainerSidePanel";
import TrainerProfile from "./TrainerProfile";

const TrainerDashboard = () => {
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
    <>
      <div>
        <TrainerSidePanel>
          <TrainerProfile />
        </TrainerSidePanel>
      </div>
    </>
  );
};

export default TrainerDashboard;
