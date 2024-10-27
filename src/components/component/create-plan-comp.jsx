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
    trainerId: null, // For single selection
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
    <main className="flex w-10/15 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreatePlan} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={plan.name}
                    onChange={(e) => setPlan({ ...plan, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={plan.price}
                    placeholder="Enter price" // Optional placeholder for price input
                    onChange={(e) =>
                      setPlan({
                        ...plan,
                        price: e.target.value, // Keep as string
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={plan.duration}
                    onChange={(e) =>
                      setPlan({ ...plan, duration: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={plan.description}
                    onChange={(e) =>
                      setPlan({
                        ...plan,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainers">Trainer</Label>
                <Select
                  id="trainers"
                  value={plan.trainerId}
                  onValueChange={(value) =>
                    setPlan({
                      ...plan,
                      trainerId: value,
                    })
                  }
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
              <Button type="submit">Create Plan</Button>
            </form>
          </CardContent>
        </Card>
        <Card>{/* Add plan list component here if needed */}</Card>
      </div>
      <ToastContainer/>
    </main>
  );
}
