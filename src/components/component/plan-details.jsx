// import TrainerSidePanel from "@/Component/TrainerSidePanel";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { fetchUsersDetails } from "@/redux/trainerSlice";
// import { UsersIcon } from "lucide-react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// export function PlanDetailsComp() {
//   const { id } = useParams();
//   const { plans, planUserDetails } = useSelector((state) => state.trainer);
//   const dispatch = useDispatch();
//   const planInfo = plans.find((plan) => plan._id === id);
//   console.log("plan info :", planInfo.users);
//   useEffect(() => {
//     dispatch(fetchUsersDetails(planInfo.users));
//   }, [dispatch, planInfo]);

//   console.log("planUsersDetails :", planUserDetails);
//   function convertDateTime(isoDateTime) {
//     // Parse the input ISO 8601 date-time string
//     const date = new Date(isoDateTime);

//     // Define the desired format options
//     const options = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     };

//     // Convert to the desired format
//     return date.toLocaleDateString("en-US", options);
//   }

//   return (
//     <TrainerSidePanel>
//       <div className="flex items-center justify-center min-h-screen p-6 ">
//         <Card className="w-full max-w-3xl border border-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
//           <CardHeader className="p-6 border-b border-gray-800 rounded-t-lg bg-gray-950">
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-xl font-semibold text-white">
//                   {planInfo.name}
//                 </CardTitle>
//                 <CardDescription className="text-gray-400">
//                   {planInfo.description}
//                 </CardDescription>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-1">
//                   <span className="font-medium text-yellow-500">
//                     ₹{planInfo.price}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <CalendarIcon className="w-5 h-5 text-gray-400" />
//                   <span className="text-gray-400">
//                     {planInfo.duration}{" "}
//                     {planInfo.duration === 1 ? "month" : "months"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="p-6 space-y-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <UserIcon className="w-5 h-5 text-gray-400" />
//                 <span className="text-gray-400">
//                   {planInfo.users.length} Users
//                 </span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 {planInfo.status === "active" && (
//                   <CircleCheckIcon className="w-5 h-5 text-green-500" />
//                 )}
//                 <span className="font-medium text-green-500">
//                   {planInfo.status}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <CalendarIcon className="w-5 h-5 text-gray-400" />
//               <span className="text-gray-400">
//                 Created at {convertDateTime(planInfo.createdAt)}
//               </span>
//             </div>

//             <div className="pt-4 border-t border-gray-700">
//               <div className="flex items-center mb-3 space-x-2">
//                 <UsersIcon className="w-5 h-5 text-gray-400" />
//                 <span className="font-semibold text-gray-400">
//                   List of Users
//                 </span>
//               </div>

//               <div className="space-y-3">
//                 {planUserDetails.map((plan, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between p-3 transition-colors bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800"
//                   >
//                     <div className="flex items-center space-x-2">
//                       <UserIcon className="w-5 h-5 text-gray-300 drop-shadow-md" />
//                       <div className="text-white">{plan.name}</div>
//                     </div>
//                     <div className="font-medium text-gray-300">
//                       {plan.email}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </TrainerSidePanel>
//   );
// }

// function CalendarIcon(props) {
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
//       <path d="M8 2v4" />
//       <path d="M16 2v4" />
//       <rect width="18" height="18" x="3" y="4" rx="2" />
//       <path d="M3 10h18" />
//     </svg>
//   );
// }

// function CircleCheckIcon(props) {
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
//       <circle cx="12" cy="12" r="10" />
//       <path d="m9 12 2 2 4-4" />
//     </svg>
//   );
// }

// function DollarSignIcon(props) {
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
//       <line x1="12" x2="12" y1="2" y2="22" />
//       <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//     </svg>
//   );
// }

// function UserIcon(props) {
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
//       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   );
// }


import TrainerSidePanel from "@/Component/TrainerSidePanel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { fetchUsersDetails } from "@/redux/trainerSlice";
import { UsersIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function PlanDetailsComp() {
  const { id } = useParams();
  const { plans, planUserDetails } = useSelector((state) => state.trainer);
  const dispatch = useDispatch();
  const planInfo = plans.find((plan) => plan._id === id);
  console.log("plan info :", planInfo.users);
  useEffect(() => {
    dispatch(fetchUsersDetails(planInfo.users));
  }, [dispatch, planInfo]);

  console.log("planUsersDetails :", planUserDetails);
  function convertDateTime(isoDateTime) {
    // Parse the input ISO 8601 date-time string
    const date = new Date(isoDateTime);

    // Define the desired format options
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    // Convert to the desired format
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <TrainerSidePanel>
      <div className=" items-start justify-start min-h-screen p-6 bg-white mt-[-70px]">
      <div className="w-full max-w-4xl ml-12 space-y-6">

      <header className="w-full">
            <h1 className="text-3xl font-semibold text-black dark:text-white">
              My Plans
            </h1>
            <p className="mt-1 text-black dark:text-gray-400">
              View and manage the plans you are responsible for.
            </p>
          </header>
      </div>
      <div className="flex items-start justify-start min-h-screen p-6 ml-6 ">
     
        <Card className="w-full max-w-3xl border border-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
          <CardHeader className="p-6 border-b border-gray-800 rounded-t-lg bg-gray-950">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-white">
                  {planInfo.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {planInfo.description}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <DollarSignIcon className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-yellow-500">
                    {planInfo.price}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{planInfo.duration}</span>
                </div>
              </div>
            </div>
          </CardHeader>
  
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">
                  {planInfo.users.length} Users
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {planInfo.status === "active" && (
                  <CircleCheckIcon className="w-5 h-5 text-green-500" />
                )}
                <span className="font-medium text-green-500">
                  {planInfo.status}
                </span>
              </div>
            </div>
  
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">
                Created at {convertDateTime(planInfo.createdAt)}
              </span>
            </div>
  
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center mb-3 space-x-2">
                <UsersIcon className="w-5 h-5 text-gray-400" />
                <span className="font-semibold text-gray-400">
                  List of Users
                </span>
              </div>
  
              <div className="space-y-3">
                {planUserDetails.map((plan, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 transition-colors bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800"
                  >
                    <div className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5 text-gray-300 drop-shadow-md" />
                    <div className="text-white">{plan.name}</div>
                    </div>
                    <div className="font-medium text-gray-300">{plan.email}</div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-gray-700">
                  <div className="flex justify-start">
                    <button
                      onClick={() => window.history.back()}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Go Back
                    </button>
                  </div>
                </div>
             
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </TrainerSidePanel>
  );
}  

function CalendarIcon(props) {
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
    </svg>
  );
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
