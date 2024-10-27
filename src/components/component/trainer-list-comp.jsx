import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
import {
  deletePlan,
  deleteTrainer,
  getAllPlans,
  getAllTrainers,
  updatePlan,
} from "@/redux/adminSlice";

export function TrainerListComp() {
  const dispatch = useDispatch();
  const { trainers } = useSelector((state) => state.admin);

  const [trainerList, setTrainerList] = useState(trainers);
  useEffect(() => {
    dispatch(getAllTrainers());
  }, [dispatch]);

  // working Mode :
  const handleDeleteTrainer = async (trainerId) => {
    setTrainerList(trainerList.filter((p) => p._id !== trainerId));
    const success = await dispatch(deleteTrainer(trainerId));
    if (success) {
      dispatch(getAllTrainers());
    }
  };
  return (
    <main className="flex flex-1 flex-col gap-10  md:gap-8 md:p-6">
      <div className="grid gap-10">
        <Card>
          <CardHeader>
            <CardTitle>Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Expertise</TableHead>

                  <TableHead>Experience</TableHead>

                  <TableHead>Salary</TableHead>
                  <TableHead>Status</TableHead>

                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainers.map((trainer) => (
                  
                  <TableRow key={trainer._id}>
                    <TableCell>{trainer.name}</TableCell>
                    <TableCell>{trainer.email}</TableCell>
                    <TableCell>{trainer.expertise}</TableCell>
                    <TableCell>{trainer.experience}</TableCell>
                    <TableCell>${trainer.salary || 0}</TableCell>
                    <TableCell>${trainer.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="profile"
                        size="icon"
                        onClick={() => handleDeleteTrainer(trainer._id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
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
