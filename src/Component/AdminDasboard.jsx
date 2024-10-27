import { AdminProfile } from "@/components/component/admin-profile";
import AdminSidePanel from "./AdminSidePanel";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAdminInfo } from "@/redux/adminSlice";

const AdminDasboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminInfo());
  }, [dispatch]);
  return (
    <div>
      <AdminSidePanel>
        <AdminProfile />
      </AdminSidePanel>
    </div>
  );
};

export default AdminDasboard;
