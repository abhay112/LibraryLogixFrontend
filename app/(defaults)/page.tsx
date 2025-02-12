"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdPerson, MdEventSeat, MdAttachMoney, MdCalendarToday } from 'react-icons/md';
import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
// import LibraryManagementSystem from "@/component/ui/LibraryManagementSystem";


const attendanceData = [
  { name: 'Present', value: 45, color: '#4CAF50' },
  { name: 'Absent', value: 16, color: '#FF5722' },
];

const feesData = [
  { name: 'Collected', value: 80, color: '#2196F3' },
  { name: 'Pending', value: 38, color: '#FFC107' },
];
export default function Home() {
  return (
    <div>
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center py-16 px-4 bg-white"
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

      {/* Dashboard Showcase Section */}
      <motion.section
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8 }}
  className="flex justify-center items-center bg-gray-50 py-10"
>
  <div className="bg-white shadow-xl rounded-xl flex flex-col md:flex-row w-full max-w-7xl h-auto overflow-hidden border border-gray-300">
    {/* Sidebar */}
    <aside className="w-full md:w-64 bg-gray-100 p-6 flex flex-col">
      <div className="flex items-center space-x-2 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-red-500 rounded-full"></div>
        <span className="text-2xl font-bold text-purple-700">Library Logix</span>
      </div>
      <nav className="flex-1">
        <p className="text-gray-500 text-sm uppercase mb-4">Apps</p>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg p-2">
            <MdPerson /> <span>Students</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg p-2">
            <MdEventSeat /> <span>View Seats</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg p-2">
            <MdAttachMoney /> <span>Fees</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-lg p-2">
            <MdCalendarToday /> <span>Calendar</span>
          </li>
        </ul>
      </nav>
    </aside>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      <header className="flex justify-between items-center p-6 border-b">
        <div className="flex items-center space-x-4">
          <FaBars className="text-2xl text-gray-700 cursor-pointer md:hidden" />
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
        <div className="flex items-center space-x-6">
          <FaSearch className="text-gray-600 text-lg cursor-pointer" />
          <FaBell className="text-gray-600 text-lg cursor-pointer" />
          <FaUserCircle className="text-gray-600 text-3xl cursor-pointer" />
        </div>
      </header>

      {/* Overview Cards */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Attendance */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h4 className="text-gray-700 mb-4 text-xl font-medium">Attendance</h4>
          <PieChart width={120} height={120}>
            <Pie data={attendanceData} dataKey="value" outerRadius={50}>
              {attendanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        {/* Fees */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h4 className="text-gray-700 mb-4 text-xl font-medium">Fees</h4>
          <PieChart width={120} height={120}>
            <Pie data={feesData} dataKey="value" outerRadius={50}>
              {feesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        {/* Activity Log */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h4 className="text-gray-700 mb-4 text-xl font-medium">Activity Log</h4>
          <ul className="text-lg text-gray-600">
            <li className="mb-4">📅 Holi Holiday - March 27, 2025</li>
            <li>📅 RAM Navami - April 21, 2025</li>
          </ul>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="px-4">
        <h3 className="text-xl font-semibold text-gray-700">Seat Layout</h3>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-10 gap-4 mb-4">
            <div className="col-span-2 sm:col-span-3 md:col-span-10 text-center font-medium text-gray-600">Row 1</div>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`seat-${i}`}
                className={`w-12 h-12 rounded-full ${
                  i % 3 === 0
                    ? 'bg-red-500'
                    : i % 5 === 0
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                } flex items-center justify-center cursor-pointer`}
              >
                <span className="text-white text-xs font-semibold">{i + 1}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-10 gap-4 mb-4">
            <div className="col-span-2 sm:col-span-3 md:col-span-10 text-center font-medium text-gray-600">Row 2</div>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`seat-${i + 10}`}
                className={`w-12 h-12 rounded-full ${
                  i % 4 === 0
                    ? 'bg-red-500'
                    : i % 3 === 0
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                } flex items-center justify-center cursor-pointer`}
              >
                <span className="text-white text-xs font-semibold">{i + 11}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-10 gap-4 mb-4">
            <div className="col-span-2 sm:col-span-3 md:col-span-10 text-center font-medium text-gray-600">Row 3</div>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`seat-${i + 20}`}
                className={`w-12 h-12 rounded-full ${
                  i % 2 === 0
                    ? 'bg-red-500'
                    : i % 4 === 0
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                } flex items-center justify-center cursor-pointer`}
              >
                <span className="text-white text-xs font-semibold">{i + 21}</span>
              </div>
            ))}
          </div>

          {/* Add more rows as needed */}
        </div>
      </div>
    </div>
  </div>
</motion.section>
    <section className="bg-red-400">
      {/* <LibraryManagementSystem/> */}
    </section>
    </div>
  );
}