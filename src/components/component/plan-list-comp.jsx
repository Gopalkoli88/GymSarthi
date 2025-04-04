import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan, getAllPlans, updatePlan } from "@/redux/adminSlice";

// toast for sending message for action
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function PlanListComp() {
  const dispatch = useDispatch();
  const { plans } = useSelector((state) => state.admin);

  const [planList, setPlanList] = useState(plans);

  console.log("planlist:", planList);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
  };

  const handleSavePlan = async () => {
    const planData = {
      name: editingPlan.name,
      description: editingPlan.description,
      price: editingPlan.price,
      duration: editingPlan.duration,
    };

    const success = await dispatch(
      updatePlan({ planId: editingPlan._id, planData })
    );

    try {
      if (success) {
        setPlanList(
          planList.map((p) => (p._id === editingPlan._id ? editingPlan : p))
        );
        dispatch(getAllPlans());
        toast.success("Plan updated Successfully");
      }
      setEditingPlan(null);
    } catch (error) {
      toast.error(error.message || "An Error Occurred");
    }
  };

  // working Mode :
  const handleDeletePlan = async (planId) => {
    if (!window.confirm("Are you sure you want to delete this plan?"))
      setPlanList(planList.filter((p) => p._id !== planId));
    const success = await dispatch(deletePlan(planId));
    try {
      if (success) {
        dispatch(getAllPlans());
        toast.success("Plan Deleted Successfully");
      }
    } catch (error) {
      toast.error(error.message || "an error occured");
    }
  };
  return (
    <div className="flex flex-col w-full gap-6 p-6 sm:gap-8 sm:p-10 mt-[-50px]">
      <header className="w-full ml-12 sm:mb-1">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Plans
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          View and manage all registered trainers.
        </p>
      </header>

      <main className="flex flex-col flex-1 gap-10 md:gap-8 md:p-5 mt-[-50px]">
        <div className="grid gap-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan._id}>
                  {/* ------------- */}
                  <TableCell>
                    {editingPlan?._id === plan._id ? (
                      <Input
                        value={editingPlan.name}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      plan.name
                    )}
                  </TableCell>

                  {/* ------------------- */}
                  <TableCell>
                    {editingPlan?._id === plan._id ? (
                      <Input
                        type="number"
                        value={editingPlan.price}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            price: Number(e.target.value),
                          })
                        }
                      />
                    ) : (
                      `₹${plan.price.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingPlan?._id === plan._id ? (
                      <Textarea
                        value={editingPlan.description}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      plan.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editingPlan?._id === plan._id ? (
                      <Textarea
                        value={editingPlan.duration}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            duration: e.target.value,
                          })
                        }
                      />
                    ) : (
                      `${plan.duration} ${
                        plan.duration === 1 ? "month" : "months"
                      }`
                    )}
                  </TableCell>

                  <TableCell>
                    {editingPlan?._id === plan._id ? (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleSavePlan}>
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingPlan(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          className="bg-green-500"
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditPlan(plan)}
                        >
                          <FilePenIcon className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </Button>

                        <Button
                          className="bg-red-600"
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeletePlan(plan._id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
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
