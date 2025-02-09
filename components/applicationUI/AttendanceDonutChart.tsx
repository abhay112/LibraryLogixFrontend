import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const AttendanceDonutChart: React.FC = () => {
  const [series, setSeries] = useState<number[]>([35.1, 23.5, 2.4]);

  const chartOptions: ApexOptions = {
    // colors: ["#4CAF50", "#FFC107", "#F44336"], 
    chart: {
      height: 150,
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "round",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
          size: "80%",
        },
      },
    },
    labels: ["Total Students", "Present Students", "Absent Students"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      position: "left",
      itemMargin: {
        horizontal: 10, // Adjust horizontal spacing
        vertical: 10, // Adjust vertical spacing
      },
    },
    
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between mb-3 border-b-2 pb-4">
        <h5 className="text-lg font-semibold font-nunito">Attendance</h5>
      </div>
      <div>
        <Chart options={chartOptions} series={series} type="donut" height={150} />
      </div>
    </div>
  );
};

export default AttendanceDonutChart;
