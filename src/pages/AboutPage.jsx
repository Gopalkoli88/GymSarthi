 

// ! Swapnil makes :
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/nDT37UWTsEt
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Reviews from "./Reviews";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import bg1 from "../assets/bg-1.png";

export default function AboutAs() {
  const { user } = useSelector((state) => state.user);
  

  return (
<div className="min-w-[80dvw] flex flex-col min-h-[100dvh] bg-gradient-to-br from-gray-900 to-black">
<Header user={user} />
  
      {/* Hero Section */}
      <section className="relative w-full h-full py-16 mt-20 bg-gradient-to-br from-gray-900 to-black md:py-24 lg:py-32">
        <div className="container relative z-10 grid gap-6 px-6 text-white md:px-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Unleash Your Fitness Potential
            </h1>
            <p className="max-w-[600px] text-lg text-gray-300 md:text-xl">
              Experience the ultimate fitness journey with our expert trainers and cutting-edge facilities.
            </p>
            <div className="flex gap-4">
              <Button className="text-white bg-blue-600 hover:bg-blue-700">
                Join Now
              </Button>
              <Button className="text-white bg-blue-600 hover:bg-blue-700">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={bg1}
              alt="Fitness Journey"
              className="w-full max-w-lg rounded-lg shadow-lg shadow-blue-600/50"
            />
          </div>
        </div>
      </section>
  
      {/* Features Section */}
      <section className="w-full py-16 bg-gradient-to-br from-gray-900 to-black md:py-24 lg:py-24">
        <div className="container px-6 space-y-16 text-white md:px-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Discover the <span className="text-blue-500">GYMK</span> Difference
            </h2>
            <p className="max-w-[900px] text-lg text-gray-300 md:text-xl">
              At GYMK, we're dedicated to providing an unparalleled fitness experience. Explore the features that set us apart.
            </p>
          </div>
  
          <div className="grid gap-12 mx-auto sm:max-w-4xl sm:grid-cols-2 md:gap-16 lg:max-w-6xl lg:grid-cols-3">
            <div className="grid gap-4 p-6 transition transform bg-gray-800 shadow-lg rounded-xl hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-md">
                  <DumbbellIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">State-of-the-Art Equipment</h3>
              </div>
              <p className="text-gray-300">
                Our gym is equipped with the latest and greatest fitness technology, ensuring you have the tools to reach your goals.
              </p>
            </div>
  
            <div className="grid gap-4 p-6 transition transform bg-gray-800 shadow-lg rounded-xl hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-md">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Experienced Trainers</h3>
              </div>
              <p className="text-gray-300">
                Our team of certified trainers are here to guide you every step of the way, providing personalized support and motivation.
              </p>
            </div>
  
            <div className="grid gap-4 p-6 transition transform bg-gray-800 shadow-lg rounded-xl hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500 rounded-md">
                  <WeightIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Diverse Class Offerings</h3>
              </div>
              <p className="text-gray-300">
                From high-intensity interval training to calming yoga, we offer a wide range of classes to cater to all fitness levels and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
  
      {/* Community Section */}
      <section className="relative w-full py-16 bg-black bg-center bg-cover md:py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <div
            className="absolute inset-0 opacity-50 blur-md"
            style={{
              backgroundImage:
                'url("https://i.pinimg.com/originals/17/9c/fa/179cfaf53e36ed8867dd368036aa9fac.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
  
        <div className="container relative flex flex-col items-center justify-center px-6 space-y-6 text-center md:px-12 lg:space-y-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Join the <span className="text-blue-500">GYMK</span> Community
          </h2>
          <p className="max-w-2xl text-lg text-gray-200 md:text-xl">
            Transform your fitness journey in a supportive and motivating environment. Take the first step towards a healthier, stronger you.
          </p>
  
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
            <Button className="text-white bg-blue-600 hover:bg-blue-700">
              Join Now
            </Button>
            <Button className="text-white bg-blue-600 hover:bg-blue-700">
              Learn More
            </Button>
          </div>
        </div>
      </section>
  
      {/* Reviews Section */}
      {/* <Reviews /> */}
  
      {/* About Section */}
      <section className="w-full py-12 font-sans bg-black md:py-24 lg:py-24">
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-6">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4 font-light text-gray-200 lg:pl-6">
              <h2 className="text-3xl font-bold text-center text-yellow-400">
                About GYMK
              </h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl lg:text-lg xl:text-xl leading-relaxed">
                GYMK was founded in 2015 by a group of fitness enthusiasts who wanted to create a gym that was more than just a place to work out. They envisioned a community-driven space where people could come together, support each other, and achieve their fitness goals.
              </p>
              <p className="max-w-[900px] text-gray-300 md:text-xl lg:text-lg xl:text-xl leading-relaxed">
                Over the years, GYMK has grown into a thriving fitness hub, attracting members from all walks of life. Our state-of-the-art equipment, expert trainers, and diverse class offerings have helped countless individuals transform their bodies and minds.
              </p>
              <p className="max-w-[900px] text-gray-300 md:text-xl lg:text-lg xl:text-xl leading-relaxed">
                But what truly sets GYMK apart is our sense of community. We believe that fitness is not just about physical health, but also about building connections, fostering support, and inspiring one another. That's why we've created a welcoming environment where everyone feels at home.
              </p>
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-2 lg:w-[90%] lg:h-[90%]">
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2021/2/RX/UL/HG/121338197/bodybuilding-photography.jpg"
              alt="Our Story Image 4"
              className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
              style={{
                boxShadow:
                  "0 6px 10px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(59, 130, 246, 0.2)",
              }}
            />
            <img
              src="https://wallpapers.com/images/featured/bodybuilders-hd-aa78w61dw7ilh9cs.jpg"
              alt="Our Story Image 2"
              className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
              style={{
                boxShadow:
                  "0 6px 10px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(59, 130, 246, 0.2)",
              }}
            />
            <img
              src="https://i.pinimg.com/736x/de/aa/07/deaa0767367bcae9e3e56223c44617de.jpg"
              alt="Our Story Image 3"
              className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
              style={{
                boxShadow:
                  "0 6px 10px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(59, 130, 246, 0.2)",
              }}
            />
            <img
              src="https://media.istockphoto.com/id/540101544/photo/hard-as-a-rock.jpg?s=612x612&w=0&k=20&c=_jyUcyQrrOr9dDvQhjrYgfjEo9iUbjq7nPPNYZNz9Dg="
              alt="Our Story Image 1"
              className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
              style={{
                boxShadow:
                  "0 6px 10px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(59, 130, 246, 0.2)",
              }}
            />
          </div>
        </div>
      </section>
  
      <Footer />
    </div>
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

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function WeightIcon(props) {
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
      <circle cx="12" cy="5" r="3" />
      <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
    </svg>
  );
}
