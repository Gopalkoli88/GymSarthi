 
import { Link } from "react-router-dom";
import bg1 from "../assets/bg-1.png";
import { Button } from "@/components/ui/button";
import TrainersSection from "./TrainerSection";
// import TrainersSection from "./TrainersSection";

export default function HeroSection() {
  return (
    <div className="bg-black text-white">
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* <div className="border-blue-600 border-2 rounded-lg p-6 shadow-lg"> */}
            <div className="relative flex flex-col items-center justify-center p-6 space-y-4 transition-transform duration-300 ease-in-out transform bg-white border border-transparent rounded-lg shadow-md bg-background hover:scale-105 hover:shadow-2xl hover:border-blue-600 hover:border-2">
              <DumbbellIcon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">
                State-of-the-Art Equipment
              </h3>
              <p className="mt-2 text-muted-foreground">
                Our gym is equipped with the latest and greatest fitness
                equipment to help you reach your goals.
              </p>
            </div>
            <div className="relative flex flex-col items-center justify-center p-6 space-y-4 transition-transform duration-300 ease-in-out transform bg-white border border-transparent rounded-lg shadow-md bg-background hover:scale-105 hover:shadow-2xl hover:border-blue-600 hover:border-2">
              <HeartPulseIcon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Expert Trainers</h3>
              <p className="mt-2 text-muted-foreground">
                Our team of experienced trainers are here to guide you every
                step of the way.
              </p>
            </div>
            <div className="relative flex flex-col items-center justify-center p-6 space-y-4 transition-transform duration-300 ease-in-out transform bg-white border border-transparent rounded-lg shadow-md bg-background hover:scale-105 hover:shadow-2xl hover:border-blue-600 hover:border-2">
              <CalendarDaysIcon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">
                Diverse Class Schedule
              </h3>
              <p className="mt-2 text-muted-foreground">
                From yoga to HIIT, we offer a wide range of classes to fit your
                fitness needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24 lg:py-24  bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Our Popular Classes
            </h2>
            <p className="mt-4 text-muted-foreground">
              Explore our wide range of fitness classes to find the perfect
              workout for you.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up ">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-blue-600 border-2">
              <img
                src="https://www.shutterstock.com/image-photo/man-performing-sukhasana-sitting-on-600nw-543700657.jpg"
                alt="Yoga Class"
                width={500}
                height={300}
                className="w-full h-56 object-cover"
                style={{ aspectRatio: "500/300", objectFit: "cover" }}
              />
              <div className="p-6 bg-black">
                <h3 className="text-2xl font-bold">Yoga</h3>
                <p className="mt-2 text-muted-foreground">
                  Improve your flexibility, strength, and balance with our yoga
                  classes.
                </p>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center border-transparent font-medium rounded-md text-white  "
                    prefetch={false}
                  >
                    <Button> Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-blue-600 border-2">
              <img
                src="https://png.pngtree.com/background/20230614/original/pngtree-people-at-the-gym-on-stationary-bikes-picture-image_3484514.jpg"
                alt="Spin Class"
                width={500}
                height={300}
                className="w-full h-56 object-cover"
                style={{ aspectRatio: "500/300", objectFit: "cover" }}
              />
              <div className="p-6 bg-black">
                <h3 className="text-2xl font-bold">Spin</h3>
                <p className="mt-2 text-muted-foreground">
                  Get your heart pumping with our high-intensity spin classes.
                </p>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center border-transparent font-medium rounded-md text-white  "
                    prefetch={false}
                  >
                    <Button> Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-blue-600 border-2">
              <img
                src="https://www.shutterstock.com/image-photo/no-name-strong-athletic-man-600nw-2291829397.jpg"
                alt="Strength Training"
                width={500}
                height={300}
                className="w-full h-56 object-cover"
                style={{ aspectRatio: "500/300", objectFit: "cover" }}
              />
              <div className="p-6 bg-black">
                <h3 className="text-2xl font-bold">Strength Training</h3>
                <p className="mt-2 text-muted-foreground">
                  Build muscle and improve your overall strength with our
                  strength training classes.
                </p>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center border-transparent font-medium rounded-md text-white  "
                    prefetch={false}
                  >
                    <Button> Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Other sections */}

      {/* <section className="py-16 sm:py-24 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Meet Our Trainers
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our team of experienced trainers are here to help you reach your
                fitness goals.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
              <div className="border-blue-600 border-2 rounded-lg p-2  shadow-lg">
                <img
                  src="https://i.pinimg.com/originals/bc/fc/c7/bcfcc72f2a3afe5f616efc17ef7e5bb2.jpg"
                  alt="Trainer 1"
                  width={300}
                  height={300}
                  className="w-full h-56 object-cover rounded-lg"
                  style={{ aspectRatio: "300/300", objectFit: "cover" }}
                />
                <h3 className="mt-4 text-2xl font-bold">John Doe</h3>
                <p className="mt-2 text-muted-foreground">
                  Certified Personal Trainer
                </p>
                <p className="mt-4 text-muted-foreground">
                  John has been a personal trainer for over 10 years and is
                  passionate about helping people reach their fitness goals.
                </p>
              </div>
              <div className="border-blue-600 border-2 rounded-lg p-2 shadow-lg">
                <img
                  src="https://miro.medium.com/v2/resize:fit:1400/1*Hm2MLz5xeO7yR1aOYrXGVQ.jpeg"
                  alt="Trainer 2"
                  width={300}
                  height={300}
                  className="w-full h-56 object-cover rounded-lg"
                  style={{ aspectRatio: "300/300", objectFit: "cover" }}
                />
                <h3 className="mt-4 text-2xl font-bold">Jane Smith</h3>
                <p className="mt-2 text-muted-foreground">Yoga Instructor</p>
                <p className="mt-4 text-muted-foreground">
                  Jane is a certified yoga instructor with over 5 years of
                  experience. She is passionate about helping people improve their
                  flexibility and mindfulness.
                </p>
              </div>
              <div className="border-blue-600 border-2 rounded-lg p-2 shadow-lg">
                <img
                  src="https://community.thriveglobal.com/wp-content/uploads/2019/05/Michael-Johnson-screenshot.jpg"
                  alt="Trainer 3"
                  width={300}
                  height={300}
                  className="w-full h-56 object-cover rounded-lg"
                  style={{ aspectRatio: "300/300", objectFit: "cover" }}
                />
                <h3 className="mt-4 text-2xl font-bold">Michael Johnson</h3>
                <p className="mt-2 text-muted-foreground">Spin Instructor</p>
                <p className="mt-4 text-muted-foreground">
                  Michael is a certified spin instructor with over 7 years of
                  experience. He is passionate about helping people push their
                  limits and achieve their fitness goals.
                </p>
              </div>
            </div>
          </div>
        </section> */}
      <TrainersSection />
    </div>
  );
}

function CalendarDaysIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
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
