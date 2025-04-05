import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainerSchedule } from "../redux/classSlice";
import TrainerSidePanel from "./TrainerSidePanel";
import { toast, ToastContainer } from "react-toastify";

const TrainerSchedule = () => {
  const dispatch = useDispatch();
  const { classes, status, error } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(fetchTrainerSchedule());
  }, [dispatch]);

  // Show toast only when error changes
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <TrainerSidePanel>
      <div className="flex items-start justify-start min-h-screen p-6 bg-white mt-[-70px]">
        <div className="w-full max-w-4xl ml-12 space-y-6">
          <header className="w-full">
            <h1 className="text-3xl font-semibold text-black dark:text-white">
              Class Schedule
            </h1>
            <p className="mt-1 text-black dark:text-gray-400">
              View, add, and manage your gym's class schedule efficiently.
            </p>
          </header>

          {/* Loading State */}
          {status === "loading" && (
            <p className="text-center text-gray-500">Loading...</p>
          )}

          {/* Class Cards */}
          {classes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((cls) => (
                <div
                  key={cls._id}
                  className="p-6 transition-shadow bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-lg"
                >
                  <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    {cls.name}
                  </h2>
                  <p className="mb-1 text-gray-600">
                    📅{" "}
                    <span className="font-medium">
                      {new Date(cls.dateTime).toLocaleString()}
                    </span>
                  </p>
                  <p className="mb-1 text-gray-600">
                    📍 <span className="font-medium">{cls.location}</span>
                  </p>
                  <p className="font-semibold text-gray-600">
                    👥 Bookings: {cls.bookings.length}/{cls.maxCapacity}
                  </p>
                </div>
              ))}
            </div>
          ) : status !== "loading" ? (
            <div className="p-6 text-center text-gray-400 bg-gray-900 border border-gray-700 rounded-lg">
              No Classes Scheduled
            </div>
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </TrainerSidePanel>
  );
};

export default TrainerSchedule;
