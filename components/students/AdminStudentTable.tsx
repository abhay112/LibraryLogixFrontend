"use client";
import IconPencil from "@/components/icon/icon-pencil";
import IconSettings from "@/components/icon/icon-settings";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetStudentsQuery } from "@/store/api/adminAPI";

const AdminStudentTable = () => {
  const { data: students, error, isLoading } = useGetStudentsQuery(null);
  const [data,setData] = useState([])
  useEffect(()=>{
    if(students){
        setData(students?.data)
    }
  },[students])

  if (isLoading) return <p>Loading students...</p>;
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
          <span>Students</span>
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
              <th>Mobile</th>
              <th>Shift</th>
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
                <td>{student?.email}</td>
                <td>{student?.mobile}</td>
                <td className="uppercase">{student?.shift}</td>
                <td>{student?.active?"Active":"INACTIVE"}</td>
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

export default AdminStudentTable;
