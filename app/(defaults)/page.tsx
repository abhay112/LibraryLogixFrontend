"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdPerson, MdEventSeat, MdAttachMoney, MdCalendarToday } from 'react-icons/md';
import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Label } from "recharts";
import SeatImage from "../../public/assets/images/seatlayoutImage.png"
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Footer from "@/components/layouts/footer";
import HolidayListComponent from "@/components/applicationUI/HolidayListComponent";


const tabs = [
  { id: "dashboard", icon: <MdPerson />, label: "Dashboard" },
  { id: "students", icon: <MdPerson />, label: "Students" },
  { id: "seats", icon: <MdEventSeat />, label: "View Seats" },
  { id: "fees", icon: <MdAttachMoney />, label: "Fees" },
  { id: "calendar", icon: <MdCalendarToday />, label: "Calendar" },
];

const attendanceData = [
  { name: 'Present', value: 45, color: '#4CAF50' },
  { name: 'Absent', value: 16, color: '#FF5722' },
];


const feesData = [
  { name: "Paid", value: 70, color: "#2196F3" }, // Green for Paid
  { name: "Unpaid", value: 30, color: "#FFC107" }, // Red for Unpaid (Absent)
];
const features = [
  {
    title: "Dashboard Overview",
    id: "dashboard",
    content: (
      <div className="flex flex-col">
        <div className="space-y-2 flex justify-between gap-2">
        <div className="bg-white shadow-lg px-6 py-6 rounded-2xl w-full max-w-sm mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Fees</h3>
      <div className="bg-gray-100 rounded-lg p-6 flex justify-center items-center">
        <PieChart width={200} height={200}>
          <Pie
            data={feesData}
            dataKey="value"
            outerRadius={70}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`} // Show percentage
          >
            {feesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Label
              value=""
              position="center"
              fill="red"
              style={{ fontSize: "14px", fontWeight: "bold" }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>

    <div className="bg-white shadow-lg px-6 py-6 rounded-2xl w-full max-w-sm mx-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Attendance</h3>
      <div className="bg-gray-100 rounded-lg p-6 flex justify-center items-center">
        <PieChart width={200} height={200}>
          <Pie
            data={attendanceData}
            dataKey="value"
            outerRadius={70}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`} // Show percentage
          >
            {attendanceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Label
              value=""
              position="center"
              fill="red"
              style={{ fontSize: "14px", fontWeight: "bold" }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
      <div className="bg-white shadow-lg px-6 py-4 rounded-lg w-full">
      <HolidayListComponent />
      </div>
    </div>
        <div>
          <Image src={SeatImage}  alt="seatlayout image" />
        </div>
      </div>
    ),
  },
  { title: "Student Overview", id: "students", content: <h1>Student</h1> },

  {
    title: "Seat Overview",
    id: "seats",
    content: (
      <div>
          <Image src={SeatImage}  alt="seatlayout image" />
        </div>
    ),
  },

  { title: "Fees Overview", id: "fees", content: <h1>Fee</h1> },

  { title: "Academic Calendar", id: "calendar", content: <h1>Academic</h1> },
];

export const projects = [
  {
    title: "Smart Attendance Tracking",
    description:
      "Auto-mark attendance with dynamic seat mapping and real-time tracking capabilities..",
    link: "https://stripe.com",
  },
  {
    title: "Automated Fee Management",
    description:
      "Keep track of payments and dues effortlessly with smart automation.",
    link: "https://netflix.com",
  },
  {
    title: "Powerful Analytics & Reports",
    description:
      "Get real-time insights into student activity and seat utilization patterns.",
    link: "https://google.com",
  },
];



export default function Home() {

     const [activeTab, setActiveTab] = useState("dashboard");
     const [scrolling, setScrolling] = useState(false);
   
     // Scroll event listener
     useEffect(() => {
       const handleScroll = (e:any) => {
         if (scrolling) return; // Prevent further scroll if we're already switching tabs
   
         setScrolling(true);
         // console.log(e.scrollY, e.deltaY,'------')
         if (e.deltaY > 0) {
           // Scroll Down
           
           switchTab('next');
         } else {
           // Scroll Up
           switchTab('prev');
         }
   
         setTimeout(() => setScrolling(false), 800); // Reset after animation completes
       };
   
       window.addEventListener("wheel", handleScroll);
   
       return () => {
         window.removeEventListener("wheel", handleScroll);
       };
     }, [activeTab, scrolling]);
   
     const switchTab = (direction:any) => {
       const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
       let newIndex;
   
       if (direction === 'next') {
         newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : currentIndex;
       } else {
         newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
       }
   
       setActiveTab(tabs[newIndex].id);
     };
   
     const renderContent = () => {
       const feature = features.find(feature => feature.id === activeTab);
       return feature ? feature.content : null;
     };

  return (
    <div >
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center pt-8 px-4 "
      >
        <h1 className="text-5xl font-bold">
          Smarter Library Management <br />
          with <span className="bg-gradient-to-r from-purple-500 to-red-500 text-transparent bg-clip-text">
            Ultimate Control
          </span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl">
          Streamline book tracking, manage seats, and enhance user experience 
          with an AI-powered, intuitive dashboard built for efficiency.
        </p>
        <div className="mt-6 flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Try Demo
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            className="border border-gray-300 px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Get Started
          </motion.button>
        </div>
      </motion.section>
      <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center py-8  min-h-full"
          >
            <div className="bg-white shadow-xl rounded-xl flex flex-col md:flex-row w-full max-w-7xl h-auto overflow-hidden border border-gray-300">
              <aside className="w-full md:w-64 bg-gray-100 p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-red-500 rounded-full"></div>
                  <span className="text-2xl font-bold text-purple-700">LibraryLogix</span>
                </div>
                <nav className="flex-1">
                  <p className="text-gray-500 text-sm uppercase mb-4">Apps</p>
                  <ul className="space-y-4">
                    {tabs.map((tab) => (
                      <li
                        key={tab.id}
                        className={`flex items-center space-x-3 cursor-pointer rounded-lg p-2 transition-colors duration-300 ${
                          activeTab === tab.id ? "bg-purple-500 text-white" : "text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.icon} <span>{tab.label}</span>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
      
              {/* Main Content */}
              <motion.div
                className="flex-1 flex flex-col overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }} // Smooth transition for opacity change
              >
                <header className="flex justify-between items-center p-6 border-b">
                  <div className="flex items-center space-x-4">
                    <FaBars className="text-2xl text-gray-700 cursor-pointer md:hidden" />
                    <h2 className="text-xl font-semibold">Dashboard</h2>
                  </div>
                  <div className="flex items-center space-x-6">
                    <FaSearch className="text-gray-600 text-lg cursor-pointer" />
                    <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
                  >
                    <FaBell className="text-gray-600 text-lg cursor-pointer hover:text-gray-800" />
                  </motion.div>
                    <FaUserCircle className="text-gray-600 text-3xl cursor-pointer" />
                  </div>
                </header>
      
                {/* Dynamic Content */}
                <div className="p-6">{renderContent()}</div>
              </motion.div>
            </div>
          </motion.section>
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center py-8  min-h-full" >
      <HoverEffect items={projects} />
    </motion.section>
    <Footer/>
    </div>
  );
}