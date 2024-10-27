// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/nDT37UWTsEt
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Link } from "react-router-dom";
// import Footer from "./Footer";
// import Header from "./Header";
// import Reviews from "./Reviews";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// import bg1 from "../assets/bg-1.png";

// export default function AboutAs() {
//   const { user } = useSelector((state) => state.user);
//   return (
//     <div className="min-w-[80dvw] flex mt-5 flex-col min-h-[100dvh]">
//       <Header user={user} />
     
//       <section
//           className="relative w-full h-full py-12 mt-20 bg-center bg-no-repeat bg-cover md:py-24 lg:py-32"
//           style={{ backgroundImage: `url(${bg1})` }}
//         >
//           <div className="absolute inset-0 bg-black/40"></div>
//           <div className="container relative z-10 grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
//             <div className="flex flex-col justify-center space-y-4">
//               <div className="space-y-2 text-white">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                   Unleash Your Fitness Potential
//                 </h1>
//                 <p className="max-w-[600px] text-muted-foreground md:text-xl">
//                   Experience the ultimate fitness journey with our expert
//                   trainers and cutting-edge facilities.
//                 </p>
//               </div>
              
//             </div>
//           </div>
//         </section>
//       <section className="w-full py-12 md:py-24 lg:py-24 bg-black">
//         <div className="container space-y-12 px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
//                 Discover the GYMK Difference
//               </h2>
//               <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed lg:pt-8">
//                 At GYMK, we're dedicated to providing an unparalleled fitness
//                 experience. Explore the features that set us apart.
//               </p>
//             </div>
//           </div>
//           <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
//             <div className="grid gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="rounded-md bg-white p-3 text-black">
//                   <DumbbellIcon className="h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold text-white">
//                   State-of-the-Art Equipment
//                 </h3>
//               </div>
//               <p className="text-white">
//                 Our gym is equipped with the latest and greatest fitness
//                 technology, ensuring you have the tools to reach your goals.
//               </p>
//             </div>
//             <div className="grid gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="rounded-md bg-gray-400 p-3 text-white">
//                   <UsersIcon className="h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold text-white">
//                   Experienced Trainers
//                 </h3>
//               </div>
//               <p className="text-white">
//                 Our team of certified trainers are here to guide you every step
//                 of the way, providing personalized support and motivation.
//               </p>
//             </div>
//             <div className="grid gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="rounded-md bg-gray-600 p-3 text-white">
//                   <WeightIcon className="h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold text-white">
//                   Diverse Class Offerings
//                 </h3>
//               </div>
//               <p className="text-white">
//                 From high-intensity interval training to calming yoga, we offer
//                 a wide range of classes to cater to all fitness levels and
//                 preferences.
//               </p>
//             </div>
//             <img
//               src="https://5.imimg.com/data5/ZH/IV/AV/SELLER-9511932/iconic-fitness-equipments-500x500.jpg"
//               width="400"
//               height="300"
//               alt="Feature Image 1"
//               className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
//             />
//             <img
//               src="https://img.freepik.com/premium-photo/personal-trainer-is-giving-instructions-client-gym_14117-390716.jpg"
//               width="400"
//               height="300"
//               alt="Feature Image 2"
//               className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
//             />
//             <img
//               src="https://images.unsplash.com/photo-1677741447985-da1d90c00742?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               width="400"
//               height="300"
//               alt="Feature Image 3"
//               className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
//             />
//           </div>
//         </div>
//       </section>
//       {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
//         <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
//           <div className="space-y-3">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
//               Join the GYMK Community
//             </h2>
//             <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//               Experience the transformative power of fitness in a supportive and
//               motivating environment.
//             </p>
//           </div>
//           <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
//             <Link
//               href="#"
//               className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//               prefetch={false}
//             >
//               Join Now
//             </Link>
//             <Link
//               href="#"
//               className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-black px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//               prefetch={false}
//             >
//               Learn More
//             </Link>
//           </div>
//         </div>
//       </section> */}

//       {/* <section
//         className="w-full py-12 md:py-24 lg:py-32 bg-black bg-cover  bg-center "
//         style={{
//           backgroundImage:
//             'url("https://i.pinimg.com/originals/17/9c/fa/179cfaf53e36ed8867dd368036aa9fac.jpg")',
//         }}
//       >
//         <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10 bg-black bg-opacity-60 ">
//           {" "}
          
//           <div className="space-y-3">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
//               Join the GYMK Community
//             </h2>
//             <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//               Experience the transformative power of fitness in a supportive and
//               motivating environment.
//             </p>
//           </div>
//           <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
//             <Link
//               href="#"
//               className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//               prefetch={false}
//             >
//               Join Now
//             </Link>
//             <Link
//               href="#"
//               className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-black px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//               prefetch={false}
//             >
//               Learn More
//             </Link>
//           </div>
//         </div>
//       </section> */}

//       <section className="relative w-full py-12 md:py-24 lg:py-32 bg-black bg-cover bg-center">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-black bg-opacity-60"></div>{" "}
//           {/* Semi-transparent overlay */}
//           <div
//             className="absolute inset-0 blur-sm"
//             style={{
//               backgroundImage:
//                 'url("https://i.pinimg.com/originals/17/9c/fa/179cfaf53e36ed8867dd368036aa9fac.jpg")',
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           ></div>{" "}
//           {/* Blur effect */}
//         </div>
//         <div className="relative container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
//           <div className="space-y-3">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
//               Join the GYMK Community
//             </h2>
//             <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//               Experience the transformative power of fitness in a supportive and
//               motivating environment.
//             </p>
//           </div>
//           <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
//             <Link
//               href="#"
//               className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//               prefetch={false}
//             >
//               Join Now
//             </Link>
//             <Link
//               href="#"
//               className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-black px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//               prefetch={false}
//             >
//               Learn More
//             </Link>
//           </div>
//         </div>
//       </section>
//       <Reviews />

//       <section className="w-full py-12 md:py-24 lg:py-24 bg-black">
//         <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
//           <div className="flex flex-col justify-center space-y-4">
//             <div className="space-y-2 font-light	lg:pl-6">
//               {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
//                 Our Story
//               </h2> */}
//               <p className=" max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                 GYMK was founded in 2015 by a group of fitness enthusiasts who
//                 wanted to create a gym that was more than just a place to work
//                 out. They envisioned a community-driven space where people could
//                 come together, support each other, and achieve their fitness
//                 goals.
//               </p>
//               <p className="max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                 Over the years, GYMK has grown into a thriving fitness hub,
//                 attracting members from all walks of life. Our state-of-the-art
//                 equipment, expert trainers, and diverse class offerings have
//                 helped countless individuals transform their bodies and minds.
//               </p>
//               <p className="max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                 But what truly sets GYMK apart is our sense of community. We
//                 believe that fitness is not just about physical health, but also
//                 about building connections, fostering support, and inspiring one
//                 another. That's why we've created a welcoming environment where
//                 everyone feels at home.
//               </p>
//             </div>
//           </div>
//           {/* <div className="	grid grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-2 lg:w-[90%] lg:h-[90%]">
//             <img
//               src="https://5.imimg.com/data5/SELLER/Default/2021/2/RX/UL/HG/121338197/bodybuilding-photography.jpg"
//               width="400"
//               height="400"
//               alt="Our Story Image 4"
//               className="mx-auto aspect-square overflow-hidden rounded-xl object-cover "
//             />
//             <img
//               src="https://wallpapers.com/images/featured/bodybuilders-hd-aa78w61dw7ilh9cs.jpg"
//               width="400"
//               height="400"
//               alt="Our Story Image 2"
//               className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
//             />
//             <img
//               src="https://i.pinimg.com/736x/de/aa/07/deaa0767367bcae9e3e56223c44617de.jpg"
//               width="400"
//               height="400"
//               alt="Our Story Image 3"
//               className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
//             />
//             <img
//               src="https://media.istockphoto.com/id/540101544/photo/hard-as-a-rock.jpg?s=612x612&w=0&k=20&c=_jyUcyQrrOr9dDvQhjrYgfjEo9iUbjq7nPPNYZNz9Dg="
//               width="400"
//               height="400"
//               alt="Our Story Image 1"
//               className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
//             />
//           </div> */}
//           <div className="grid grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-2 lg:w-[90%] lg:h-[90%]">
//             <img
//               src="https://5.imimg.com/data5/SELLER/Default/2021/2/RX/UL/HG/121338197/bodybuilding-photography.jpg"
//               width="400"
//               height="400"
//               alt="Our Story Image 4"
//               className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
//               style={{
//                 boxShadow:
//                   "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(59, 130, 246, 0.2)",
//               }}
//             />
//             <img
//               src="https://wallpapers.com/images/featured/bodybuilders-hd-aa78w61dw7ilh9cs.jpg"
//               width="400"
//               height="400"
//               alt="Our Story Image 2"
//               className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
//               style={{
//                 boxShadow:
//                   "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(59, 130, 246, 0.2)",
//               }}
//             />
//             <img
//               src="https://i.pinimg.com/736x/de/aa/07/deaa0767367bcae9e3e56223c44617de.jpg"
//               width="400"
//               height="400"
//               alt="Our Story Image 3"
//               className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
//               style={{
//                 boxShadow:
//                   "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(59, 130, 246, 0.2)",
//               }}
//             />
//             <img
//               src="https://media.istockphoto.com/id/540101544/photo/hard-as-a-rock.jpg?s=612x612&w=0&k=20&c=_jyUcyQrrOr9dDvQhjrYgfjEo9iUbjq7nPPNYZNz9Dg="
//               width="400"
//               height="400"
//               alt="Our Story Image 1"
//               className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
//               style={{
//                 boxShadow:
//                   "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(59, 130, 246, 0.2)",
//               }}
//             />
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// function DumbbellIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M14.4 14.4 9.6 9.6" />
//       <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
//       <path d="m21.5 21.5-1.4-1.4" />
//       <path d="M3.9 3.9 2.5 2.5" />
//       <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
//     </svg>
//   );
// }

// function UsersIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   );
// }

// function WeightIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="5" r="3" />
//       <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
//     </svg>
//   );
// }


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
    <div className="min-w-[80dvw] flex mt-4 flex-col min-h-[100dvh]">
      <Header user={user} />
     
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
              
            </div>
          </div>
        </section>
      <section className="w-full py-12 bg-black md:py-24 lg:py-24">
        <div className="container px-4 space-y-12 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                Discover the GYMK Difference
              </h2>
              <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed lg:pt-8">
                At GYMK, we're dedicated to providing an unparalleled fitness
                experience. Explore the features that set us apart.
              </p>
            </div>
          </div>
          <div className="grid items-start gap-8 mx-auto sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 text-black bg-white rounded-md">
                  <DumbbellIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  State-of-the-Art Equipment
                </h3>
              </div>
              <p className="text-white">
                Our gym is equipped with the latest and greatest fitness
                technology, ensuring you have the tools to reach your goals.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 text-white bg-gray-400 rounded-md">
                  <UsersIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Experienced Trainers
                </h3>
              </div>
              <p className="text-white">
                Our team of certified trainers are here to guide you every step
                of the way, providing personalized support and motivation.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 text-white bg-gray-600 rounded-md">
                  <WeightIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Diverse Class Offerings
                </h3>
              </div>
              <p className="text-white">
                From high-intensity interval training to calming yoga, we offer
                a wide range of classes to cater to all fitness levels and
                preferences.
              </p>
            </div>
            <img
              src="https://5.imimg.com/data5/ZH/IV/AV/SELLER-9511932/iconic-fitness-equipments-500x500.jpg"
              width="400"
              height="300"
              alt="Feature Image 1"
              className="object-cover mx-auto overflow-hidden aspect-video rounded-xl"
            />
            <img
              src="https://img.freepik.com/premium-photo/personal-trainer-is-giving-instructions-client-gym_14117-390716.jpg"
              width="400"
              height="300"
              alt="Feature Image 2"
              className="object-cover mx-auto overflow-hidden aspect-video rounded-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1677741447985-da1d90c00742?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width="400"
              height="300"
              alt="Feature Image 3"
              className="object-cover mx-auto overflow-hidden aspect-video rounded-xl"
            />
          </div>
        </div>
      </section>
      {/* <section className="w-full py-12 bg-black md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Join the GYMK Community
            </h2>
            <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience the transformative power of fitness in a supportive and
              motivating environment.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium text-black transition-colors bg-white rounded-md shadow hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Join Now
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors bg-black border rounded-md shadow-sm border-input hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section> */}

      {/* <section
        className="w-full py-12 bg-black bg-center bg-cover md:py-24 lg:py-32 "
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/originals/17/9c/fa/179cfaf53e36ed8867dd368036aa9fac.jpg")',
        }}
      >
        <div className="container grid items-center justify-center gap-4 px-4 text-center bg-black md:px-6 lg:gap-10 bg-opacity-60 ">
          {" "}
          
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Join the GYMK Community
            </h2>
            <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience the transformative power of fitness in a supportive and
              motivating environment.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium text-black transition-colors bg-white rounded-md shadow hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Join Now
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors bg-black border rounded-md shadow-sm border-input hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section> */}

      <section className="relative w-full py-12 bg-black bg-center bg-cover md:py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>{" "}
          {/* Semi-transparent overlay */}
          <div
            className="absolute inset-0 blur-sm"
            style={{
              backgroundImage:
                'url("https://i.pinimg.com/originals/17/9c/fa/179cfaf53e36ed8867dd368036aa9fac.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>{" "}
          {/* Blur effect */}
        </div>
        <div className="container relative grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Join the GYMK Community
            </h2>
            <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience the transformative power of fitness in a supportive and
              motivating environment.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium text-black transition-colors bg-white rounded-md shadow hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Join Now
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors bg-black border rounded-md shadow-sm border-input hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <Reviews />

      {/* <section className="w-full py-12 bg-black md:py-24 lg:py-24">
        <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-6">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 font-light lg:pl-6">
           
              <p className=" max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                GYMK was founded in 2015 by a group of fitness enthusiasts who
                wanted to create a gym that was more than just a place to work
                out. They envisioned a community-driven space where people could
                come together, support each other, and achieve their fitness
                goals.
              </p>
              <p className="max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Over the years, GYMK has grown into a thriving fitness hub,
                attracting members from all walks of life. Our state-of-the-art
                equipment, expert trainers, and diverse class offerings have
                helped countless individuals transform their bodies and minds.
              </p>
              <p className="max-w-[900px] text-[#6b7280] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                But what truly sets GYMK apart is our sense of community. We
                believe that fitness is not just about physical health, but also
                about building connections, fostering support, and inspiring one
                another. That's why we've created a welcoming environment where
                everyone feels at home.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-2 lg:w-[90%] lg:h-[90%]">
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2021/2/RX/UL/HG/121338197/bodybuilding-photography.jpg"
              width="400"
              height="400"
              alt="Our Story Image 4"
              className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
              style={{
                boxShadow:
                  "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(59, 130, 246, 0.2)",
              }}
            />
            <img
              src="https://wallpapers.com/images/featured/bodybuilders-hd-aa78w61dw7ilh9cs.jpg"
              width="400"
              height="400"
              alt="Our Story Image 2"
              className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
              style={{
                boxShadow:
                  "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(59, 130, 246, 0.2)",
              }}
            />
            <img
              src="https://i.pinimg.com/736x/de/aa/07/deaa0767367bcae9e3e56223c44617de.jpg"
              width="400"
              height="400"
              alt="Our Story Image 3"
              className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
              style={{
                boxShadow:
                  "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(59, 130, 246, 0.2)",
              }}
            />
            <img
              src="https://media.istockphoto.com/id/540101544/photo/hard-as-a-rock.jpg?s=612x612&w=0&k=20&c=_jyUcyQrrOr9dDvQhjrYgfjEo9iUbjq7nPPNYZNz9Dg="
              width="400"
              height="400"
              alt="Our Story Image 1"
              className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
              style={{
                boxShadow:
                  "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(59, 130, 246, 0.2)",
              }}
            />
          </div>
        </div>
      </section> */}

<section className="w-full py-12 font-sans bg-black md:py-24 lg:py-24">
<div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-6">
  <div className="flex flex-col justify-center space-y-6">
    <div className="space-y-4 font-light text-gray-200 lg:pl-6">
      <h2 className="text-3xl font-bold text-center text-yellow-400">About GYMK</h2>
      <p className="max-w-[900px] text-gray-300 md:text-xl lg:text-lg xl:text-xl leading-relaxed">
        GYMK was founded in 2015 by a group of fitness enthusiasts who wanted
        to create a gym that was more than just a place to work out. They
        envisioned a community-driven space where people could come together,
        support each other, and achieve their fitness goals.
      </p>
      <p className="max-w-[900px] text-gray-300 md:text-xl lg:text-lg xl:text-xl leading-relaxed">
        Over the years, GYMK has grown into a thriving fitness hub, attracting
        members from all walks of life. Our state-of-the-art equipment, expert
        trainers, and diverse class offerings have helped countless
        individuals transform their bodies and minds.
      </p>
      <p className="max-w-[900px] text-gray-300 md:text-xl lg:text-lg xl:text-xl leading-relaxed">
        But what truly sets GYMK apart is our sense of community. We believe
        that fitness is not just about physical health, but also about
        building connections, fostering support, and inspiring one another.
        That's why we've created a welcoming environment where everyone feels
        at home.
      </p>
    </div>
  </div>









    <div className="grid grid-cols-2 gap-10 md:grid-cols-2 lg:grid-cols-2 lg:w-[90%] lg:h-[90%]">
      <img
        src="https://5.imimg.com/data5/SELLER/Default/2021/2/RX/UL/HG/121338197/bodybuilding-photography.jpg"
        width="400"
        height="400"
        alt="Our Story Image 4"
        className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
        style={{
          boxShadow:
            "0 6px 10px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(59, 130, 246, 0.2)",
        }}
      />
      <img
        src="https://wallpapers.com/images/featured/bodybuilders-hd-aa78w61dw7ilh9cs.jpg"
        width="400"
        height="400"
        alt="Our Story Image 2"
        className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
        style={{
          boxShadow:
            "0 6px 10px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(59, 130, 246, 0.2)",
        }}
      />
      <img
        src="https://i.pinimg.com/736x/de/aa/07/deaa0767367bcae9e3e56223c44617de.jpg"
        width="400"
        height="400"
        alt="Our Story Image 3"
        className="object-cover mx-auto overflow-hidden aspect-square rounded-xl"
        style={{
          boxShadow:
            "0 6px 10px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(59, 130, 246, 0.2)",
        }}
      />
      <img
        src="https://media.istockphoto.com/id/540101544/photo/hard-as-a-rock.jpg?s=612x612&w=0&k=20&c=_jyUcyQrrOr9dDvQhjrYgfjEo9iUbjq7nPPNYZNz9Dg="
        width="400"
        height="400"
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
