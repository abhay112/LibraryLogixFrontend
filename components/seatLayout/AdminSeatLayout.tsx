"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetSeatLayoutQuery } from "@/store/api/adminAPI";
import { FaRestroom, FaDoorOpen } from "react-icons/fa"; // For washroom and gate icons
import CreateAttendanceModal from "../admin/CreateAttendanceModal";

// Defining the type for seatMap explicitly
type SeatMap = Record<number, number[]>;
interface SeatMatrix {
  layout: any[]; // You can replace `any[]` with the actual row type if known
}


const AdminSeatLayout = () => {
  const { data: response, error, isLoading } = useGetSeatLayoutQuery({
    adminId: "67a22f8b9b9e29e00d5f7e67",
    date:"2025-02-06"
  });
  const [seatMatrix, setSeatMatrix] = useState<SeatMatrix | null>(null);
  const [seatIndexMapping, setSeatIndexMapping] = useState<SeatMatrix | null>(null);
  const [ids,setIds] = useState({
    adminId:null,
    libraryId:null
  })
  const [attendanceRecord, setAttendanceRecord] = useState<any>(null);
  const [seatOccupancyMap, setSeatOccupancyMap] = useState<Map<number, any>>(new Map());
  const [createAttendanceData, setCreateAttendanceData] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (response) {
      // Set seat matrix
      setSeatMatrix(response?.seatLayout?.seatLayout[0]);
      setSeatIndexMapping(response?.seatLayout?.seatLayout[0]?.seatIndexMappings)
      setIds((prev)=>({
        ...prev,
        adminId:response?.seatLayout?.seatLayout[0]?.adminId,
        libraryId:response?.seatLayout?.seatLayout[0]?.libraryId
      }))
      // Set attendance record
      setAttendanceRecord(response?.seatLayout?.attendanceRecord);

      // Create and set seat occupancy map
      const newSeatOccupancyMap = new Map<number, any>();
      if (response?.seatLayout?.attendanceRecord?.seatOccupancy) {
        Object.entries(response.seatLayout.attendanceRecord.seatOccupancy).forEach(
          ([seatNumber, seatData]: [string, any]) => {
            newSeatOccupancyMap.set(Number(seatNumber), seatData);
          }
        );
      }
      setSeatOccupancyMap(newSeatOccupancyMap);
    }
  }, [response]);

 
  console.log(seatMatrix,seatIndexMapping,ids,seatOccupancyMap, 'seatMatrix')

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

  const handleAttendance = (item:any) =>{
    setIsOpen(true);
    setCreateAttendanceData(item);
  }

  const shifts = ["MORNING", "AFTERNOON", "EVENING", "FULL_DAY"] as const;
  // Define the type explicitly
     type SeatStatusMap = {
      [key in (typeof shifts)[number]]?: {
        status: string;
        name: string;
      };
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

      {/* Seat Layout Container */}
      <div className="bg-white mt-6 dark:text-white-light dark:bg-slate-700 p-8 rounded-lg shadow-md">
        <div className="space-y-4 overflow-x-auto">
          {!attendanceRecord&&<>
            <>
              <h1>No Attendace Found please create attendance</h1>
            </>
          </>}
          <div className="flex flex-col space-y-1 min-w-max">
                
            {seatMatrix?.layout?.map((row: any, rowIndex: number) => (
              <div key={rowIndex} className="flex justify-center space-x-1 md:space-x-2">
                {row?.map((seat: any) => {
                  const seatPosition = seatMap[seat.seatNumber as keyof SeatMap];
                  const seatRow = seatPosition ? seatPosition[0] : rowIndex + 1;
                  const seatCol = seatPosition ? seatPosition[1] : 1;
                  const seatNumber = seat?.seatNumber;
                  // Check if the seat is occupied
                  const isOccupied = seatOccupancyMap.has(seatNumber);

               
                  
                const seatStatus: SeatStatusMap = isOccupied
                  ? shifts.reduce<SeatStatusMap>((acc, shift) => {
                      const seatData = seatOccupancyMap.get(seatNumber)?.[shift];
                      if (seatData) {
                        acc[shift] = {
                          status: seatData.status,
                          name: seatData.studentName,
                        };
                      }
                      return acc;
                    }, {})
                  : {};
                  if (isOccupied) {
                    console.log(isOccupied, seatStatus, "seatStatus");
                  }
                  
                  return (
                    <div key={seat._id} className="relative" onClick={() => handleAttendance(seat)}>
                      {/* Check for special seat numbers and replace with icons */}
                      {seatNumber === 1001 ? (
                        <div className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 min-w-[20px] rounded-lg bg-green-600 text-white text-xs">
                          <FaDoorOpen className="text-lg md:text-xl" />
                        </div>
                      ) : seatNumber === 1002 ? (
                        <div className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 min-w-[20px] rounded-lg bg-blue-600 text-white text-xs">
                          <FaRestroom className="text-lg md:text-xl" />
                        </div>
                      ) : (
                        (() => {
                          // Get the first non-empty shift status (priority order can be customized)
                        
                          const activeShift = (["MORNING", "AFTERNOON", "EVENING", "FULL_DAY"] as const).find(
                            (shift) => seatStatus?.[shift]?.status
                          ) as keyof SeatStatusMap | undefined;
                          
                          const status = activeShift ? seatStatus[activeShift]?.status : "VACANT";
                          const studentName = activeShift ? seatStatus[activeShift]?.name : null;
                          
                         
                          return (
                            <div
                              className={`relative flex items-center justify-center w-6 h-6 md:w-10 md:h-10 min-w-[20px] text-xs rounded-lg border-2 border-gray-300 shadow-md cursor-pointer transform transition-all duration-200 ease-in-out ${
                                seat.isSeatPresent
                                  ? status === "VACANT"
                                    ? "bg-green-400 hover:bg-green-500"
                                    : status === "FILLED"
                                    ? "bg-red-400 hover:bg-red-500"
                                    : "bg-gray-400"
                                  : "opacity-0"
                              }`}
                            >
                              <span className="font-semibold text-white text-[13px]">
                                {seat.seatType === "SEAT" ? seat.seatNumber : seat.seatType}
                              </span>
                  
                              {status === "FILLED" && studentName && (
                                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-xs font-bold rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                                  {studentName}
                                </div>
                              )}
                            </div>
                          );
                        })()
                      )}
                    </div>
                  );
                  
                })}
               
              </div>
          ))}
          </div>
        </div>
      </div>
      {isOpen&&<CreateAttendanceModal isOpen={isOpen} setIsOpen={setIsOpen} createAttendanceData={createAttendanceData} seatIndexMapping={seatIndexMapping} ids={ids}/>}
    </div>
  );
};

export default AdminSeatLayout;
