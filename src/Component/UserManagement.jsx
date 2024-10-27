import { UserManagementComp } from "@/components/component/user-management";
import React from "react";
import AdminSidePanel from "./AdminSidePanel";

const UserManagement = () => {
  return (
    <div>
      <AdminSidePanel>
        <UserManagementComp />
      </AdminSidePanel>
    </div>
  );
};

export default UserManagement;
