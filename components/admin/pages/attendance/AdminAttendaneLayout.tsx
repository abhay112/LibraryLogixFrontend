'use client'
import IconPencil from "@/components/icon/icon-pencil";
import IconSettings from "@/components/icon/icon-settings";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { calculateTotalTime, convertToUTC, formatDateOrTime } from "@/lib/dateUtils";
import { useGetAttendanceQuery } from "@/store/api/adminAPI";
import Tippy from "@tippyjs/react";
import { Link } from "lucide-react";
import { useState, useEffect } from "react";
import { DateSelectorModal } from "../../modals/DateSelectorModal";
import Button from "@/components/applicationUI/Button";

interface AttendanceData {
  id: string;
  studentName: string;
  shift: string;
  seatNumber: string;
  checkInTime: string;
  checkOutTime: string;
  totalHours: number;
  remark: string;
}

interface AttendanceResponse {
  attendance: AttendanceData[];
}

const AdminAttendaceTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<AttendanceResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: attendance, error, isLoading } = useGetAttendanceQuery({
    date: convertToUTC(selectedDate),
    adminId: "67a22f8b9b9e29e00d5f7e67",
  });
  
  useEffect(() => {
    if (attendance) {
      setData(attendance?.data); // Assuming attendance is of type AttendanceResponse
    }
  }, [attendance]);

  console.log(data, attendance, 'attendance data');
  
  if (isLoading) return <p>Loading attendance...</p>;
  if (error) return <p>Error fetching students</p>;

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Attendance </span>
        </li>
      </ul>
      <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
        Select Date
      </Button>
      <div className="table-responsive flex mb-5 bg-white mt-4 dark:text-white-light dark:bg-slate-700">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="form-checkbox" />
              </th>
              <th>Name</th>
              <th>Shift</th>
              <th>Seat</th>
              <th>Check IN</th>
              <th>Check Out</th>
              <th>Total Time</th>
              <th>Message</th>
              <th className="!text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.attendance?.map((student) => (
              <tr key={student.id}>
                <td>
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td>
                  <div className="whitespace-nowrap">{student?.studentName}</div>
                </td>
                <td>{student.shift}</td>
                <td>{student.seatNumber}</td>
                <td>{formatDateOrTime(student.checkInTime,'time')}</td>
                <td>{formatDateOrTime(student.checkOutTime,'time')}</td>
                <td>{calculateTotalTime(student.checkInTime,student.checkOutTime)}</td>
                <td>{student?.remark}</td>
                <td className="text-center">
                  <ul className="flex items-center justify-center gap-2">
                    <li>
                      <Tippy content="Edit">
                        <button type="button">
                          <IconPencil className="text-success" />
                        </button>
                      </Tippy>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen &&
        <DateSelectorModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          date={selectedDate}
          setDate={setSelectedDate}
        />}
    </div>
  );
};

export default AdminAttendaceTable