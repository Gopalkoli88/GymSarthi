 

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPlans, getAllTrainers } from "@/redux/adminSlice";
import goku from "../../assets/goku-png.png";
import logo from "../../assets/FITNESS_logo.png";
import homeLogo from "../../assets/homepagePic.jpg";
import homeLogo1 from "../../assets/homeLogo1.jpg";
import bg1 from "../../assets/bg-1.png";
import trainerBg from "../../assets/bg-2.avif";
import membershipPlan from "../../assets/planBg.jpg";
import Header from "@/Component/Header";

export function HomePageComp() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { plans, trainers } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPlans());
    dispatch(getAllTrainers());
  }, [dispatch]);

  const handleClickJoin = (planId) => {
    navigate(`/purchase-plan/${planId}`);
  };

  return (
    <div className="min-w-[80dvw] flex mt-5 flex-col min-h-[100dvh]">
      <Header user={user} />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative w-full h-[80vh] bg-center bg-no-repeat bg-cover flex items-center justify-center"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 px-4 text-center text-white">
            <h1 className="mb-6 text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
              Unleash Your Fitness Potential
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-xl">
              Experience the ultimate fitness journey with our expert trainers
              and cutting-edge facilities.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="px-8 py-3 text-white transition-transform transform bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105">
                Join Now
              </Button>
              <Button className="px-8 py-3 text-white transition-colors bg-transparent border border-white rounded-lg hover:bg-white hover:text-black">
                Contact Us
              </Button>
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section className="w-full py-20 bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-white">
                Meet Our Expert Trainers
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-300">
                Our team of highly qualified trainers are dedicated to helping
                you achieve your fitness goals.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {trainers.map((trainer) => (
                <div
                  key={trainer._id}
                  className="overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105"
                >
                  <img
                    src="/placeholder.svg"
                    alt={trainer.name}
                    className="object-cover w-full h-64"
                  />
                  <div className="p-6">
                    <h3 className="mb-2 text-2xl font-bold">{trainer.name}</h3>
                    <p className="mb-2 text-gray-600">
                      Certified Personal Trainer - {trainer.expertise}
                    </p>
                    <p className="text-sm text-gray-500">
                      {trainer.experience}+ years of experience
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Classes Section */}
        <section
          className="relative w-full py-20 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${trainerBg})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container relative z-10 px-4 mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-white">
                Our Popular Classes
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-200">
                Explore our diverse range of fitness classes to find the perfect
                workout for you.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
                <DumbbellIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="mb-2 text-2xl font-bold text-center">
                  Weight Training
                </h3>
                <p className="mb-4 text-center text-gray-600">
                  Mon, Wed, Fri - 6:00 PM
                </p>
                <p className="text-sm text-center text-gray-500">
                  Strength-building exercises to tone and sculpt your body.
                </p>
              </div>
              <div className="p-6 transition-transform transform bg-blue-600 rounded-lg shadow-lg hover:scale-105">
                <SpaceIcon className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="mb-2 text-2xl font-bold text-center text-white">
                  Yoga
                </h3>
                <p className="mb-4 text-center text-gray-200">
                  Tue, Thu - 7:00 PM
                </p>
                <p className="text-sm text-center text-gray-200">
                  Improve flexibility, balance, and mindfulness through yoga.
                </p>
              </div>
              <div className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
                <HeartPulseIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="mb-2 text-2xl font-bold text-center">Cardio</h3>
                <p className="mb-4 text-center text-gray-600">
                  Mon, Wed, Fri - 8:00 AM
                </p>
                <p className="text-sm text-center text-gray-500">
                  High-intensity cardio workouts to boost your endurance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Plans Section */}
        <section
          className="relative w-full py-20 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${membershipPlan})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container relative z-10 px-4 mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-white">
                Membership Plans
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-200">
                Choose the membership plan that best fits your fitness goals and
                budget.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105"
                >
                  <h3 className="mb-4 text-2xl font-bold text-center">
                    {plan.name}
                  </h3>
                  <p className="mb-4 text-4xl font-bold text-center text-blue-600">
                    ${plan.price}
                  </p>
                  <p className="mb-6 text-center text-gray-600">per month</p>
                  <ul className="mb-6 space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-blue-600" />
                      Access to gym facilities
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-blue-600" />
                      Basic fitness classes
                    </li>
                    <li className="flex items-center gap-2">
                      <XIcon className="w-5 h-5 text-gray-400" />
                      Personal training sessions
                    </li>
                  </ul>
                  <Button
                    className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    onClick={() => handleClickJoin(plan._id)}
                  >
                    Join Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-20 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold">
                What Our Members Say
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Hear from our satisfied members about their experience at our
                gym.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <blockquote className="text-center">
                  <p className="mb-4 text-lg font-semibold leading-snug">
                    "The trainers at this gym are truly exceptional. They have
                    helped me achieve my fitness goals in a way that is both
                    challenging and enjoyable."
                  </p>
                  <cite className="block text-sm font-medium text-gray-600">
                    - John Doe
                  </cite>
                </blockquote>
              </div>
              {/* Add more testimonials here */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Icon components remain the same

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

