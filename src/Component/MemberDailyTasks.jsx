import React, { useEffect } from "react";
import MemberSidePanel from "./MemberSidePanel";
import { DailyTaskComp } from "@/components/component/daily-task-comp";
import { fetchUserTasksInfo } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MemberDailyTasks = () => {
  const { user, trainer, status, error, plan, payments, tasks } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
        dispatch(fetchUserTasksInfo());
    }
  }, [dispatch, navigate, user]);
  return (
    <div>
      <MemberSidePanel>
        <DailyTaskComp />
      </MemberSidePanel>
    </div>
  );
};

export default MemberDailyTasks;
