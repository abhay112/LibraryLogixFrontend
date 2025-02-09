'use client';
import { CiTimer } from "react-icons/ci";
// import React, { useEffect, useState } from "react";
// import { Users, Calendar, TableColumnsSplit, IndianRupee, MessageSquareText , UserX, TentTree, FolderLock, HandCoins  } from "lucide-react";
// import DashboardCard from "@/components/applicationUI/DashboardCard";
// import Dropdown from "@/components/dropdown";
// import IconHorizontalDots from "@/components/icon/icon-horizontal-dots";
// import ReactApexChart from 'react-apexcharts';

// const MainDashboard = () => {

//   const cards = [
//     { title: "Students", icon: Users, color:'text-green-500'},
//     { title: "Attendance", icon: Calendar, color:'text-cyan-500' },
//     { title: "Seats", icon: TableColumnsSplit, color:'text-amber-500' },
//     { title: "Fees", icon: IndianRupee, color:'text-green-500' },
//     { title: "Enquiry", icon: MessageSquareText, color:'text-indigo-500' },
//     { title: "Holidays", icon: TentTree, color:'text-orange-400' },
//     { title: "Inactive Students", icon: UserX, color:'text-blue-600' },
//     { title: "Fines", icon: HandCoins, color:'text-orange-400' },
//     { title: "Employe Documents", icon: FolderLock, color:'text-teal-400' },
//   ];

//   return (
//     <div className="">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-3">
//         {cards.map((card, index) => (
//           <DashboardCard key={index} icon={card.icon} title={card.title} color={card.color} />
//         ))}
//       </div>
//       {/* <div className="mb-6 grid gap-6 lg:grid-cols-3 mt-4">
//           <div className="panel h-full p-0 lg:col-span-2">
//               <div className="mb-5 flex items-start justify-between border-b border-white-light p-5  dark:border-[#1b2e4b] dark:text-white-light">
//                   <h5 className="text-lg font-semibold ">Student Attendance</h5>
//                   <div className="dropdown">
//                       <Dropdown
//                           offset={[0, 5]}
//                           placement={`${false ? 'bottom-start' : 'bottom-end'}`}
//                           btnClassName="hover:text-primary"
//                           button={<IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />}
//                       >
//                           <ul>
//                               <li>
//                                   <button type="button">View</button>
//                               </li>
//                               <li>
//                                   <button type="button">Update</button>
//                               </li>
//                               <li>
//                                   <button type="button">Delete</button>
//                               </li>
//                           </ul>
//                       </Dropdown>
//                   </div>
//               </div>

//               {isMounted && <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} width={'100%'} />}
//           </div>
//       </div> */}
//     </div>
//   );
// };

// export default MainDashboard;

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
      <div className="flex justify-between">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Good afternoon, Abhay!</h1>
          <p className="text-gray-500">You have 12 tasks pending.</p>
        </div>
        <div className="p-2 border rounded-lg h-fit flex justify-center">
            <div>
                <p className="text-md font-light">Current Time</p>
                <p className="text-lg font-medium">{time}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 md:w-10 md:h-10 min-w-[40px] rounded-lg bg-white-600 text-black text-xs">
                <CiTimer className="text-sm" />
            </div>
        </div>
      </div>
    );
  };
  

const AttendanceCard = () => (
    <AttendanceDonutChart/>
);

const FeesCard = () => (
  <FeesDonutChart/>
);

const shifts = ["Morning", "Afternoon", "Evening", "Full Day"];
  
// Dashboard Component
const Dashboard = () => (
    <>
    <Header />
    <div className="grid grid-cols-3 gap-4 p-6 bg-gray-100 h-fit">
        <AttendanceCard />
        <FeesCard />
        <HolidayListComponent/>
    </div>
    <div className="bg-white rounded-lg shadow-md grid grid-cols-[70%_30%] gap-4 p-6 pt-2 h-fit">
        <div>
            <div className="flex justify-between mb-3 border-b-2 pb-4 pt-4 ">
            <h5 className="text-lg font-semibold font-nunito">Seats status</h5>
            </div>
            <div className="flex overflow-x-auto space-x-4 p-6 pt-2 bg-white h-fit">
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
