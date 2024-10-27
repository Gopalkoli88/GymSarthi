import { PlanDetailsComp } from "@/components/component/plan-details";
import React from "react";
import { useParams } from "react-router-dom";

const PlanDetails = () => {
  const id = useParams();
  return (
    <div>
      <PlanDetailsComp id={id} />
    </div>
  );
};

export default PlanDetails;
