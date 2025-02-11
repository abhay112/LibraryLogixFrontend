'use client'
import IconPencil from "@/components/icon/icon-pencil";
import IconSettings from "@/components/icon/icon-settings";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { convertToUTC } from "@/lib/dateUtils";
import { useGetFeesQuery } from "@/store/api/adminAPI";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import { DateSelectorModal } from "../../modals/DateSelectorModal";
import Button from "@/components/applicationUI/Button";

interface FeesData {
  id: string;
  studentName: string;
  mobile: number;
  feesSubmissionDate: string;
  feesDueDate: string;
  status: string;
  remainingDays: string;
  isOverdue: string;
  daysOverdue: string;
  fees: {
    date: string;
    amount: number;
    feesStatus: boolean;
    shift: string;
  }[];
}

const AdminFeesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: feesData, error, isLoading } = useGetFeesQuery({
    date: convertToUTC(selectedDate),
    status:"paid",
    adminId: "67a22f8b9b9e29e00d5f7e67",
  });

  if (isLoading) return <p>Loading fees...</p>;
  if (error) return <p>Error fetching fees</p>;

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Button onClick={() => setIsModalOpen(true)}>Select Date</Button>
        </li>
      </ul>

      {/* {isModalOpen && (
        <DateSelectorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )} */}

      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Submission Date</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Remaining Days</th>
            <th className="border p-2">Is Overdue</th>
            <th className="border p-2">Days Overdue </th>

            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feesData?.data?.map((fee: FeesData) => (
            <tr key={fee.id}>
              <td className="border p-2">{fee.studentName}</td>
              <td className="border p-2">{fee.mobile}</td>
              <td className="border p-2">{new Date(fee.feesSubmissionDate).toLocaleDateString()}</td>
              <td className="border p-2">{new Date(fee.feesDueDate).toLocaleDateString()}</td>
              <td className="border p-2">{fee.fees[0]?.amount}</td>
              <td className="border p-2">{fee.status}</td>
              <td className="border p-2">{fee.remainingDays}</td>
              <td className="border p-2">{fee.isOverdue?"True":"False"}</td>
              <td className="border p-2">{fee.daysOverdue}</td>
              <td className="border p-2 flex space-x-2">
                <Tippy content="Edit">
                  <button className="text-blue-500"><IconPencil /></button>
                </Tippy>
                <Tippy content="Settings">
                  <button className="text-gray-500"><IconSettings /></button>
                </Tippy>
                <Tippy content="Delete">
                  <button className="text-red-500"><IconTrashLines /></button>
                </Tippy>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeesTable;
