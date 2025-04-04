import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export const DailyTaskComp = () => {
  const { tasks } = useSelector((state) => state.user);
  console.log("Member tasks:", tasks);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

      return (
        <> 
<div className=" items-start justify-start min-h-screen p-6 bg-white mt-[-70px]">
<DailyTaskHeader /> 
        <div className="p-4 space-y-6 overflow-hidden md:p-6 lg:p-8">
          {tasks?.length ? (
            tasks.map((task, index) => (
              <Card
                key={index}
                className="p-4 text-white border border-gray-700 shadow-lg sm:p-6 md:p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 rounded-xl"
              >
              
                <CardContent className="px-4 py-4 space-y-6 md:px-6">
                  {/* Task Details */}
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <TaskDetail title="Date" content={formatDate(task.date)} />
                    <TaskDetail title="Plan Name" content={task.planId.name} />
                    <TaskDetail title="Member Status" content={task.memberStatus} highlight />
                  </div>
    
                  {/* Exercise Sections */}
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <ExercisesSection title="Warm Up" exercises={task.warmupExercises} />
                    <ExercisesSection title="Main Workout" exercises={task.mainExercises} />
                    <ExercisesSection title="Cool Down" exercises={task.cooldownExercises} />
                  </div>
    
                  {/* Advice Sections */}
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <AdviceCard title="Pre-Workout Advice" advice={task.preWorkoutAdvice} />
                    <AdviceCard title="Post-Workout Advice" advice={task.postWorkoutAdvice} />
                    <AdviceCard title="Daily Hydration" advice={task.dailyHydration} />
                    <AdviceCard title="Balanced Diet" advice={task.balancedDietAdvice} />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="p-6 text-center text-gray-400 bg-gray-900 border border-gray-700 rounded-lg">
            No Daily Task Available
          </div>
          )}
        </div>
        </div>
        </>
      );
    };
    
    // Header Component
    const DailyTaskHeader = () => (
      <header className="w-full px-10">
      <h1 className="text-3xl font-semibold text-black dark:text-white">
        Daily Tasks
      </h1>
      <p className="mt-1 text-black dark:text-gray-400">
        Get in touch with your personal trainer.
      </p>
    </header>
    
    

    );
    
    // Generic Task Detail Component
    const TaskDetail = ({ title, content, highlight = false }) => (
      <div>
        <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
        <p
          className={`mt-2 text-sm text-white ${highlight ? "bg-gray-700 px-2 py-1 rounded-md" : ""}`}
        >
          {content}
        </p>
      </div>
    );
    
    // Exercises Section Component
    const ExercisesSection = ({ title, exercises }) => (
      <div>
        <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
        <ul className="mt-2 space-y-2 text-sm text-white">
          {exercises.map((we, index) => (
            <li key={we._id || index} className="flex flex-wrap items-center gap-2">
              <span>{we.name}</span>
              <span className="text-xs">Reps: {we.reps} | Sets: {we.sets}</span>
            </li>
          ))}
        </ul>
      </div>
    );
    
    // Advice Card Component
    const AdviceCard = ({ title, advice }) => (
      <Card className="bg-[#1E293B] p-4 rounded-xl border  transition-transform duration-300 ease-in-out transform  border-gray-300">
        <h3 className="mb-2 text-base font-bold text-white sm:text-lg">{title}</h3>
        <p className="text-sm text-white">{advice}</p>
      </Card>
    );
    
    export default DailyTaskComp;