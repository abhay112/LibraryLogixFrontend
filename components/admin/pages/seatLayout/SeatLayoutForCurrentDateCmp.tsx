"use client";
import React, { useEffect, useState } from "react";
import {  useGetSeatLayoutQuery } from "@/store/api/adminAPI";
import { FaRestroom, FaDoorOpen } from "react-icons/fa"; // For washroom and gate icons
import CreateAttendanceModal from "../../modals/CreateAttendanceModal";
import { convertToUTC } from "@/lib/dateUtils";
// Defining the type for seatMap explicitly
interface SeatMatrix {
  layout: any[];
}

type SeatLayoutForCurrentDateCmpProps = {
    selectedDate: string | null;
};

const SeatLayoutForCurrentDateCmp: React.FC<SeatLayoutForCurrentDateCmpProps> =  ({selectedDate}) => {
  const { data: response, error, isLoading, refetch } = useGetSeatLayoutQuery(
    { adminId: "67a22f8b9b9e29e00d5f7e67", date: selectedDate || convertToUTC(new Date()) },
    { skip: !selectedDate , refetchOnMountOrArgChange: true } ,// Skip query if selectedDate is null
  );
  console.log("isLoading:", isLoading);
  console.log("isLoading Response Data:", response);
  console.log("isLoading Error:", error);
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
  const [stuDetails,setStuDetails] = useState({
    name:null,
    id:null
  })

  useEffect(() => {
    console.log("Updated selectedDate:", selectedDate);
    if(selectedDate){
      refetch()
    }
  }, [selectedDate,refetch]);
  

  useEffect(() => {
    if (response) {
      console.log("Raw Seat Response Data:", response); // Debugging log
  
      setSeatMatrix(response?.seatLayout?.seatLayout[0]);
      setSeatIndexMapping(response?.seatLayout?.seatLayout[0]?.seatIndexMappings);
      setIds((prev) => ({
        ...prev,
        adminId: response?.seatLayout?.seatLayout[0]?.adminId,
        libraryId: response?.seatLayout?.seatLayout[0]?.libraryId,
      }));
      setAttendanceRecord(response?.seatLayout?.attendanceRecord);
  
      // Ensure seatOccupancy exists and is an object before setting state
      const seatOccupancyRaw = response.seatLayout.attendanceRecord?.seatOccupancy || {};
      console.log("Raw Seat Occupancy:", seatOccupancyRaw); // Debugging log
  
      if (typeof seatOccupancyRaw === "object" && seatOccupancyRaw !== null) {
        setSeatOccupancyMap(new Map()); // Reset map
  
        setTimeout(() => {
          const mappedOccupancy = new Map(
            Object.entries(seatOccupancyRaw).map(([seatNumber, seatData]) => [
              Number(seatNumber), // Ensure seat number is converted to a number
              seatData,
            ])
          );
  
          console.log("Mapped Seat Occupancy:", mappedOccupancy); // Debugging log
          setSeatOccupancyMap(mappedOccupancy);
        }, 0);
      } else {
        console.error("seatOccupancyRaw is not a valid object:", seatOccupancyRaw);
      }
    }
  }, [response, selectedDate]);
  
  // console.log(seatMatrix,seatIndexMapping,ids,seatOccupancyMap,selectedDate,isLoading, 'seatMatrix')

  console.log(isLoading,'isLoading')
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


  const handleAttendance = (item:any,stuDetails:any) =>{
    if(item?.isSeatPresent){
      setIsOpen(true);
      setCreateAttendanceData(item);
      setStuDetails(()=>({
        ...stuDetails,
      }))
    }
  }

  const shifts = ["MORNING", "AFTERNOON", "EVENING", "FULL_DAY"] as const;
  // Define the type explicitly
     type SeatStatusMap = {
      [key in (typeof shifts)[number]]?: {
        status: string;
        name: string;
        id: string;
        shift:string;
      };
    };

  return (
    <div className="bg-white  dark:text-white-light dark:bg-slate-700 p-2  lg:pb-8 rounded-lg shadow-md">
      <div className="space-y-1 overflow-x-auto">
        {!attendanceRecord&&<>
          <>
            <h1>No Attendace Found please create attendance</h1>
          </>
        </>}
        <div className="flex flex-col space-y-1 min-w-max">
              
          {seatMatrix?.layout?.map((row: any, rowIndex: number) => (
            <div key={rowIndex} className="flex justify-center space-x-1 md:space-x-2">
              {row?.map((seat: any) => {
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
                        id:seatData?.studentId,
                        shift:shift // here shift value is "MORNING , EVENING ....."
                      };
                    }
                    return acc;
                  }, {})
                : {};
                if (isOccupied) {
                  console.log(isOccupied, seatStatus,seat, "seatStatus");
                }
                return (
                  <div key={seat._id} className="m-0" >
                    {/* Check for special seat numbers and replace with icons */}
                    {seatNumber === 1001 ? (
                      <div className="flex items-center justify-center w-4 h-4 md:w-6 md:h-6 min-w-[20px] rounded-lg bg-green-600 text-white text-xs">
                        <FaDoorOpen className="text-sm" />
                      </div>
                    ) : seatNumber === 1002 ? (
                      <div className="flex items-center justify-center w-4 h-4 md:w-6 md:h-6 min-w-[20px] rounded-lg bg-blue-600 text-white text-xs">
                        <FaRestroom className="text-sm" />
                      </div>
                    ) : (
                      (() => {
                        // Get the first non-empty shift status (priority order can be customized)
                      
                        const activeShift = (["MORNING", "AFTERNOON", "EVENING", "FULL_DAY"] as const).find(
                          (shift) => seatStatus?.[shift]?.status
                        ) as keyof SeatStatusMap | undefined;
                        
                        const status = activeShift ? seatStatus[activeShift]?.status : "VACANT";
                        const studentName = activeShift ? seatStatus[activeShift]?.name : null;
                        const studentID = activeShift ? seatStatus[activeShift]?.id : null;
                        const shift = activeShift ? seatStatus[activeShift]?.shift : null;

                        
                        let stuDetails = {
                          studentName: studentName,
                          studentID: studentID,
                          shift: shift
                        }
                        console.log(status, "seatStatus");
                        
                        
                        return (
                          <div className={`relative  flex items-center justify-center w-4 h-4 md:w-6 md:h-6 min-w-[15px] text-xs rounded-lg shadow-md cursor-pointer transform transition-all duration-200 ease-in-out ${
                              seat.isSeatPresent
                                ? status === "VACANT"
                                  ? "bg-green-400 hover:bg-green-500"
                                  : status === "FILLED"
                                  ? "bg-red-400 hover:bg-red-500"
                                  : "bg-gray-400"
                                : "opacity-0"
                            }`}
                            onClick={() => handleAttendance(seat,stuDetails)}
                          >
                            <span className="font-semibold text-white text-[8px]">
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
      {isOpen&&<CreateAttendanceModal isOpen={isOpen} setIsOpen={setIsOpen} createAttendanceData={createAttendanceData} seatIndexMapping={seatIndexMapping} ids={ids} stuDetails={stuDetails}/>}
    </div>
  );
};

export default SeatLayoutForCurrentDateCmp;
