 


import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
 import { useSelector } from "react-redux";
 import { Button } from "@/components/ui/button";


export const DailyTaskComp = () => {
  const { tasks, user } = useSelector((state) => state.user);
  console.log("Member tasks :", tasks);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="space-y-6 overflow-hidden">
      {tasks && tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Card
            key={index}
            className="h-auto bg-blue-400 border border-blue-600 rounded-lg shadow-md space-y-4 p-4"
          >
            <DailyTaskHeader />
            <CardContent className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <TaskDate date={task.date} formatDate={formatDate} />
                <PlanName planName={task.planId.name} />
                <MemberStatus status={task.memberStatus} />
                </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ExercisesSection title="Warm Up Exercises" exercises={task.warmupExercises} />
                <ExercisesSection title="Main Exercises" exercises={task.mainExercises} />
                <ExercisesSection title="Cool Down Exercises" exercises={task.cooldownExercises} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <AdviceCard title="Pre-Workout Advice" advice={task.preWorkoutAdvice} />
                <AdviceCard title="Post-Workout Advice" advice={task.postWorkoutAdvice} />
                <AdviceCard title="Daily Hydration" advice={task.dailyHydration} />
                <AdviceCard title="Balanced Diet Advice" advice={task.balancedDietAdvice} />
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
 
        <Button className="m-2">No Tasks</Button>

      )}
    </div>
  );
};

const DailyTaskHeader = () => (
  <CardHeader className="bg-[#000000] rounded-t-xl px-6 py-4">
    <h3 className="text-xl font-bold text-white font-['Poppins', 'sans-serif']">
      Daily Tasks
    </h3>
  </CardHeader>
);

const TaskDate = ({ date, formatDate }) => (
  <div>
    <h3 className="text-lg font-bold text-white font-['Poppins', 'sans-serif']">Date</h3>
    <ul className="mt-2 space-y-2 text-white font-['Poppins', 'sans-serif'] text-sm">
      <li className="flex items-center gap-2">
        <span>{formatDate(date)}</span>
      </li>
    </ul>
  </div>
);

const PlanName = ({ planName }) => (
  <div>
    <h3 className="text-lg font-bold text-white font-['Poppins', 'sans-serif']">Plan Name</h3>
    <ul className="mt-2 space-y-2 text-white font-['Poppins', 'sans-serif'] text-sm">
      <li className="flex items-center gap-2">
        <span>{planName}</span>
      </li>
    </ul>
  </div>
);

const MemberStatus = ({ status }) => (
  <div>
    <h3 className="text-lg font-bold text-white font-['Poppins', 'sans-serif']">Member Status</h3>
    <ul className="mt-2 space-y-2 text-white font-['Poppins', 'sans-serif'] text-sm">
      <li className="flex items-center gap-2">
        <div className="rounded-full bg-[#1f2937] px-2 py-1 text-sm font-medium text-white">
          {status}
        </div>
      </li>
    </ul>
  </div>
);

const CreatedDate = ({ createdAt, formatDate }) => (
  <div>
    <h3 className="text-lg font-bold text-white font-['Poppins', 'sans-serif']">Created Date</h3>
    <ul className="mt-2 space-y-2 text-white font-['Poppins', 'sans-serif'] text-sm">
      <li className="flex items-center gap-2">
        <span>{formatDate(createdAt)}</span>
      </li>
    </ul>
  </div>
);

const ExercisesSection = ({ title, exercises }) => (
  <div>
    <h3 className="text-lg font-bold text-white font-['Poppins', 'sans-serif']">{title}</h3>
    <ul className="mt-2 space-y-2 text-white font-['Poppins', 'sans-serif'] text-sm">
      {exercises.map((we) => (
        <li key={we._id} className="flex flex-row items-center gap-1">
          <div className="flex items-center gap-2">
            <span>{we.name}</span>
          </div>
          <div className="ml-4 text-xs">
            <span>Reps: {we.reps}</span> | <span>Sets: {we.sets}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const AdviceCard = ({ title, advice }) => (
  <Card
    className="bg-[#000000] p-3 rounded-xl border border-blue-500 relative transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
    style={{ zIndex: 10 }} // Ensures it's on top during hover without affecting layout
  >
    <div className="p-4">
      <h3 className="text-lg font-bold text-white font-['Poppins', 'sans-serif']">
        {title}
      </h3>
      <p className="text-white">{advice}</p>
    </div>
  </Card>
);

export default DailyTaskComp;
