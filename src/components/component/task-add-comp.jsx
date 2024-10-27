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
      <div className="dark:bg-black dark:text-white">
        <Card className="w-full max-w-4xl border-opacity-20">
          <CardHeader>
            <CardTitle>Create Workout Plan</CardTitle>
            <CardDescription>
              Fill out the details for your client's workout plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* <div className="space-y-2">
                <Label htmlFor="plan-id">Plan ID</Label>
                <Input
                  id="plan-id"
                  type="text"
                  value={planId}
                  readOnly
                  onChange={(e) => setPlanId(e.target.value)}
                />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="justify-start w-full font-normal">
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
              <Card className="border-opacity-20 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Warmup Exercises</h3>
                  <Button onClick={addWarmupExercise}>Add Exercise</Button>
                </div>
                <div className="grid gap-4 pt-4">
                  {warmupExercises.map((exercise, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`warmup-exercise-${index}-name`}>
                          Exercise Name
                        </Label>
                        <Input
                          id={`warmup-exercise-${index}-name`}
                          value={exercise.name}
                          onChange={(e) => {
                            const updatedExercises = [...warmupExercises];
                            updatedExercises[index].name = e.target.value;
                            setWarmupExercises(updatedExercises);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`warmup-exercise-${index}-sets`}>
                          Sets
                        </Label>
                        <Input
                          id={`warmup-exercise-${index}-sets`}
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => {
                            const updatedExercises = [...warmupExercises];
                            updatedExercises[index].sets = parseInt(
                              e.target.value
                            );
                            setWarmupExercises(updatedExercises);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`warmup-exercise-${index}-reps`}>
                          Reps
                        </Label>
                        <Input
                          id={`warmup-exercise-${index}-reps`}
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => {
                            const updatedExercises = [...warmupExercises];
                            updatedExercises[index].reps = parseInt(
                              e.target.value
                            );
                            setWarmupExercises(updatedExercises);
                          }}
                        />
                      </div>
                      <Button
                        variant="profile"
                        onClick={() => removeWarmupExercise(index)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="border-opacity-20 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    Main Workout Exercises
                  </h3>
                  <Button onClick={addMainExercise}>Add Exercise</Button>
                </div>
                <div className="grid gap-4 pt-4">
                  {mainExercises.map((exercise, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`main-exercise-${index}-name`}>
                          Exercise Name
                        </Label>
                        <Input
                          id={`main-exercise-${index}-name`}
                          value={exercise.name}
                          onChange={(e) => {
                            const updatedExercises = [...mainExercises];
                            updatedExercises[index].name = e.target.value;
                            setMainExercises(updatedExercises);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`main-exercise-${index}-sets`}>
                          Sets
                        </Label>
                        <Input
                          id={`main-exercise-${index}-sets`}
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => {
                            const updatedExercises = [...mainExercises];
                            updatedExercises[index].sets = parseInt(
                              e.target.value
                            );
                            setMainExercises(updatedExercises);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`main-exercise-${index}-reps`}>
                          Reps
                        </Label>
                        <Input
                          id={`main-exercise-${index}-reps`}
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => {
                            const updatedExercises = [...mainExercises];
                            updatedExercises[index].reps = parseInt(
                              e.target.value
                            );
                            setMainExercises(updatedExercises);
                          }}
                        />
                      </div>
                      <Button
                        variant="profile"
                        onClick={() => removeMainExercise(index)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="border-opacity-20 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Cooldown Exercises</h3>
                  <Button onClick={addCooldownExercise}>Add Exercise</Button>
                </div>
                <div className="grid gap-4 pt-4">
                  {cooldownExercises.map((exercise, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`cooldown-exercise-${index}-name`}>
                          Exercise Name
                        </Label>
                        <Input
                          id={`cooldown-exercise-${index}-name`}
                          value={exercise.name}
                          onChange={(e) => {
                            const updatedExercises = [...cooldownExercises];
                            updatedExercises[index].name = e.target.value;
                            setCooldownExercises(updatedExercises);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`cooldown-exercise-${index}-sets`}>
                          Sets
                        </Label>
                        <Input
                          id={`cooldown-exercise-${index}-sets`}
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => {
                            const updatedExercises = [...cooldownExercises];
                            updatedExercises[index].sets = parseInt(
                              e.target.value
                            );
                            setCooldownExercises(updatedExercises);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`cooldown-exercise-${index}-reps`}>
                          Reps
                        </Label>
                        <Input
                          id={`cooldown-exercise-${index}-reps`}
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => {
                            const updatedExercises = [...cooldownExercises];
                            updatedExercises[index].reps = parseInt(
                              e.target.value
                            );
                            setCooldownExercises(updatedExercises);
                          }}
                        />
                      </div>
                      <Button
                        variant="profile"
                        onClick={() => removeCooldownExercise(index)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="border-opacity-20 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pre-workout">Pre-Workout Advice</Label>
                  <Textarea
                    id="pre-workout"
                    value={preWorkoutAdvice}
                    onChange={(e) => setPreWorkoutAdvice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-workout">Post-Workout Advice</Label>
                  <Textarea
                    id="post-workout"
                    value={postWorkoutAdvice}
                    onChange={(e) => setPostWorkoutAdvice(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hydration">Daily Hydration</Label>
                  <Textarea
                    id="hydration"
                    value={dailyHydration}
                    onChange={(e) => setDailyHydration(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diet">Balanced Diet Advice</Label>
                  <Textarea
                    id="diet"
                    value={balancedDietAdvice}
                    onChange={(e) => setBalancedDietAdvice(e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={handleSubmit} className="ml-auto">
              Save Workout Plan
            </Button>
          </CardFooter>
          <ToastContainer />
        </Card>
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
