import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainerSchedule } from '../redux/classSlice';
import TrainerSidePanel from './TrainerSidePanel';

const TrainerSchedule = () => {
  const dispatch = useDispatch();
  const { classes, status, error } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(fetchTrainerSchedule());
  }, [dispatch]);

  return (
    <TrainerSidePanel>
     
    {/* <div className="p-6 text-black bg-slate-900">
      <h1 className="mb-4 text-2xl font-bold">My Schedule</h1>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4">
        {classes.map(cls => (
          <div key={cls._id} className="p-4 rounded-md bg-slate-800">
            <h2 className="text-lg font-medium">{cls.name}</h2>
            <p>Date: {new Date(cls.dateTime).toLocaleString()}</p>
            <p>Location: {cls.location}</p>
            <p>Bookings: {cls.bookings.length}/{cls.maxCapacity}</p>
          </div>
        ))}
      </div>
    </div> */}

<div className="flex flex-col min-h-screen p-8 bg-white">
  {/* Header & Cards Container in Row */}
  <div className="w-full max-w-6xl mx-auto">
    
    {/* Title and Grid Row */}
    <div className="items-center justify-between mb-6 ">
      <h1 className="text-3xl font-semibold text-black dark:text-white">My Schedule</h1>
    </div>

    {/* Loading & Error Messages */}
    {status === 'loading' && <p className="text-center text-gray-500">Loading...</p>}
    {error && <p className="text-center text-red-500">{error}</p>}

    {/* Class Cards in Grid Layout */}
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {classes.map(cls => (
        <div key={cls._id} className="p-6 transition-shadow bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-lg">
          <h2 className="mb-3 text-xl font-semibold text-gray-800">{cls.name}</h2>
          <p className="mb-1 text-gray-600">📅 <span className="font-medium">{new Date(cls.dateTime).toLocaleString()}</span></p>
          <p className="mb-1 text-gray-600">📍 <span className="font-medium">{cls.location}</span></p>
          <p className="font-semibold text-gray-600">👥 Bookings: {cls.bookings.length}/{cls.maxCapacity}</p>
        </div>
      ))}
    </div>
  </div>
</div>




    </TrainerSidePanel>
  );
};

export default TrainerSchedule;