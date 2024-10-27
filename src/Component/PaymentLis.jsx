import React, { useEffect } from "react";
import AdminSidePanel from "./AdminSidePanel";
import PaymentHistory from "@/components/component/payment-history";
import { useDispatch } from "react-redux";
import { getAllPayments } from "@/redux/adminSlice";

const PaymentLis = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPayments());
  }); 
  return (
    <div>
      <AdminSidePanel>
        <PaymentHistory />
      </AdminSidePanel>
    </div>
  );
};

export default PaymentLis;
