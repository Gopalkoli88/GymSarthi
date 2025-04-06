// import { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { useDispatch } from "react-redux";
// import { createTaskForMember } from "@/redux/trainerSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TrainerSidePanel from "@/Component/TrainerSidePanel";

// export function TaskAddComp(id) {
//   const dispatch = useDispatch();

//   const [planId, setPlanId] = useState(id.planId);

//   const [date, setDate] = useState(null);
//   const [warmupExercises, setWarmupExercises] = useState([
//     { name: "", sets: 0, reps: 0 },
//   ]);
//   const [mainExercises, setMainExercises] = useState([
//     { name: "", sets: 0, reps: 0 },
//   ]);
//   const [cooldownExercises, setCooldownExercises] = useState([
//     { name: "", sets: 0, reps: 0 },
//   ]);
//   const [preWorkoutAdvice, setPreWorkoutAdvice] = useState("");
//   const [postWorkoutAdvice, setPostWorkoutAdvice] = useState("");
//   const [dailyHydration, setDailyHydration] = useState("");
//   const [balancedDietAdvice, setBalancedDietAdvice] = useState("");
//   const [status, setStatus] = useState("pending");

//   const addWarmupExercise = () => {
//     setWarmupExercises([...warmupExercises, { name: "", sets: 0, reps: 0 }]);
//   };
//   const removeWarmupExercise = (index) => {
//     const updatedExercises = [...warmupExercises];
//     updatedExercises.splice(index, 1);
//     setWarmupExercises(updatedExercises);
//   };
//   const addMainExercise = () => {
//     setMainExercises([...mainExercises, { name: "", sets: 0, reps: 0 }]);
//   };
//   const removeMainExercise = (index) => {
//     const updatedExercises = [...mainExercises];
//     updatedExercises.splice(index, 1);
//     setMainExercises(updatedExercises);
//   };
//   const addCooldownExercise = () => {
//     setCooldownExercises([
//       ...cooldownExercises,
//       { name: "", sets: 0, reps: 0 },
//     ]);
//   };
//   const removeCooldownExercise = (index) => {
//     const updatedExercises = [...cooldownExercises];
//     updatedExercises.splice(index, 1);
//     setCooldownExercises(updatedExercises);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const taskData = {
//         planId,
//         date: date ? date.toISOString() : null,
//         warmupExercises,
//         mainExercises,
//         cooldownExercises,
//         preWorkoutAdvice,
//         postWorkoutAdvice,
//         dailyHydration,
//         balancedDietAdvice,
//         status,
//       };

//       const success = await dispatch(createTaskForMember(taskData));
//       if (createTaskForMember.fulfilled.match(success)) {
//         toast.success("Task Added to All Members Successfully");
//         setWarmupExercises([{ name: "", sets: 0, reps: 0 }]);
//         setMainExercises([{ name: "", sets: 0, reps: 0 }]);
//         setCooldownExercises([{ name: "", sets: 0, reps: 0 }]);
//         setPreWorkoutAdvice("");
//         setPostWorkoutAdvice("");
//         setDailyHydration("");
//         setBalancedDietAdvice("");
//         setStatus("");
//       } else {
//         throw new Error(
//           success.payload?.message ||
//             "An error occurred while creating the trainer."
//         );
//       }
//     } catch (error) {
//       toast.error(error.message || "An error occured");
//     }
//   };
  
//   return (
//     <TrainerSidePanel>
//       {" "}
//       <div className="flex items-start justify-start min-h-screen p-6 bg-white mt-[-70px]">
//       <div className="w-full max-w-4xl ml-12 space-y-6">
//       <header className="w-full">
//             <h1 className="text-3xl font-semibold text-black dark:text-white">
//             Create Workout Plan
//             </h1>
//             <p className="mt-1 text-black dark:text-gray-400">
//             Fill out the details for your client's workout plan.
//             </p>
//           </header>
//       <div className="flex items-center justify-center min-h-screen">
//       <Card className="w-full max-w-4xl border-opacity-20 mt-[50px]">
   
//           <CardContent className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
 
//               <div className="space-y-2">
//                 <Label className="text-white" htmlFor="date">Date</Label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     {/* <Button className="justify-start w-full font-normal"> */}
//                        <Button
//                       className="justify-start w-full font-normal text-white transition-transform bg-green-500 shadow-lg">
//                       <CalendarDaysIcon className="w-4 h-4 mr-2" />
//                       {date ? date.toLocaleDateString() : "Select a date"}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                       mode="single"
//                       selected={date}
//                       onSelect={setDate}
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <Card className="p-8 text-white border border-gray-700 shadow-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold text-gray-100">
//                     Warmup Exercises
//                   </h3>
//                   <Button
//                     onClick={addWarmupExercise}
//                     className="px-4 py-2 text-white transition-transform rounded-lg shadow-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
//                   >
//                     + Add Exercise
//                   </Button>
//                 </div>

//                 <div className="grid gap-6 pt-4">
//                   {warmupExercises.map((exercise, index) => (
//                     <div
//                       key={index}
//                       className="grid grid-cols-4 gap-4 p-4 border border-gray-700 rounded-lg shadow-md bg-gray-900/50"
//                     >
//                       {/* Exercise Name */}
//                       <div className="space-y-2">
//                         <Label
//                           className="text-gray-300"
//                           htmlFor={`warmup-exercise-${index}-name`}
//                         >
//                           Exercise Name
//                         </Label>
//                         <Input
//                           id={`warmup-exercise-${index}-name`}
//                           value={exercise.name}
//                           className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           onChange={(e) => {
//                             const updatedExercises = [...warmupExercises];
//                             updatedExercises[index].name = e.target.value;
//                             setWarmupExercises(updatedExercises);
//                           }}
//                         />
//                       </div>

//                       {/* Sets */}
//                       <div className="space-y-2">
//                         <Label
//                           className="text-gray-300"
//                           htmlFor={`warmup-exercise-${index}-sets`}
//                         >
//                           Sets
//                         </Label>
//                         <Input
//                           id={`warmup-exercise-${index}-sets`}
//                           type="number"
//                           value={exercise.sets}
//                           className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           onChange={(e) => {
//                             const updatedExercises = [...warmupExercises];
//                             updatedExercises[index].sets = parseInt(
//                               e.target.value
//                             );
//                             setWarmupExercises(updatedExercises);
//                           }}
//                         />
//                       </div>

//                       {/* Reps */}
//                       <div className="space-y-2">
//                         <Label
//                           className="text-gray-300"
//                           htmlFor={`warmup-exercise-${index}-reps`}
//                         >
//                           Reps
//                         </Label>
//                         <Input
//                           id={`warmup-exercise-${index}-reps`}
//                           type="number"
//                           value={exercise.reps}
//                           className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           onChange={(e) => {
//                             const updatedExercises = [...warmupExercises];
//                             updatedExercises[index].reps = parseInt(
//                               e.target.value
//                             );
//                             setWarmupExercises(updatedExercises);
//                           }}
//                         />
//                       </div>

//                       {/* Delete Button */}
//                       <div className="flex items-end justify-end">
//                         <Button
//                           variant="destructive"
//                           onClick={() => removeWarmupExercise(index)}
//                           className="p-2 transition-transform bg-red-600 rounded-lg hover:scale-105 hover:bg-red-700"
//                         >
//                           <TrashIcon className="w-5 h-5 text-white" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Card>

//               <Card className="p-8 text-white border border-gray-700 shadow-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold text-gray-100">
//                     Main Workout Exercises
//                   </h3>
//                   <Button
//                     onClick={addMainExercise}
//                     className="px-4 py-2 text-white transition-transform rounded-lg shadow-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
//                   >
//                     + Add Exercise
//                   </Button>
//                 </div>

//                 <div className="grid gap-6 pt-4">
//                   {mainExercises.map((exercise, index) => (
//                     <div
//                       key={index}
//                       className="grid grid-cols-4 gap-4 p-4 border border-gray-700 rounded-lg shadow-md bg-gray-900/50"
//                     >
//                       {/* Exercise Name */}
//                       <div className="space-y-2">
//                         <Label
//                           className="text-gray-300"
//                           htmlFor={`main-exercise-${index}-name`}
//                         >
//                           Exercise Name
//                         </Label>
//                         <Input
//                           id={`main-exercise-${index}-name`}
//                           value={exercise.name}
//                           className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           onChange={(e) => {
//                             const updatedExercises = [...mainExercises];
//                             updatedExercises[index].name = e.target.value;
//                             setMainExercises(updatedExercises);
//                           }}
//                         />
//                       </div>

//                       {/* Sets */}
//                       <div className="space-y-2">
//                         <Label
//                           className="text-gray-300"
//                           htmlFor={`main-exercise-${index}-sets`}
//                         >
//                           Sets
//                         </Label>
//                         <Input
//                           id={`main-exercise-${index}-sets`}
//                           type="number"
//                           value={exercise.sets}
//                           className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           onChange={(e) => {
//                             const updatedExercises = [...mainExercises];
//                             updatedExercises[index].sets = parseInt(
//                               e.target.value
//                             );
//                             setMainExercises(updatedExercises);
//                           }}
//                         />
//                       </div>

//                       {/* Reps */}
//                       <div className="space-y-2">
//                         <Label
//                           className="text-gray-300"
//                           htmlFor={`main-exercise-${index}-reps`}
//                         >
//                           Reps
//                         </Label>
//                         <Input
//                           id={`main-exercise-${index}-reps`}
//                           type="number"
//                           value={exercise.reps}
//                           className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           onChange={(e) => {
//                             const updatedExercises = [...mainExercises];
//                             updatedExercises[index].reps = parseInt(
//                               e.target.value
//                             );
//                             setMainExercises(updatedExercises);
//                           }}
//                         />
//                       </div>

//                       {/* Delete Button */}
//                       <div className="flex items-end justify-end">
//                         <Button
//                           variant="destructive"
//                           onClick={() => removeMainExercise(index)}
//                           className="p-2 transition-transform bg-red-600 rounded-lg hover:scale-105 hover:bg-red-700"
//                         >
//                           <TrashIcon className="w-5 h-5 text-white" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Card>

//               <Card className="p-8 text-white border border-gray-700 shadow-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold text-gray-100">
//                     Cooldown Exercises
//                   </h3>
//                   <Button
//                     onClick={addCooldownExercise}
//                     className="px-4 py-2 text-white transition-transform rounded-lg shadow-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
//                   >
//                     + Add Exercise
//                   </Button>
//                 </div>

//                 <div className="grid gap-6 pt-4">
//                   {cooldownExercises.map((exercise, index) => (
//                     <div
//                       key={index}
//                       className="grid grid-cols-4 gap-4 p-4 border border-gray-700 rounded-lg shadow-md bg-gray-900/50"
//                     >
//                       {/* Exercise Name */}
//                       <div className="space-y-2">
//                         <Label
//                           className="text-gray-300"
//                           htmlFor={`cooldown-exercise-${index}-name`}
//                         >
//                           Exercise Name
//                         </Label>
//                         <Input
//                           id={`cooldown-exercise-${index}-name`}
//                           value={exercise.name}
//                           className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           onChange={(e) => {
//                             const updatedExercises = [...cooldownExercises];
//                             updatedExercises[index].name = e.target.value;
//                             setCooldownExercises(updatedExercises);
//                           }}
//                         />
//                       </div>

//                       {/* Sets */}
//                       <div className="space-y-2">
//                         <Label
//                           className="text-gray-300"
//                           htmlFor={`cooldown-exercise-${index}-sets`}
//                         >
//                           Sets
//                         </Label>
//                         <Input
//                           id={`cooldown-exercise-${index}-sets`}
//                           type="number"
//                           value={exercise.sets}
//                           className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           onChange={(e) => {
//                             const updatedExercises = [...cooldownExercises];
//                             updatedExercises[index].sets = parseInt(
//                               e.target.value
//                             );
//                             setCooldownExercises(updatedExercises);
//                           }}
//                         />
//                       </div>

//                       {/* Reps */}
//                       <div className="space-y-2">
//                         <Label
//                           className="text-gray-300"
//                           htmlFor={`cooldown-exercise-${index}-reps`}
//                         >
//                           Reps
//                         </Label>
//                         <Input
//                           id={`cooldown-exercise-${index}-reps`}
//                           type="number"
//                           value={exercise.reps}
//                           className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
//                           onChange={(e) => {
//                             const updatedExercises = [...cooldownExercises];
//                             updatedExercises[index].reps = parseInt(
//                               e.target.value
//                             );
//                             setCooldownExercises(updatedExercises);
//                           }}
//                         />
//                       </div>

//                       {/* Delete Button */}
//                       <div className="flex items-end justify-end">
//                         <Button
//                           variant="destructive"
//                           onClick={() => removeCooldownExercise(index)}
//                           className="p-2 transition-transform bg-red-600 rounded-lg hover:scale-105 hover:bg-red-700"
//                         >
//                           <TrashIcon className="w-5 h-5 text-white" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Card>
//             </div>

//             <Card className="p-6 text-white bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="space-y-3">
//                   <Label htmlFor="pre-workout" className="text-gray-300">
//                     Pre-Workout Advice
//                   </Label>
//                   <Textarea
//                     id="pre-workout"
//                     value={preWorkoutAdvice}
//                     onChange={(e) => setPreWorkoutAdvice(e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-3">
//                   <Label htmlFor="post-workout" className="text-gray-300">
//                     Post-Workout Advice
//                   </Label>
//                   <Textarea
//                     id="post-workout"
//                     value={postWorkoutAdvice}
//                     onChange={(e) => setPostWorkoutAdvice(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-6 mt-6">
//                 <div className="space-y-3">
//                   <Label htmlFor="hydration" className="text-gray-300">
//                     Daily Hydration
//                   </Label>
//                   <Textarea
//                     id="hydration"
//                     value={dailyHydration}
//                     onChange={(e) => setDailyHydration(e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-3">
//   <Label htmlFor="diet" className="text-gray-300 ">
//     Balanced Diet Advice
//   </Label>
//   <Textarea
//     id="diet"
//     value={balancedDietAdvice}
//     onChange={(e) => setBalancedDietAdvice(e.target.value)}
//   />
// </div>

//               </div>
//             </Card>

        
//           </CardContent>
//           <CardFooter>
//             <Button type="submit" onClick={handleSubmit}  className="w-full py-3 font-semibold transition duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 hover:scale-105"
//             >
//               Save Workout Plan
//             </Button>
//           </CardFooter>
//           <ToastContainer />
//         </Card>
//       </div>
//       </div>
//       </div>
//     </TrainerSidePanel>
//   );
// }

// function CalendarDaysIcon(props) {
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
//       <path d="M8 14h.01" />
//       <path d="M12 14h.01" />
//       <path d="M16 14h.01" />
//       <path d="M8 18h.01" />
//       <path d="M12 18h.01" />
//       <path d="M16 18h.01" />
//     </svg>
//   );
// }

// function TrashIcon(props) {
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
//       <path d="M3 6h18" />
//       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//     </svg>
//   );
// }
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { createTaskForMember } from "@/redux/trainerSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrainerSidePanel from "@/Component/TrainerSidePanel";

export function TaskAddComp(id) {
  const dispatch = useDispatch();

  const [planId, setPlanId] = useState(id.planId);

  const [date, setDate] = useState(null);
  const [warmupExercises, setWarmupExercises] = useState([
    { name: "", sets: 0, reps: 0 },
  ]);
  const [mainExercises, setMainExercises] = useState([
    { name: "", sets: 0, reps: 0 },
  ]);
  const [cooldownExercises, setCooldownExercises] = useState([
    { name: "", sets: 0, reps: 0 },
  ]);
  const [preWorkoutAdvice, setPreWorkoutAdvice] = useState("");
  const [postWorkoutAdvice, setPostWorkoutAdvice] = useState("");
  const [dailyHydration, setDailyHydration] = useState("");
  const [balancedDietAdvice, setBalancedDietAdvice] = useState("");
  const [status, setStatus] = useState("pending");

  const addWarmupExercise = () => {
    setWarmupExercises([...warmupExercises, { name: "", sets: 0, reps: 0 }]);
  };
  const removeWarmupExercise = (index) => {
    const updatedExercises = [...warmupExercises];
    updatedExercises.splice(index, 1);
    setWarmupExercises(updatedExercises);
  };
  const addMainExercise = () => {
    setMainExercises([...mainExercises, { name: "", sets: 0, reps: 0 }]);
  };
  const removeMainExercise = (index) => {
    const updatedExercises = [...mainExercises];
    updatedExercises.splice(index, 1);
    setMainExercises(updatedExercises);
  };
  const addCooldownExercise = () => {
    setCooldownExercises([
      ...cooldownExercises,
      { name: "", sets: 0, reps: 0 },
    ]);
  };
  const removeCooldownExercise = (index) => {
    const updatedExercises = [...cooldownExercises];
    updatedExercises.splice(index, 1);
    setCooldownExercises(updatedExercises);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskData = {
        planId,
        date: date ? date.toISOString() : null,
        warmupExercises,
        mainExercises,
        cooldownExercises,
        preWorkoutAdvice,
        postWorkoutAdvice,
        dailyHydration,
        balancedDietAdvice,
        status,
      };

      const success = await dispatch(createTaskForMember(taskData));
      if (createTaskForMember.fulfilled.match(success)) {
        toast.success("Task Added to All Members Successfully");
        setWarmupExercises([{ name: "", sets: 0, reps: 0 }]);
        setMainExercises([{ name: "", sets: 0, reps: 0 }]);
        setCooldownExercises([{ name: "", sets: 0, reps: 0 }]);
        setPreWorkoutAdvice("");
        setPostWorkoutAdvice("");
        setDailyHydration("");
        setBalancedDietAdvice("");
        setStatus("");
      } else {
        throw new Error(
          success.payload?.message ||
            "An error occurred while creating the trainer."
        );
      }
    } catch (error) {
      toast.error(error.message || "An error occured");
    }
  };

  return (
    <TrainerSidePanel>
      {" "}
      <div className="flex items-start justify-start min-h-screen p-6 bg-white mt-[-70px]">
        <div className="w-full max-w-4xl ml-12 space-y-6">
          <header className="w-full">
            <h1 className="text-3xl font-semibold text-black dark:text-white">
              Create Workout Plan
            </h1>
            <p className="mt-1 text-black dark:text-gray-400">
              Fill out the details for your client's workout plan.
            </p>
          </header>
          <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-4xl border-opacity-20 mt-[50px]">
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white" htmlFor="date">
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        {/* <Button className="justify-start w-full font-normal"> */}
                        <Button className="justify-start w-full font-normal text-white transition-transform bg-green-500 shadow-lg">
                          <CalendarDaysIcon className="w-4 h-4 mr-2" />
                          {date ? date.toLocaleDateString() : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-4">
                  <Card className="p-8 text-white border border-gray-700 shadow-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-100">
                        Warmup Exercises
                      </h3>
                      <Button
                        onClick={addWarmupExercise}
                        className="px-4 py-2 text-white transition-transform rounded-lg shadow-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
                      >
                        + Add Exercise
                      </Button>
                    </div>

                    <div className="grid gap-6 pt-4">
                      {warmupExercises.map((exercise, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-4 gap-4 p-4 border border-gray-700 rounded-lg shadow-md bg-gray-900/50"
                        >
                          {/* Exercise Name */}
                          <div className="space-y-2">
                            <Label
                              className="text-gray-300"
                              htmlFor={`warmup-exercise-${index}-name`}
                            >
                              Exercise Name
                            </Label>
                            <Input
                              id={`warmup-exercise-${index}-name`}
                              value={exercise.name}
                              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const updatedExercises = [...warmupExercises];
                                updatedExercises[index].name = e.target.value;
                                setWarmupExercises(updatedExercises);
                              }}
                            />
                          </div>

                          {/* Sets */}
                          <div className="space-y-2">
                            <Label
                              className="text-gray-300"
                              htmlFor={`warmup-exercise-${index}-sets`}
                            >
                              Sets
                            </Label>
                            <Input
                              id={`warmup-exercise-${index}-sets`}
                              type="number"
                              value={exercise.sets}
                              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const updatedExercises = [...warmupExercises];
                                updatedExercises[index].sets = parseInt(
                                  e.target.value
                                );
                                setWarmupExercises(updatedExercises);
                              }}
                            />
                          </div>

                          {/* Reps */}
                          <div className="space-y-2">
                            <Label
                              className="text-gray-300"
                              htmlFor={`warmup-exercise-${index}-reps`}
                            >
                              Reps
                            </Label>
                            <Input
                              id={`warmup-exercise-${index}-reps`}
                              type="number"
                              value={exercise.reps}
                              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const updatedExercises = [...warmupExercises];
                                updatedExercises[index].reps = parseInt(
                                  e.target.value
                                );
                                setWarmupExercises(updatedExercises);
                              }}
                            />
                          </div>

                          {/* Delete Button */}
                          <div className="flex items-end justify-end">
                            <Button
                              variant="destructive"
                              onClick={() => removeWarmupExercise(index)}
                              className="p-2 transition-transform bg-red-600 rounded-lg hover:scale-105 hover:bg-red-700"
                            >
                              <TrashIcon className="w-5 h-5 text-white" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-8 text-white border border-gray-700 shadow-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-100">
                        Main Workout Exercises
                      </h3>
                      <Button
                        onClick={addMainExercise}
                        className="px-4 py-2 text-white transition-transform rounded-lg shadow-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
                      >
                        + Add Exercise
                      </Button>
                    </div>

                    <div className="grid gap-6 pt-4">
                      {mainExercises.map((exercise, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-4 gap-4 p-4 border border-gray-700 rounded-lg shadow-md bg-gray-900/50"
                        >
                          {/* Exercise Name */}
                          <div className="space-y-2">
                            <Label
                              className="text-gray-300"
                              htmlFor={`main-exercise-${index}-name`}
                            >
                              Exercise Name
                            </Label>
                            <Input
                              id={`main-exercise-${index}-name`}
                              value={exercise.name}
                              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const updatedExercises = [...mainExercises];
                                updatedExercises[index].name = e.target.value;
                                setMainExercises(updatedExercises);
                              }}
                            />
                          </div>

                          {/* Sets */}
                          <div className="space-y-2">
                            <Label
                              className="text-gray-300"
                              htmlFor={`main-exercise-${index}-sets`}
                            >
                              Sets
                            </Label>
                            <Input
                              id={`main-exercise-${index}-sets`}
                              type="number"
                              value={exercise.sets}
                              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const updatedExercises = [...mainExercises];
                                updatedExercises[index].sets = parseInt(
                                  e.target.value
                                );
                                setMainExercises(updatedExercises);
                              }}
                            />
                          </div>

                          {/* Reps */}
                          <div className="space-y-2">
                            <Label
                              className="text-gray-300"
                              htmlFor={`main-exercise-${index}-reps`}
                            >
                              Reps
                            </Label>
                            <Input
                              id={`main-exercise-${index}-reps`}
                              type="number"
                              value={exercise.reps}
                              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const updatedExercises = [...mainExercises];
                                updatedExercises[index].reps = parseInt(
                                  e.target.value
                                );
                                setMainExercises(updatedExercises);
                              }}
                            />
                          </div>

                          {/* Delete Button */}
                          <div className="flex items-end justify-end">
                            <Button
                              variant="destructive"
                              onClick={() => removeMainExercise(index)}
                              className="p-2 transition-transform bg-red-600 rounded-lg hover:scale-105 hover:bg-red-700"
                            >
                              <TrashIcon className="w-5 h-5 text-white" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-8 text-white border border-gray-700 shadow-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-100">
                        Cooldown Exercises
                      </h3>
                      <Button
                        onClick={addCooldownExercise}
                        className="px-4 py-2 text-white transition-transform rounded-lg shadow-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105 hover:shadow-xl"
                      >
                        + Add Exercise
                      </Button>
                    </div>

                    <div className="grid gap-6 pt-4">
                      {cooldownExercises.map((exercise, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-4 gap-4 p-4 border border-gray-700 rounded-lg shadow-md bg-gray-900/50"
                        >
                          {/* Exercise Name */}
                          <div className="space-y-2">
                            <Label
                              className="text-gray-300"
                              htmlFor={`cooldown-exercise-${index}-name`}
                            >
                              Exercise Name
                            </Label>
                            <Input
                              id={`cooldown-exercise-${index}-name`}
                              value={exercise.name}
                              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const updatedExercises = [...cooldownExercises];
                                updatedExercises[index].name = e.target.value;
                                setCooldownExercises(updatedExercises);
                              }}
                            />
                          </div>

                          {/* Sets */}
                          <div className="space-y-2">
                            <Label
                              className="text-gray-300"
                              htmlFor={`cooldown-exercise-${index}-sets`}
                            >
                              Sets
                            </Label>
                            <Input
                              id={`cooldown-exercise-${index}-sets`}
                              type="number"
                              value={exercise.sets}
                              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const updatedExercises = [...cooldownExercises];
                                updatedExercises[index].sets = parseInt(
                                  e.target.value
                                );
                                setCooldownExercises(updatedExercises);
                              }}
                            />
                          </div>

                          {/* Reps */}
                          <div className="space-y-2">
                            <Label
                              className="text-gray-300"
                              htmlFor={`cooldown-exercise-${index}-reps`}
                            >
                              Reps
                            </Label>
                            <Input
                              id={`cooldown-exercise-${index}-reps`}
                              type="number"
                              value={exercise.reps}
                              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                              onChange={(e) => {
                                const updatedExercises = [...cooldownExercises];
                                updatedExercises[index].reps = parseInt(
                                  e.target.value
                                );
                                setCooldownExercises(updatedExercises);
                              }}
                            />
                          </div>

                          {/* Delete Button */}
                          <div className="flex items-end justify-end">
                            <Button
                              variant="destructive"
                              onClick={() => removeCooldownExercise(index)}
                              className="p-2 transition-transform bg-red-600 rounded-lg hover:scale-105 hover:bg-red-700"
                            >
                              <TrashIcon className="w-5 h-5 text-white" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <Card className="p-6 text-white bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="pre-workout" className="text-gray-300">
                        Pre-Workout Advice
                      </Label>
                      <Textarea
                        id="pre-workout"
                        value={preWorkoutAdvice}
                        onChange={(e) => setPreWorkoutAdvice(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="post-workout" className="text-gray-300">
                        Post-Workout Advice
                      </Label>
                      <Textarea
                        id="post-workout"
                        value={postWorkoutAdvice}
                        onChange={(e) => setPostWorkoutAdvice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-6">
                    <div className="space-y-3">
                      <Label htmlFor="hydration" className="text-gray-300">
                        Daily Hydration
                      </Label>
                      <Textarea
                        id="hydration"
                        value={dailyHydration}
                        onChange={(e) => setDailyHydration(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="diet" className="text-gray-300 ">
                        Balanced Diet Advice
                      </Label>
                      <Textarea
                        id="diet"
                        value={balancedDietAdvice}
                        onChange={(e) => setBalancedDietAdvice(e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full py-3 font-semibold transition duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 hover:scale-105"
                >
                  Save Workout Plan
                </Button>
                
                
                <Button
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
                    </Button>
              </CardFooter>
              <ToastContainer />
            </Card>
          </div>
        </div>
      </div>
    </TrainerSidePanel>
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

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
