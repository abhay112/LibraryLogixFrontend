'use client';
import { CiTimer } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import AttendanceDonutChart from "@/components/applicationUI/AttendanceDonutChart";
import FeesDonutChart from "@/components/applicationUI/FeesDonutChart";
import SeatLayoutForAllShiftsCmp from "@/components/applicationUI/SeatLayoutForAllShifts";
import HolidayListComponent from "@/components/applicationUI/HolidayListComponent";


// Header Component

const Header: React.FC = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center p-4 bg-white shadow-md rounded-lg">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">Good afternoon, Abhay!</h1>
        <p className="text-gray-500 text-sm md:text-base">You have 12 tasks pending.</p>
      </div>
      <div className="p-2 border rounded-lg flex items-center space-x-2">
        <div>
          <p className="text-sm font-light">Current Time</p>
          <p className="text-lg font-medium">{time}</p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 text-black text-xs">
          <CiTimer className="text-lg" />
        </div>
      </div>
    </div>
  );
};

const AttendanceCard = () => <AttendanceDonutChart />;
const FeesCard = () => <FeesDonutChart />;
const shifts = ["Morning", "Afternoon", "Evening", "Full Day"];

const Dashboard = () => (
  <>
    <Header />
    
    {/* Responsive grid layout */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-100">
      <AttendanceCard />
      <FeesCard />
      <HolidayListComponent />
    </div>

    {/* Seat Layout Section */}
    <div className="bg-white rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 p-4 md:p-6">
      <div>
        <div className="flex justify-between border-b pb-3 mb-3">
          <h5 className="text-lg font-semibold">Seats Status</h5>
        </div>
        <div className="flex overflow-x-auto space-x-4 p-4 bg-white">
          {shifts.map((shift) => (
            <SeatLayoutForAllShiftsCmp key={shift} shift={shift} />
          ))}
        </div>
      </div>
      <FeesCard />
    </div>
  </>
);

export default Dashboard;