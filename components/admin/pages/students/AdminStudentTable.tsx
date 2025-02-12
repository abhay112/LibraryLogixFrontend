"use client";
import IconPencil from "@/components/icon/icon-pencil";
import IconSettings from "@/components/icon/icon-settings";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetStudentsQuery } from "@/store/api/adminAPI";
import StudentModal from "./StudentModal";


const AdminStudentTable = () => {
  const { data: students, error, isLoading } = useGetStudentsQuery(null);
  const [data,setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  useEffect(()=>{
    if(students){
        setData(students?.data)
    }
  },[students])

  const handleModalOpen = (data:any) =>{
    setStudentData(data);
    setIsModalOpen(true);
  }


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
      <button type="submit" className="btn btn-primary w-full" onClick={()=>{handleModalOpen(null)}}>Create Students</button>

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
              <th className="!text-center">Edit</th>
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
                <td>{student?.active?"Active":"InActive"}</td>
                <td className="text-center">
                  <ul className="flex items-center justify-center gap-4">
                    <li>
                      <Tippy content="Edit">
                        <button type="button" onClick={()=>{handleModalOpen(student)}}>
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
        <StudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} studentData={studentData} />
      </div>
    </div>
  );
};

export default AdminStudentTable;
