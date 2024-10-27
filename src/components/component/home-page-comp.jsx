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
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Unleash Your Fitness Potential
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Experience the ultimate fitness journey with our expert
                  trainers and cutting-edge facilities.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium text-white transition-all duration-200 ease-in-out transform rounded-md shadow-md bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-blue600 ">
                  Join Now
                </Link>

                <Link
                  href="#"
                  className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors border rounded-md shadow-sm border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-sky-600"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <img
              src={homeLogo1}
              width="550"
              height="550"
              alt="Gym Hero"
              className="object-cover w-full h-full mx-auto overflow-hidden aspect-video rounded-xl sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </section> */}

        {/*  */}
        <section
          className="relative w-full h-full py-12 mt-20 bg-center bg-no-repeat bg-cover md:py-24 lg:py-32"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container relative z-10 grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 text-white">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Unleash Your Fitness Potential
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Experience the ultimate fitness journey with our expert
                  trainers and cutting-edge facilities.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {/* <Link className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium text-white transition-all duration-200 ease-in-out transform rounded-md shadow-md bg-gradient-to-r from-blue-600 to-blue-700 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                  Join Now
                </Link> */}
                <Button>Join Now</Button>

                {/* <Link
                  href="#"
                  className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium text-white transition-colors border rounded-md shadow-sm border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-sky-600"
                  prefetch={false}
                >
                  Contact Us
                </Link> */}

                <Button>Contact Us</Button>
              </div>
            </div>
          </div>
        </section>

        {/* trainers list   */}
        <section
          id="trainers"
          className="w-full py-12 bg-black md:py-24 lg:py-32"
        >
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl">
                Meet Our Expert Trainers
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our team of highly qualified trainers are dedicated to helping
                you achieve your fitness goals.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {trainers.map((trainer) => (
                <>
                  {" "}
                  <div className="flex flex-col items-center justify-center p-6 space-y-4 rounded-lg shadow-sm bg-background">
                    <img
                      src="/placeholder.svg"
                      width="120"
                      height="120"
                      alt="Trainer 1"
                      className="rounded-full"
                      style={{ aspectRatio: "120/120", objectFit: "cover" }}
                    />
                    <div className="text-center">
                      <h3 className="text-lg font-bold">{trainer.name}</h3>
                      <p className="text-muted-foreground">
                        Certified Personal Trainer {trainer.expertise}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {trainer.experience}+ years of experience in the fitness
                        industry.
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </section>

        {/* our popular classes */}
        <section
          id="classes"
          className="relative w-full py-12 bg-center bg-no-repeat bg-cover md:py-24 lg:py-32"
        >
          {/* Image container with reduced opacity */}
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-60"
            style={{ backgroundImage: `url(${trainerBg})` }}
          ></div>

          {/* Content on top of the image */}
          <div className="container relative z-10 grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Our Popular Classes
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-white">
                Explore our diverse range of fitness classes to find the perfect
                workout for you.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
           <div className="relative flex flex-col items-center justify-center p-6 space-y-4 transition transition-transform duration-300 ease-in-out transform bg-white border border-transparent rounded-lg shadow-md bg-background hover:scale-105 hover:shadow-2xl">
            <DumbbellIcon className="w-12 h-12 text-primary" />
                <div className="text-center">
                  <h3 className="text-lg font-bold text-black">
                    Weight Training
                  </h3>
                  <p className="text-muted-foreground">
                    Mon, Wed, Fri - 6:00 PM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Strength-building exercises to tone and sculpt your body.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col items-center justify-center p-6 space-y-4 transition-transform duration-300 ease-in-out transform bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow rounded-lg hover:scale-105 hover:shadow-2xl">
              <SpaceIcon className="w-12 h-12 text-primary" />
                <div className="text-center">
                  <h3 className="text-lg font-bold text-black">Yoga</h3>
                  <p className="text-muted-foreground">Tue, Thu - 7:00 PM</p>
                  <p className="text-sm text-muted-foreground">
                    Improve flexibility, balance, and mindfulness through yoga.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col items-center justify-center p-6 space-y-4 transition transition-transform duration-300 ease-in-out transform bg-white border border-transparent rounded-lg shadow-md bg-background hover:scale-105 hover:shadow-2xl">
                <HeartPulseIcon className="w-12 h-12 text-primary" />
                <div className="text-center">
                  <h3 className="text-lg font-bold text-black">Cardio</h3>
                  <p className="text-muted-foreground">
                    Mon, Wed, Fri - 8:00 AM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    High-intensity cardio workouts to boost your endurance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* member ship plans */}
        <section
          id="memberships"
          className="relative w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          {/* Background image with reduced opacity */}
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-60 blur-sm"
            style={{ backgroundImage: `url(${membershipPlan})` }}
          ></div>

          {/* Content on top of the image */}
          <div className="container relative z-10 grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Membership Plans
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-white">
                Choose the membership plan that best fits your fitness goals and
                budget.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  //className="flex flex-col items-center justify-center p-6 space-y-4 rounded-lg shadow-sm bg-background bg-white/80"
                   
                  className="relative flex flex-col items-center justify-center p-6 space-y-4 transition transition-transform duration-300 ease-in-out transform bg-white border border-transparent rounded-lg shadow-md bg-background hover:scale-105 hover:shadow-2xl"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    <p className="text-4xl font-bold text-primary">
                      ${plan.price}
                    </p>
                    <p className="text-muted-foreground">per month</p>
                  </div>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-primary" />
                      Access to gym facilities
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-primary" />
                      Basic fitness classes
                    </li>
                    <li className="flex items-center gap-2">
                      <XIcon className="w-5 h-5 text-muted-foreground" />
                      Personal training sessions
                    </li>
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => handleClickJoin(plan._id)}
                  >
                    Join Now
                  </Button>
                </div>
              ))}
            </div>
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center p-6 space-y-4 rounded-lg shadow-sm bg-background">
                <blockquote className="text-center">
                  <p className="text-lg font-semibold leading-snug">
                    `The trainers at this gym are truly exceptional. They have
                    helped me achieve my fitness goals in a way that is both
                    challenging and enjoyable.`
                  </p>
                  <cite className="block mt-4 text-sm not-italic font-medium text-muted-foreground">
                    -
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

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
