"use client";
import "tippy.js/dist/tippy.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetAttendanceQuery, useGetSeatLayoutQuery } from "@/store/api/adminAPI";
import IconTrashLines from "../icon/icon-trash-lines";
import Tippy from "@tippyjs/react";
import IconPencil from "../icon/icon-pencil";
import IconSettings from "../icon/icon-settings";

const AdminAttendaceTable = () => {
  const { data:attendance, error, isLoading } = useGetAttendanceQuery({
    date: "2025-01-25",
    libraryId: "67a0d7041600c22ade19f2ae",
    adminId: "67a0d7041600c22ade19f2ac",
  });
  
    const [data,setData] = useState([])
  useEffect(()=>{
    if(attendance){
        setData(attendance?.data?.attendanceRecord?.filledSeats);
        debugger
    }
  },[attendance]);
  console.log(data)
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
      <div className="table-responsive flex mb-5 bg-white mt-4 dark:text-white-light dark:bg-slate-700">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="form-checkbox" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Sale</th>
              <th>Status</th>
              <th className="!text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((student:any) => (
              <tr key={student.id}>
                <td>
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td>
                  <div className="whitespace-nowrap">{student.name}</div>
                </td>
                <td>{student.email}</td>
                <td>{student.date}</td>
                <td>{student.sale}</td>
                <td>{student.status}</td>
                <td className="text-center">
                  <ul className="flex items-center justify-center gap-2">
                    <li>
                      <Tippy content="Settings">
                        <button type="button">
                          <IconSettings className="h-5 w-5 text-primary" />
                        </button>
                      </Tippy>
                    </li>
                    <li>
                      <Tippy content="Edit">
                        <button type="button">
                          <IconPencil className="text-success" />
                        </button>
                      </Tippy>
                    </li>
                    <li>
                      <Tippy content="Delete">
                        <button type="button">
                          <IconTrashLines className="text-danger" />
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
    </div>
  );
};

export default AdminAttendaceTable;
