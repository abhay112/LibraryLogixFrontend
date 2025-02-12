"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdPerson, MdEventSeat, MdAttachMoney, MdCalendarToday } from 'react-icons/md';
import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import img1 from '@/public/1.png'
import img2 from '@/public/2.png'
import img3 from '@/public/3.png'
import Image from "next/image";


const tabs = [
  { id: "dashboard", icon: <MdPerson />, label: "Dashboard" },
  { id: "students", icon: <MdPerson />, label: "Students" },
  { id: "seats", icon: <MdEventSeat />, label: "View Seats" },
  { id: "fees", icon: <MdAttachMoney />, label: "Fees" },
  { id: "calendar", icon: <MdCalendarToday />, label: "Calendar" },
];

const Gate = ({ gateNumber }:any) => {
  return (
    <div className="gate my-4 text-center">
      <h2 className="text-xl font-semibold">Gate {gateNumber}</h2>
    </div>
  );
};

const Row = ({ rowNumber }:any) => {
  return (
    <div className="row flex justify-center space-x-2">
      {[...Array(15)].map((_, index) => (
        <Seat key={row${rowNumber}-seat${index}} />
      ))}
    </div>
  );
};

const Seat = () => {
  return (
    <div className="seat">
      <MdEventSeat size={24} />
    </div>
  );
};


const features = [
  { title: "Dashboard Overview", id: "dashboard", content: <Image src={img1} alt="Dashboard Overview" /> },
  { title: "Student Overview", id: "students", content: <Image src={img2} alt="Dashboard Overview" />},
  // { title: "Seat Overview", id: "seats", content:  <div className="seat-layout">
  //   <div className="seat-overview">
  //     <h2 className="text-2xl font-bold p-6">Seat Overview</h2>
  //   </div>

  //   <Gate gateNumber={1} />
    
  //   {/* Seat Rows */}
  //   <div className="seats">
  //     {[1, 2, 3,4,5,6].map((row) => (
  //       <Row key={row-${row}} rowNumber={row} />
  //     ))}
  //   </div>
  // </div> },
  { title: "Fees Overview", id: "fees", content:<Image src={img3} alt="Dashboard Overview" /> },
  { title: "Fees Overview", id: "fees", content: <Image src={img1} alt="Dashboard Overview" /> },
  { title: "Academic Calendar", id: "calendar", content:<Image src={img2} alt="Dashboard Overview" /> },
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
    <>
    <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center bg-gray-50 py-10 min-h-screen"
    >
      <div className="bg-white shadow-xl rounded-xl flex flex-col md:flex-row w-full max-w-7xl h-auto overflow-hidden border border-gray-300">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-100 p-6 flex flex-col">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-red-500 rounded-full"></div>
            <span className="text-2xl font-bold text-purple-700">VRISTO</span>
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
              <FaBell className="text-gray-600 text-lg cursor-pointer" />
              <FaUserCircle className="text-gray-600 text-3xl cursor-pointer" />
            </div>
          </header>

          {/* Dynamic Content */}
          <div className="p-6">{renderContent()}</div>
        </motion.div>
      </div>
    </motion.section>
   </>
  );
}