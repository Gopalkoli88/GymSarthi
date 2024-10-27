import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import {
  getAllFeedbacks,
  getAllPlans,
  getAllTrainers,
} from "@/redux/adminSlice";

// import Header from "@/Component/Header";
// import Footer from "../../Component/Footer";
// import Reviews from "@/Component/Reviews";
// import HeroSection from "@/Component/HeroSection";
// import MembershipPlansSlider from "@/Component/MembershipPlansSlider";
import Footer from "./Footer";
import Reviews from "./Reviews";
import HeroSection from "./HeroSection";
import Header from "./Header";
import MembershipPlanSliderComp from "./MembershipPlansSlider";

export function HomePageComp() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { plans, trainers } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllPlans());
    dispatch(getAllTrainers());
    // dispatch(getAllFeedbacks());
  }, [dispatch]);

  const handleClickJoin = (planId) => {
    navigate(`/purchase-plan/${planId}`);
  };

  // Create a ref for the Member Plans section
  const memberPlansRef = useRef(null);

  // Function to scroll to the Member Plans section
  const scrollToMemberPlans = () => {
    memberPlansRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-w-[80dvw] flex mt-5 flex-col min-h-[100dvh]">
      <Header user={user} />
      <main className="flex-1">
        <section className="w-full bg-black py-12 md:py-24 lg:py-10 ">
          <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 lg:pl-11">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Elevate Your Fitness at GYMK
                </h1>
                <p className="max-w-[600px] text-white md:text-xl">
                  Experience the ultimate fitness destination, where
                  cutting-edge equipment, expert guidance, and a vibrant
                  community come together to help you reach your goals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button onClick={scrollToMemberPlans}>Join Now</Button>
              </div>
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

        {/* HERO  */}
        <HeroSection />
        {/* trainers list   */}

        <section
          id="memberships"
          ref={memberPlansRef}
          className="relative w-full py-12 md:py-24 lg:py-24 "
        >
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60  blur-sm"></div>

          <div className="relative z-10 container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Membership Plans
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-white">
                Choose the membership plan that best fits your fitness goals and
                budget.
              </p>
            </div>

            <MembershipPlanSliderComp />
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Members Say
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our satisfied members about their experience at our
                gym.
              </p>
            </div>

            <Reviews />
          </div>
        </section>
      </main>
      <Footer />
      {/* <Footer /> */}
    </div>
  );
}
export default HomePageComp;

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function DumbbellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  );
}

function HeartPulseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  );
}

function SpaceIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ADDON
