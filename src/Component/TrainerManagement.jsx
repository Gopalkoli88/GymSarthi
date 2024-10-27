import React, { useEffect } from "react";
import AdminSidePanel from "./AdminSidePanel";
import { TrainerListComp } from "@/components/component/trainer-list-comp";
import { useDispatch } from "react-redux";
import { getAllTrainers } from "@/redux/adminSlice";
import { CreateTrainerComp } from "@/components/component/create-trainer-comp";

const TrainerManagement = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTrainers());
  }, [dispatch]);
  return (
    <div>
      <AdminSidePanel>
        <div>
          <CreateTrainerComp />
          <TrainerListComp />
        </div>
      </AdminSidePanel>
    </div>
  );
};

export default TrainerManagement;
