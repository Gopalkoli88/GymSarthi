import AdminProfile from "@/components/component/admin-profile";
import AdminSidePanel from "./AdminSidePanel";
import { CreatePlanComp } from "@/components/component/create-plan-comp";
import { PlanListComp } from "@/components/component/plan-list-comp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPlans, getAllTrainers } from "@/redux/adminSlice";

const PlanManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTrainers());

    // after deleting i wnat again new plan list :
    dispatch(getAllPlans());
  }, [dispatch]);

  return (
    <div >
      <AdminSidePanel>
        <CreatePlanComp />
        <PlanListComp />
      </AdminSidePanel>
    </div>
  );
};

export default PlanManagement;
