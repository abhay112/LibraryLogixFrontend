"use client";
import React from "react";
import Link from "next/link";
import { useGetSeatLayoutQuery } from "@/store/api/adminAPI";
import { FaRestroom, FaDoorOpen } from "react-icons/fa"; // For washroom and gate icons

// Defining the type for seatMap explicitly
type SeatMap = Record<number, number[]>;

const AdminSeatLayout = () => {
  const { data: response, error, isLoading } = useGetSeatLayoutQuery({
    adminId: "67a22c69b838b41440922a13",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-lg font-semibold">Loading seat layout...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-lg text-red-500">Error fetching seat layout. Please try again.</p>
      </div>
    );
  }

  // Seat Layout Logic (mapping seat numbers to specific positions)
  const seatMap: SeatMap = {
    1: [1, 1],
    2: [1, 2],
    3: [1, 3],
    4: [1, 4],
    5: [1, 6],
    6: [1, 7],
    7: [1, 8],
    8: [2, 1],
    9: [2, 2],
    // Add the rest as per your data
    1001: [9, 9],
    1002: [8, 9],
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <ul className="flex space-x-2 rtl:space-x-reverse mb-6">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Seat Layout</span>
        </li>
      </ul>

      {/* Admin and Library Details */}
      <div className="bg-gray-100 p-4 rounded-md mb-6 shadow-md">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Library ID: {response?.seatLayout[0]?.libraryId}</span>
          <span className="text-lg font-semibold">Admin ID: {response?.seatLayout[0]?.adminId}</span>
        </div>
      </div>

      {/* Seat Layout Container */}
      <div className="bg-white mt-6 dark:text-white-light dark:bg-slate-700 p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {response?.seatLayout[0]?.layout.map((row: any, rowIndex: number) => (
            <div key={rowIndex} className="flex justify-center space-x-4">
              {row.map((seat: any) => {
                const seatPosition = seatMap[seat.seatNumber as keyof SeatMap]; 
                const seatRow = seatPosition ? seatPosition[0] : rowIndex + 1;
                const seatCol = seatPosition ? seatPosition[1] : 1;

                return (
                  <div
                    key={seat._id}
                    className={`relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 text-xs rounded-lg border-2 border-gray-300 shadow-md cursor-pointer transform transition-all duration-200 ease-in-out ${
                      seat.isSeatPresent
                        ? seat.status === "VACANT"
                          ? "bg-green-400 hover:bg-green-500"
                          : seat.status === "BOOKED"
                          ? "bg-red-400 hover:bg-red-500"
                          : "bg-gray-400"
                        : "opacity-0"
                    }`}
                  >
                    <span className="font-semibold text-white">
                      {seat.seatType === "SEAT" ? seat.seatNumber : seat.seatType}
                    </span>

                    {seat.status === "BOOKED" && (
                      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-xs font-bold rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                        Booked
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <div className="flex justify-center mt-6 space-x-6">
            {/* Washroom Icon */}
            <div className="flex items-center space-x-2">
              <FaRestroom className="text-xl text-blue-600" />
              <span className="text-lg font-medium">Washroom</span>
            </div>
            {/* Gate Icon */}
            <div className="flex items-center space-x-2">
              <FaDoorOpen className="text-xl text-green-600" />
              <span className="text-lg font-medium">Gate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSeatLayout;
