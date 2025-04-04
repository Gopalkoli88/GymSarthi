 



import { Button } from "@/components/ui/button";
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createTrainer, getAllTrainers } from "@/redux/adminSlice";
// toast for sending message for action
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateTrainerComp = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTrainerCreation = async (e) => {
    e.preventDefault();

    try {
      // Call the API to create a trainer
      const resultAction = await dispatch(
        createTrainer({ name, email, password, expertise, experience, salary })
      );

      // Check if the action was successful
      if (createTrainer.fulfilled.match(resultAction)) {
        // Fetch the updated list of trainers
        dispatch(getAllTrainers());

        // Clear the form fields
        setName("");
        setEmail("");
        setPassword("");
        setExpertise("");
        setExperience("");
        setSalary(0);
        togglePassword();
        setShowPassword(false);
        toast.success("Trainer Created Successfully");
      } else {
        // Handle failure
        throw new Error(
          resultAction.payload?.message ||
            "An error occurred while creating the trainer."
        );
      }
    } catch (error) {
      // Show error message
      console.log("Error from create trainer:", error.message);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 p-6 sm:gap-8 sm:p-10 mt-[-90px]">
      <header className="w-full ml-12 sm:mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Create New Trainer
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Fill out the form to add a new trainer.
        </p>
      </header>

      <main className="grid flex-1 gap-6 p-6 sm:gap-10 sm:px-12 sm:py-6 md:gap-12 lg:grid-cols-2 xl:grid-cols-3 mt-[-50px]">
        <div className="grid gap-8 lg:col-span-2 xl:col-span-3">
          <Card className="p-8 text-white border border-gray-700 shadow-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl mt-[-50px]">
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter trainer's name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter trainer's email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expertise" className="text-gray-300">
                    Expertise
                  </Label>
                  <Select
                    id="expertise"
                    value={expertise}
                    onValueChange={(value) => setExpertise(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="strength-training">
                        Strength Training
                      </SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-gray-300">
                    Experience (years)
                  </Label>
                  <Input
                    id="experience"
                    type="text"
                    min="0"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Enter years of experience"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary" className="text-gray-300">
                    Salary
                  </Label>
                  <Input
                    id="salary"
                    type="number"
                    min="0"
                    step="0.01"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Enter salary"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full px-5 py-3 text-lg font-semibold text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105"
                type="button"
                onClick={handleTrainerCreation}
              >
                Create Trainer
              </Button>
            </CardFooter>
            <ToastContainer />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateTrainerComp;
