

"use client";

import { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
 import { AlertCircle, Loader2 } from "lucide-react";
import { bookClass, cancelBooking, fetchClasses } from "@/redux/classSlice";
import MemberSidePanel from "./MemberSidePanel";

export function MemberClassBooking() {
  const dispatch = useDispatch();
  const { classes, status, error } = useSelector((state) => state.class);
  const calendarRef = useRef(null);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleBook = (classId) => {
    dispatch(bookClass(classId))
      .unwrap()
      .then(() => {
        alert("Class booked successfully! Check your email for confirmation.");
        refreshCalendar();
      })
      .catch((err) => alert(`Error booking class: ${err.message || "Unknown error"}`));
  };

    const handleCancel = (classId) => {
      dispatch(cancelBooking(classId))
        .unwrap()
        .then(() => {
          alert("Booking cancelled successfully! Check your email for confirmation.");
          refreshCalendar();
        })
        .catch((err) => alert(`Error cancelling booking: ${err.message || "Unknown error"}`));
    };

  const refreshCalendar = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.refetchEvents();
      calendarApi.render();
    }
  };

  const events = classes.map((cls) => ({
    id: cls._id,
    title: `${cls.name} (${cls.spotsLeft} spots left)`,
    start: cls.dateTime,
    end: new Date(new Date(cls.dateTime).getTime() + cls.duration * 60000),
    extendedProps: {
      trainer: cls.trainerId?.name || "Unknown",
      location: cls.location,
      isBooked: cls.isBooked,
      spotsLeft: cls.spotsLeft,
    },
    backgroundColor: cls.isBooked ? "#4B5563" : cls.spotsLeft <= 0 ? "#6B7280" : "#14B8A6",
  }));

  const handleEventClick = useCallback((info) => {
    const { id, extendedProps } = info.event;
    if (extendedProps.spotsLeft > 0 && !extendedProps.isBooked) {
      if (window.confirm(`Book ${info.event.title}?`)) {
        handleBook(id);
      }
    } else if (extendedProps.isBooked) {
      if (window.confirm(`Cancel booking for ${info.event.title}?`)) {
        handleCancel(id);
      }
    }
  }, []);

  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    const { trainer, location, isBooked, spotsLeft } = event.extendedProps;

    return (
       <div className="w-full p-2 overflow-hidden rounded-md">
        <div className="mb-1 text-xs font-medium text-white truncate sm:text-sm">{event.title}</div>
        <div className="mb-1 text-xs truncate text-slate-300">Trainer: {trainer}</div>
        <div className="mb-2 text-xs truncate text-slate-300">Location: {location}</div>
        <Button
          size="sm"
          className={`w-full text-xs ${
            isBooked
              ? "bg-gray-600 hover:bg-gray-700"
              : spotsLeft <= 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
          disabled={spotsLeft <= 0 && !isBooked}
        >
          {isBooked ? "Cancel" : spotsLeft <= 0 ? "Full" : "Book"}
        </Button>
      </div>
     

    );
  };

  return (
    <MemberSidePanel>  
    <Card className="p-4 bg-gray-900 border-gray-800 rounded-lg shadow-lg">
      {status === "loading" && (
        <div className="flex items-center justify-center p-4 text-gray-400">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          <span>Loading classes...</span>
        </div>
      )}

      {/* {status === "failed" && (
        <div className="flex items-center p-4 mb-4 text-red-500 bg-gray-800 rounded-md">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Error: {error}</span>
        </div>
      )} */}

      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          height="auto"
          themeSystem="standard"
          dayMaxEvents={3}
          moreLinkClick="popover"
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: "short",
          }}
          className="dark-calendar"
        />
      </div>

      <style jsx global>{`
        .dark-calendar {
          --fc-border-color: #374151;
          --fc-button-bg-color: #14B8A6;
          --fc-button-border-color: #14B8A6;
          --fc-button-hover-bg-color: #0D9488;
          --fc-button-hover-border-color: #0D9488;
          --fc-button-active-bg-color: #0F766E;
          --fc-button-active-border-color: #0F766E;
          --fc-event-border-color: transparent;
          --fc-page-bg-color: #1F2937;
          --fc-neutral-bg-color: #1F2937;
          --fc-neutral-text-color: #F9FAFB;
          --fc-theme-standard-border-color: #374151;
          --fc-today-bg-color: rgba(20, 184, 166, 0.1);
        }
        
        .fc-theme-standard .fc-scrollgrid, 
        .fc-theme-standard td, 
        .fc-theme-standard th {
          border-color: #374151;
        }
        
        .fc-col-header-cell {
          background-color: #111827;
          color: #F9FAFB;
        }
        
        .fc-daygrid-day-number, 
        .fc-daygrid-day-top {
          color: #F9FAFB;
        }
        
        .fc-daygrid-day.fc-day-today {
          background-color: rgba(20, 184, 166, 0.1);
        }
        
        .fc-button-primary {
          background-color: #14B8A6 !important;
          border-color: #14B8A6 !important;
        }
        
        .fc-button-primary:hover {
          background-color: #0D9488 !important;
          border-color: #0D9488 !important;
        }
        
        .fc-button-primary:not(:disabled):active,
        .fc-button-primary:not(:disabled).fc-button-active {
          background-color: #0F766E !important;
          border-color: #0F766E !important;
        }
        
        .fc-timegrid-slot, .fc-timegrid-axis {
          color: #F9FAFB;
        }
        
        .fc-more-popover {
          background-color: #1F2937;
          border-color: #374151;
        }
        
        .fc-popover-header {
          background-color: #111827;
          color: #F9FAFB;
        }
        
        @media (max-width: 640px) {
          .fc-toolbar {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .fc-toolbar-chunk {
            display: flex;
            justify-content: center;
          }
          
          .fc-header-toolbar.fc-toolbar {
            margin-bottom: 1rem;
          }
          
          .fc-daygrid-event-harness {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </Card>
    </MemberSidePanel>
  );
}

export default MemberClassBooking;