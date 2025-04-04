import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClass, fetchClasses } from "../redux/classSlice";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminSidePanel from "./AdminSidePanel";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

const AdminClassManagement = () => {
  const { trainers } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const { classes, error } = useSelector((state) => state.class);
  const [form, setForm] = useState({
    name: "",
    dateTime: "",
    duration: "",
    trainerId: null,
    location: "",
    maxCapacity: "",
  });

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createClass(form));
    setForm({
      name: "",
      dateTime: "",
      duration: "",
      trainerId: "",
      location: "",
      maxCapacity: "",
    });
  };

  const events = classes.map((cls) => ({
    title: `${cls.name} - ${cls.location}`,
    start: cls.dateTime,
    end: new Date(new Date(cls.dateTime).getTime() + cls.duration * 60000),
  }));

  return (
    <AdminSidePanel>
      <div className="flex flex-col w-full gap-6 p-6 sm:gap-8 sm:p-10 mt-[-90px]">
        <header className="w-full ml-12 sm:mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Class Management
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage and schedule your gym classes efficiently.
          </p>
        </header>
        <main className="grid flex-1 gap-6 p-6 sm:gap-10 sm:px-12 sm:py-6 md:gap-12 lg:grid-cols-2 xl:grid-cols-3 mt-[-50px]">
          <div className="grid gap-8 lg:col-span-2 xl:col-span-3">
            <Card className="p-8 text-white border border-gray-700 shadow-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl">
              <CardContent className="space-y-6">
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Name
                      </Label>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Class Name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Date Time
                      </Label>
                      <Input
                        name="dateTime"
                        type="datetime-local"
                        value={form.dateTime}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Duration
                      </Label>
                      <Input
                        name="duration"
                        type="number"
                        value={form.duration}
                        onChange={handleChange}
                        placeholder="Duration (minutes)"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Trainer Name
                      </Label>

                      <Select
                        id="trainers"
                        value={form.trainerId}
                        onValueChange={(value) =>
                          setForm({ ...form, trainerId: value })
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

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Location
                      </Label>
                      <Input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Maxcapacity
                      </Label>
                      <Input
                        name="maxCapacity"
                        type="number"
                        value={form.maxCapacity}
                        onChange={handleChange}
                        placeholder="Max Capacity"
                        required
                      />
                    </div>
                    <div className="flex justify-center col-span-2">
                      <Button
                        type="submit"
                        className="px-6 py-5 text-lg font-semibold text-white transition-transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:scale-105"
                      >
                        Add Class
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* <Card>
              <CardFooter> */}
            <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
              {/* <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="timeGridWeek"
                    events={events}
                    headerToolbar={{
                      left: "prev,next",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    eventColor="#14B8A6"
                  /> */}

              {/* <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin]}
                  initialView="timeGridWeek"
                  events={events}
                  headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  eventContent={(eventInfo) => (
                    <div className="px-2 py-1 text-white bg-blue-600 rounded-md shadow-md">
                      {eventInfo.event.title}
                    </div>
                  )}
                  height="auto"
                  className="text-white bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
                /> */}
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]} // Add plugins
                initialView="timeGridWeek" // Set initial view
                events={events} // Pass events
                headerToolbar={{
                  left: "prev,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                eventContent={(eventInfo) => (
                  <div
                    className={cn(
                      "px-2 py-1 text-white bg-blue-600 rounded-md shadow-md",
                      "hover:bg-blue-700 transition-colors duration-200" // Add hover effect
                    )}
                  >
                    {eventInfo.event.title}
                  </div>
                )}
                height="auto" // Set height
                className="text-white bg-gray-900 border border-gray-700 rounded-lg" // Add custom styles
              />
              {/* 
              </CardFooter>
            </Card> */}
            </div>
          </div>
        </main>
      </div>
    </AdminSidePanel>
  );
};

export default AdminClassManagement;
