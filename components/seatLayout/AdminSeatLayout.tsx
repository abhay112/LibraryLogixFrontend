"use client";
import "tippy.js/dist/tippy.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetSeatLayoutQuery } from "@/store/api/adminAPI";

const AdminSeatLayout = () => {
  const { data: students, error, isLoading } = useGetSeatLayoutQuery({adminId:"67a0d7041600c22ade19f2ac"});
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
          <span>Seat Layout</span>
        </li>
      </ul>
      <div className="table-responsive flex mb-5 bg-white mt-4 dark:text-white-light dark:bg-slate-700">
        
      </div>
    </div>
  );
};

export default AdminSeatLayout;
