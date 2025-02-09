"use client";
import React, { useEffect, useState } from "react";
import { useGetSeatLayoutByShiftQuery } from "@/store/api/adminAPI";
import { FaRestroom, FaDoorOpen } from "react-icons/fa"; // For washroom and gate icons
import { convertToUTC } from "@/lib/dateUtils";
import { response } from "@/lib/data";

interface SeatMatrix {
  layout: any[];
}

type SeatLayoutForAllShiftsCmp = {
    shift: string | null;
  };
const SeatLayoutForAllShiftsCmp: React.FC<SeatLayoutForAllShiftsCmp> = ({  shift }) => {

  const [seatMatrix, setSeatMatrix] = useState<SeatMatrix | null>(null);
  const [seatOccupancyMap, setSeatOccupancyMap] = useState<Map<number, any>>(new Map());

  useEffect(() => {
    if (response) {
      setSeatMatrix(response?.seatLayout?.seatLayout[0]);
      const newSeatOccupancyMap = new Map<number, any>();
      if (response?.seatLayout?.attendanceRecord?.length>0) {
        response.seatLayout?.attendanceRecord?.forEach((seatData: any) => {
          newSeatOccupancyMap.set(seatData.seatNumber, seatData);
        });
      }
      setSeatOccupancyMap(newSeatOccupancyMap);
    }
  }, [response]);

  console.log(seatOccupancyMap,seatMatrix,'seatMatrix')

  return (
    <div className="bg-white dark:text-white-light dark:bg-slate-700 p-2 lg:pb-8 rounded-lg ">
      <div className="space-y-1 overflow-x-auto">
        {!seatMatrix?.layout?.length && (
          <h1>No Attendance Found. Please create attendance.</h1>
        )}
        <div className="flex justify-between mb-2  pb-2">
            <h5 className="text-xs font-semibold font-nunito">{shift}</h5>
        </div>
        <div className="flex flex-col space-y-1 min-w-max">
          {seatMatrix?.layout?.map((row: any, rowIndex: number) => (
            <div key={rowIndex} className="flex justify-center space-x-1 md:space-x-1">
              {row?.map((seat: any) => {
                const seatData = seatOccupancyMap.get(seat.seatNumber);
                return (
                  <div key={seat._id} className="m-0 relative">
                    {seat.seatNumber === 1001 ? (
                      <div className="flex items-center justify-center w-3 h-3 md:w-4 md:h-4 bg-green-600 text-white rounded-lg">
                        <FaDoorOpen className="text-xs" />
                      </div>
                    ) : seat.seatNumber === 1002 ? (
                      <div className="flex items-center justify-center w-3 h-3 md:w-4 md:h-4 bg-blue-600 text-white rounded-lg">
                        <FaRestroom className="text-xs" />
                      </div>
                    ) : (
                      <div
                        className={`flex items-center justify-center w-3 h-3 md:w-4 md:h-4 text-xs  cursor-pointer transition-all duration-200 ease-in-out 
                          ${seatData ? "bg-red-400 hover:bg-red-500 rounded-lg shadow-md" :seat?.isSeatPresent?"bg-gray-400 rounded-lg shadow-md ": "bg-white "}`}
                      >
                        <span className="font-semibold text-white text-[8px]">
                          {seat.seatType === "SEAT" ? seat.seatNumber : seat.seatType}
                        </span>
                        {seatData && (
                          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-xs font-bold rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                            {seatData.studentName}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatLayoutForAllShiftsCmp;
