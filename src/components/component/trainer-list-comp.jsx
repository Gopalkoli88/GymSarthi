import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { useDispatch, useSelector } from "react-redux";
import { deleteTrainer, getAllTrainers } from "@/redux/adminSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateTrainerInfo } from "@/redux/trainerSlice";
import { Input } from "../ui/input";

export function TrainerListComp() {
  const dispatch = useDispatch();
  const { trainers } = useSelector((state) => state.admin);
  const [trainerList, setTrainerList] = useState(trainers);
  const [editingTrainer, setEditingTrainer] = useState(null);

  // get all trainers list :
  useEffect(() => {
    dispatch(getAllTrainers());
  }, [dispatch]);

  // delete trainer :
  const handleDeleteTrainer = async (trainerId) => {
    if (!window.confirm("Are you sure you want to delete this trainer?"))
      return;
    setTrainerList(trainerList.filter((p) => p._id !== trainerId));
    const success = await dispatch(deleteTrainer(trainerId));
    try {
      if (success) {
        dispatch(getAllTrainers());
        toast.success("Trainer Deleted Successfully");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  // handle edit trainer info :
  const handleEditTrainer = (trainer) => {
    setEditingTrainer(trainer);
  };

  // handle save trainer :
  const handleSaveTrainer = async () => {
    const success = await dispatch(
      updateTrainerInfo({
        trainerId: editingTrainer._id,
        trainerData: editingTrainer,
      })
    );

    try {
      if (success) {
        setTrainerList(
          trainerList.map((t) =>
            t._id === editingTrainer._id ? editingTrainer : t
          )
        );

        dispatch(getAllTrainers());
        toast.success("Trainer updated Successfully");
      }
      setEditingTrainer(null);
    } catch (error) {
      toast.error(error.message || "An Error Occurred");
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 p-16 sm:gap-8 sm:p-10 ">
      <div className="ml-[-1rem]">
        <header className="w-full ml-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Trainer List
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            View and manage all registered trainers.
          </p>
        </header>
      </div>
      <main className="flex flex-col flex-1 gap-10 md:gap-8 md:p-5 mt-[-2rem]">
        <div className="grid gap-10">
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
                  {/* Name */}
                  <TableCell>
                    {editingTrainer?._id === trainer._id ? (
                      <Input
                        value={editingTrainer.name}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      trainer.name
                    )}
                  </TableCell>

                  {/* Email */}
                  <TableCell>
                    {editingTrainer?._id === trainer._id ? (
                      <Input
                        value={editingTrainer.email}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      trainer.email
                    )}
                  </TableCell>

                  {/* Expertise */}
                  <TableCell>
                    {editingTrainer?._id === trainer._id ? (
                      <Input
                        value={editingTrainer.expertise}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            expertise: e.target.value,
                          })
                        }
                      />
                    ) : (
                      trainer.expertise
                    )}
                  </TableCell>

                  {/* Experience */}
                  <TableCell>
                    {editingTrainer?._id === trainer._id ? (
                      <Input
                        type="number"
                        value={editingTrainer.experience}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            experience: e.target.value,
                          })
                        }
                      />
                    ) : (
                      `${trainer.experience} ${
                        trainer.experience === 1 ? "year" : "years"
                      }`
                    )}
                  </TableCell>

                  {/* Salary */}
                  <TableCell>
                    {editingTrainer?._id === trainer._id ? (
                      <Input
                        type="number"
                        value={editingTrainer.salary}
                        onChange={(e) =>
                          setEditingTrainer({
                            ...editingTrainer,
                            salary: e.target.value,
                          })
                        }
                      />
                    ) : (
                      `₹${trainer.salary || 0}`
                    )}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg transition-all 
      ${
        trainer.status === "Active" || trainer.status === "active"
          ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-green-500/50 hover:shadow-green-600/70"
          : "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-red-500/50 hover:shadow-red-600/70"
      }`}
                    >
                      {trainer.status === "Active" ||
                      trainer.status === "active" ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Inactive
                        </>
                      )}
                    </span>
                  </TableCell>

                  {/* --------- */}
                  <TableCell>
                    {editingTrainer?._id === trainer._id ? (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleSaveTrainer}>
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingTrainer(null)}
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
                          onClick={() => handleEditTrainer(trainer)}
                        >
                          <FilePenIcon className="w-4 h-4" />
                          <span className="sr-only">Edit</span>
                        </Button>{" "}
                        <Button
                          variant="profile"
                          size="icon"
                          onClick={() => handleDeleteTrainer(trainer._id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>{" "}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* </CardContent>
        </Card> */}
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
