import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { createPlan, getAllPlans } from "@/redux/adminSlice";

// toast for sending message for action
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CreatePlanComp() {
  const { trainers } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [plan, setPlan] = useState({
    name: "",
    price: "", // Set initial value to an empty string
    duration: "",
    description: "",
    trainerId: "", // For single selection
  });
  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    console.log("Plan information:", plan);
    const success = await dispatch(createPlan(plan));
    try {
      if (success) {
        dispatch(getAllPlans());
      }

      setPlan({
        name: "",
        price: "", // Set initial value to an empty string
        duration: "",
        description: "",
        trainerId: "",
      });
      // Add the logic to handle the created plan
      toast.success("Plan created successfully.");
    } catch (error) {
      toast.error(error.message || "Plan not created something wrong");
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 p-6 sm:gap-8 sm:p-10 mt-[-90px]" >
      <header className="w-full ml-12 sm:mb-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Create New Plan
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
        Fill out the form to add a new plan.
        </p>
      </header>
        <main className="grid flex-1 gap-6 p-6 sm:gap-10 sm:px-12 sm:py-6 md:gap-12 lg:grid-cols-2 xl:grid-cols-3 mt-[-50px]">
          <div className="grid gap-8 lg:col-span-2 xl:col-span-3">
            <Card className="p-8 text-white border border-gray-700 shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl mt-[-20px]">
            
              <CardContent className="space-y-8">
                <form onSubmit={handleCreatePlan} className="grid gap-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <Label
                        htmlFor="name"
                        className="font-medium text-gray-300"
                      >
                        Plan Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter plan's name"
                        value={plan.name}
                        onChange={(e) =>
                          setPlan({ ...plan, name: e.target.value })
                        }
                        required
                        className="p-3 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-4">
                      <Label
                        htmlFor="price"
                        className="font-medium text-gray-300"
                      >
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={plan.price}
                        placeholder="Enter price"
                        onChange={(e) =>
                          setPlan({ ...plan, price: e.target.value })
                        }
                        required
                        className="p-3 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <Label
                        htmlFor="duration"
                        className="font-medium text-gray-300"
                      >
                        Duration (in months)
                      </Label>
                      <Input
                        id="duration"
                        value={plan.duration}
                        placeholder="Enter duration"
                        onChange={(e) =>
                          setPlan({ ...plan, duration: e.target.value })
                        }
                        required
                        className="p-3 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-4">
                      <Label
                        htmlFor="description"
                        className="font-medium text-gray-300"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={plan.description}
                        onChange={(e) =>
                          setPlan({ ...plan, description: e.target.value })
                        }
                        required
                        className="p-3 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label
                      htmlFor="trainers"
                      className="font-medium text-gray-300"
                    >
                      Select Trainer
                    </Label>
                    <Select
                      id="trainers"
                      value={plan.trainerId}
                      onValueChange={(value) =>
                        setPlan({ ...plan, trainerId: value })
                      }
                      className="p-3 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select trainer" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainers.map((t) => (
                          <SelectItem key={t._id} value={t._id}>
                            {t.name} - {t.expertise} ({t.experience} years)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-3 text-lg font-semibold text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105"
                  >
                    Create Plan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <ToastContainer />
        </main>
      </div>
    
  );
}
