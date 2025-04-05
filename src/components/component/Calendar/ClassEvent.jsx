export function ClassEvent({ event, compact = false }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  if (compact) {
    return (
      <div className="overflow-hidden text-xs text-white">
        <div className="font-medium">{event.title}</div>
        <div>{event.location}</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden text-white">
      <div className="font-medium">{event.title}</div>
      <div className="text-sm">
        {formatTime(event.start)} - {formatTime(event.end)}
      </div>
      <div className="text-sm">{event.instructor}</div>
      <div className="text-sm">{event.location}</div>
    </div>
  );
}

 
