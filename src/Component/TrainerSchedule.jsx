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
      <div className="flex items-start justify-start min-h-screen p-6 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black mt-[-70px]">
        <div className="w-full max-w-6xl ml-6 space-y-8">
          {/* Header */}
          <header className="w-full">
            <h1 className="text-4xl font-bold text-black dark:text-white">
              📅 Class Schedule
            </h1>
            <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
              View, add, and manage your gym's class schedule efficiently.
            </p>
          </header>

          {/* Loading State */}
          {status === "loading" && (
            <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
              Loading...
            </p>
          )}

          {/* Class Cards */}
          {classes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((cls) => (
                <div
                  key={cls._id}
                  className="p-5 border border-gray-700 rounded-xl shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black transition-transform hover:scale-[1.015] duration-300"
                >
                  <h2 className="mb-3 text-xl font-bold tracking-wide text-white">
                    🏋️ {cls.name}
                  </h2>
                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold">🕒 Time:</span>
                    <br />
                    {new Date(cls.dateTime).toLocaleString()}
                  </p>
                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold">📍 Location:</span>{" "}
                    {cls.location}
                  </p>
                  <p className="text-sm font-semibold text-green-400">
                    👥 Bookings: {cls.bookings.length}/{cls.maxCapacity}
                  </p>
                </div>
              ))}
            </div>
          ) : status !== "loading" ? (
            <div className="p-6 text-center text-gray-400 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
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
