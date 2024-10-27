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

const MemberDashboard = () => {
  const { user, trainer, status, error, plan, payments, tasks } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
        dispatch(fetchUserPaymentInfo());
      dispatch(fetchUserTasksInfo());
    }
  }, [dispatch, navigate, user]);

  if (status == "failed") {
    toast.error(error);
  }

  return (
    <>
      <MemberSidePanel>
       
      </MemberSidePanel>
    </>
  );
};

export default MemberDashboard;
