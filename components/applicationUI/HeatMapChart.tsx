"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Function to generate random data for students across months
const generateData = (numMonths: number, min: number, max: number) => {
  return Array.from({ length: numMonths }, (_, i) => ({
    x: new Date(2024, i).toLocaleString("default", { month: "short" }), // Jan, Feb, etc.
    y: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

const HeatmapChart: React.FC = () => {
  const studentNames = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Hannah"];
  const numMonths = 12; // Months from Jan to Dec

  const series = studentNames.map((student) => ({
    name: student,
    data: generateData(numMonths, 10, 100), // Generate random values between 10-100
  }));

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "heatmap", // Ensure the type is correctly assigned
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      heatmap: {
        radius: 10,
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0, to: 40, color: "#008FFB" },
            { from: 41, to: 70, color: "#FEB019" },
            { from: 71, to: 100, color: "#00E396" },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
      },
    },
    xaxis: {
      type: "category",
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    title: {
      text: "Student Performance Heatmap",
    },
  };
  

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-sm p-4">
      <Chart options={options} series={series} type="heatmap" height={400} />
    </div>
  );
};

export default HeatmapChart;
