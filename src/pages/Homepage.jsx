import { HomePageComp } from "@/components/component/home-page-comp";
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/signin");
  };
  return (
    <div>
      <HomePageComp></HomePageComp>
    </div>
  );
};

export default Homepage;
