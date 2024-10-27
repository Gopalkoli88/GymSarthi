import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
// import Homepage from "./pages/Homepage";
import Signin from "./Component/Signin";
import AdminDasboard from "./Component/AdminDasboard";
import MemberDashboard from "./Component/MemberDashboard";
import TrainerDashboard from "./Component/TrainerDashboard";
import Profile from "./Component/Profile";
import { useSelector } from "react-redux";
import AuthLayout from "./Component/AuthLayout";
import { useEffect, useState } from "react";
import TaskForm from "./Component/TaskForm";
import PlanDetails from "./Component/PlanDetails";
import { PlanDetailsComp } from "./components/component/plan-details";
import TrainerUpdateForm from "./Component/TrainerUpdateForm";
import UserManagement from "./Component/UserManagement";
import PlanManagement from "./Component/PlanManagement";
import TrainerManagement from "./Component/TrainerManagement";
import PaymentLis from "./Component/PaymentLis";
import PurchasePlan from "./Component/PurchasePlan";
import { SignUpTwo } from "./Component/Signup";
import MemberPlanDetails from "./Component/MemberPlanDetails";
import MemberDashboardNew from "./Component/MemberDashboardNew";
import MemberTrainerProfile from "./Component/MemberTrainerProfile";
import MemberDailyTasks from "./Component/MemberDailyTasks";
import MemberPaymentHistory from "./Component/MemberPaymentHistory";
import MemberProfile from "./Component/MemberProfile";
import TrainerPlans from "./Component/TrainerPlans";
import AboutAs from "./pages/AboutPage";
import ContactUsmain from "./pages/Contact";
import HomePageComp from "./pages/HomePageNew";
import MembershipGrowthChart from "./Component/MembershipGrowthChart";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(0);
  return (
    <Routes>
      <Route path="/" element={<HomePageComp />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUpTwo />} />
      <Route path="/about" element={<AboutAs />} />
      <Route path="/contact" element={<ContactUsmain />} />
      <Route element={<AuthLayout />}>
        <Route path="/admin-dashboard" element={<AdminDasboard />} />
        <Route path="/member-dashboard" element={<MemberDashboardNew />} />
        <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/task-form/:id" element={<TaskForm />} />
        <Route path="/plan-details/:id" element={<PlanDetailsComp />} />
        <Route path="/update-details" element={<TrainerUpdateForm />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/plan-management" element={<PlanManagement />} />
        <Route path="/trainer-management" element={<TrainerManagement />} />
        <Route path="/paymentlist" element={<PaymentLis />} />
        <Route path="/purchase-plan/:id" element={<PurchasePlan />} />
        <Route
          path="/member-dashboard/plan-details"
          element={<MemberPlanDetails />}
        />
        <Route
          path="/member-dashboard/trainer-profile"
          element={<MemberTrainerProfile />}
        />
        <Route
          path="/member-dashboard/daily-tasks"
          element={<MemberDailyTasks />}
        />
        <Route
          path="/member-dashboard/payment-history"
          element={<MemberPaymentHistory />}
        />

        <Route path="/trainer-dashboard/my-plans" element={<TrainerPlans />} />
      

        <Route path="/homepage" element={<HomePageComp />} />

        <Route path="/membership-growth" element={<MembershipGrowthChart />} />
      </Route>
    </Routes>
  );
};

export default App;
