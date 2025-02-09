"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetSeatLayoutByShiftQuery, useGetSeatLayoutQuery } from "@/store/api/adminAPI";
import { FaRestroom, FaDoorOpen } from "react-icons/fa"; // For washroom and gate icons
import CreateAttendanceModal from "../../modals/CreateAttendanceModal";
import { convertToUTC } from "@/lib/dateUtils";
import { DateSelectorModal } from "../../modals/DateSelectorModal";
import Button from "@/components/applicationUI/Button";
import { DateRangeSelectorModal } from "../../modals/DateSeletorWithRangeModal";
import { DateRange } from "react-day-picker";
import CalendarUI from "@/components/applicationUI/CalendarUI";
import SeatLayoutForCurrentDateCmp from "./SeatLayoutForCurrentDateCmp";
import SeatLayoutForPastDateCmp from "./SeatLayoutForPastDateCmp";

// Defining the type for seatMap explicitly
type SeatMap = Record<number, number[]>;
interface SeatMatrix {
  layout: any[];
}

const AdminSeatLayout = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const { data: response, error, isLoading } = useGetSeatLayoutQuery({
    adminId: "67a22f8b9b9e29e00d5f7e67",
    // date:convertToUTC(selectedDate),
    date:selectedDate||convertToUTC(new Date()),
  });
  const { data: shiftLayout } = useGetSeatLayoutByShiftQuery(
    {
      adminId: "67a22f8b9b9e29e00d5f7e67",
      date:selectedDate||convertToUTC(new Date()),
      shift: selectedShift?.toUpperCase() ?? "",
    },
    {skip: !selectedDate || !selectedShift }
  );
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


  const handleSelectionChange = (date: string, shift: string) => {
    setSelectedDate(date);
    setSelectedShift(shift);
  };
 
  console.log(seatMatrix,seatIndexMapping,ids,seatOccupancyMap,selectedDate, 'seatMatrix')
  console.log(selectedDate,selectedShift,shiftLayout,   'isRangeSelector')
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
    console.log(selectedDate !== convertToUTC(new Date()),selectedDate, convertToUTC(new Date()), 'selectedDate !== convertToUTC(new Date())')

  return (
    <div className="bg-white  dark:text-white-light dark:bg-slate-700 p-2  lg:pb-8">
      {/* Breadcrumb Navigation */}
      <ul className="flex space-x-2 rtl:space-x-reverse my-4">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Seat Layout</span>
        </li>
      </ul>
      <CalendarUI onSelectionChange={handleSelectionChange} />
      {selectedDate === convertToUTC(new Date())?
        <SeatLayoutForCurrentDateCmp selectedDate={selectedDate}/>:
        <SeatLayoutForPastDateCmp selectedDate={selectedDate} selectedShift={selectedShift}/>
      }
    </div>
  );
};

export default AdminSeatLayout;
