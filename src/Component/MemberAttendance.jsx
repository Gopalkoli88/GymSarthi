import MemberSidePanel from "./MemberSidePanel";
import AttendanceCalendar from "./AttendanceCalendar";
import ScanQr from "./ScanQr";

const MemberAttendance = () => {
  return (
    <MemberSidePanel>
      <div className="flex flex-col items-center p-6 space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-bold tracking-wide text-black">
          Member Attendance
        </h1>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Attendance Calendar */}
          <div className="p-6 text-white transition-all duration-300 border border-blue-500 shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl hover:shadow-2xl">
            <h2 className="mb-4 text-xl font-semibold text-blue-400">
              Attendance Calendar
            </h2>
            <AttendanceCalendar />
          </div>

          {/* QR Code Scanner */}
          <div className="p-6 text-white transition-all duration-300 border border-blue-500 shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl hover:shadow-2xl">
            <h2 className="mb-4 text-xl font-semibold text-blue-400">
              Scan QR Code
            </h2>
            <ScanQr />
          </div>
        </div>
      </div>
    </MemberSidePanel>
  );
};

export default MemberAttendance;
