'use client';
import { CiTimer } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import AttendanceDonutChart from "@/components/applicationUI/AttendanceDonutChart";
import FeesDonutChart from "@/components/applicationUI/FeesDonutChart";
import SeatLayoutForAllShiftsCmp from "@/components/applicationUI/SeatLayoutForAllShifts";
import HolidayListComponent from "@/components/applicationUI/HolidayListComponent";
import GenderDonutChart from "@/components/applicationUI/GenderDonutChart";


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

const shifts = ["Morning", "Afternoon", "Evening", "Full Day"];

const Dashboard = () => (
  <>
    <Header />
    
    {/* Responsive grid layout */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 px-0 bg-gray-100">
      <AttendanceDonutChart />
      <FeesDonutChart />
      <GenderDonutChart />
    </div>

    {/* Seat Layout Section */}
    <div className="max-w-full flex w-full bg-white rounded-lg shadow-sm p-4">
      {/* Seat Layout Section (70%) */}
      <div className="flex-[7] overflow-hidden p-4 relative group">
        <div className="flex justify-between mb-3 border-b-2 pb-4">
          <h5 className="text-lg font-semibold font-nunito">Seat Layouts</h5>
        </div>
        {/* Horizontal Scroll Container */}
        <div
          className="flex overflow-x-auto space-x-4 p-4 bg-white scrollbar-hide group-hover:scrollbar-custom"
        >
          {shifts.map((shift) => (
            <SeatLayoutForAllShiftsCmp key={shift} shift={shift} />
          ))}
        </div>
      </div>
      <HolidayListComponent />
    </div>

  </>
);

export default Dashboard;