import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import {
   getAllPlans,
  getAllTrainers,
} from "@/redux/adminSlice";
import Footer from "./Footer";
import Reviews from "./Reviews";
import HeroSection from "./HeroSection";
import Header from "./Header";
import MembershipPlanSliderComp from "./MembershipPlansSlider";
import Reviewss from "./Reviewss";
import ChatComponent from "./ChatComponent";
import { getAllUserFeedbacks } from "@/redux/feedbackSlice";

export function HomePageComp() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { plans, trainers } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllPlans());
    dispatch(getAllTrainers());
    dispatch(getAllUserFeedbacks());
  }, [dispatch]);

  const handleClickJoin = (planId) => {
    navigate(`/purchase-plan/${planId}`);
  };

  const memberPlansRef = useRef(null);

  const scrollToMemberPlans = () => {
    memberPlansRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex flex-col min-w-full min-h-screen text-white bg-gradient-to-br from-gray-900 to-black">
      <ChatComponent />
      <Header user={user} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-10">
          <div className="container grid gap-8 px-6 md:px-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 lg:pl-11">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                Welcome to <span className="text-blue-500">Gym Sarthi</span> –
                Your Ultimate Fitness Companion!
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Unlock your true potential with expert training, top-notch
                facilities, and a community that supports your fitness journey
                every step of the way. Whether you’re a beginner or a pro, Gym
                Sarthi is here to elevate your fitness experience.
              </p>
              <Button
                onClick={scrollToMemberPlans}
                className="px-6 py-3 text-white transition-all duration-300 bg-blue-600 rounded-full shadow-md hover:bg-blue-500 hover:scale-105"
              >
                Get Started Today
              </Button>
            </div>
            <div className="columns-3xs">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero Image 1"
                className="w-full aspect-video overflow-hidden rounded-xl object-cover mt-10"
              />
              <img
                src="https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero Image 2"
                className="w-full aspect-square overflow-hidden rounded-xl object-cover mt-6"
              />
              <img
                src="https://images.unsplash.com/photo-1631501700640-cfd8663b9bd7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero Image 4"
                className="w-full aspect-square overflow-hidden rounded-xl object-cover mt-10"
              />
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero Image 3"
                className="w-full aspect-video overflow-hidden rounded-xl object-cover mt-6"
              />
            </div>
          </div>
        </section>

        {/* Membership Plans Section */}
        <section
          ref={memberPlansRef}
          className="w-full py-16 bg-gradient-to-br from-gray-900 to-black md:py-24 lg:py-28"
        >
          <div className="container flex flex-col items-center justify-center gap-6 px-6 text-center md:px-12">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              Choose the Perfect Plan for You
            </h2>
            <p className="max-w-2xl text-lg text-gray-300 md:text-xl">
              Unlock your fitness potential with a membership that fits your
              goals and lifestyle. Start your transformation with Gym Sarthi
              today!
            </p>
            <div className="w-full max-w-9xl">
              <MembershipPlanSliderComp />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-black">
          <div className="container grid items-center justify-center gap-4 px-6 text-center md:px-12">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              What Our Members Say
            </h2>
            <p className="max-w-[700px] text-gray-300 md:text-xl">
              Discover how Gym Sarthi has transformed the lives of fitness
              enthusiasts like you.
            </p>

            <Reviews />
            {/* <Reviewss /> */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default HomePageComp;
