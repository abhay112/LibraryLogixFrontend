'use client';
import React, { useEffect, useState } from "react";
import { Users, Calendar, TableColumnsSplit, IndianRupee, MessageSquareText , UserX, TentTree, FolderLock, HandCoins  } from "lucide-react";
import DashboardCard from "@/components/applicationUI/DashboardCard";
import Dropdown from "@/components/dropdown";
import IconHorizontalDots from "@/components/icon/icon-horizontal-dots";
import ReactApexChart from 'react-apexcharts';

const MainDashboard = () => {
  const uniqueVisitorSeries: any = {
    series: [
        {
            name: 'Present Student',
            data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
        },
        {
            name: 'Total Student',
            data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
        },
    ],
    options: {
        chart: {
            height: 360,
            type: 'bar',
            fontFamily: 'Nunito, sans-serif',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 2,
            colors: ['transparent'],
        },
        colors: ['#5c1ac3', '#ffbb44'],
        dropShadow: {
            enabled: true,
            blur: 3,
            color: '#515365',
            opacity: 0.4,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 8,
                borderRadiusApplication: 'end',
            },
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            itemMargin: {
                horizontal: 8,
                vertical: 8,
            },
        },
        grid: {
            borderColor: false ? '#191e3a' : '#e0e6ed',
            padding: {
                left: 20,
                right: 20,
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: true,
                color: false ? '#3b3f5c' : '#e0e6ed',
            },
        },
        yaxis: {
            tickAmount: 6,
            opposite: false ? true : false,
            labels: {
                offsetX: false ? -10 : 0,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: false ? 'dark' : 'light',
                type: 'vertical',
                shadeIntensity: 0.3,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.8,
                stops: [0, 100],
            },
        },
        tooltip: {
            marker: {
                show: true,
            },
        },
    },
  };
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
      setIsMounted(true);
  }, []);

  const cards = [
    { title: "Students", icon: Users, color:'text-green-500'},
    { title: "Attendance", icon: Calendar, color:'text-cyan-500' },
    { title: "Seats", icon: TableColumnsSplit, color:'text-amber-500' },
    { title: "Fees", icon: IndianRupee, color:'text-green-500' },
    { title: "Enquiry", icon: MessageSquareText, color:'text-indigo-500' },
    { title: "Holidays", icon: TentTree, color:'text-orange-400' },
    { title: "Inactive Students", icon: UserX, color:'text-blue-600' },
    { title: "Fines", icon: HandCoins, color:'text-orange-400' },
    { title: "Employe Documents", icon: FolderLock, color:'text-teal-400' },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-3">
        {cards.map((card, index) => (
          <DashboardCard key={index} icon={card.icon} title={card.title} color={card.color} />
        ))}
      </div>
      {/* <div className="mb-6 grid gap-6 lg:grid-cols-3 mt-4">
          <div className="panel h-full p-0 lg:col-span-2">
              <div className="mb-5 flex items-start justify-between border-b border-white-light p-5  dark:border-[#1b2e4b] dark:text-white-light">
                  <h5 className="text-lg font-semibold ">Student Attendance</h5>
                  <div className="dropdown">
                      <Dropdown
                          offset={[0, 5]}
                          placement={`${false ? 'bottom-start' : 'bottom-end'}`}
                          btnClassName="hover:text-primary"
                          button={<IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />}
                      >
                          <ul>
                              <li>
                                  <button type="button">View</button>
                              </li>
                              <li>
                                  <button type="button">Update</button>
                              </li>
                              <li>
                                  <button type="button">Delete</button>
                              </li>
                          </ul>
                      </Dropdown>
                  </div>
              </div>

              {isMounted && <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} width={'100%'} />}
          </div>
      </div> */}
    </div>
  );
};

export default MainDashboard;
