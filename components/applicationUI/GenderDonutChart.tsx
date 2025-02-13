import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useGetAdminStatsQuery } from "@/store/api/adminAPI";
import { convertToUTC } from "@/lib/dateUtils";

const GenderDonutChart: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [series, setSeries] = useState<number[]>([0, 0, 0]);

  const { data: response, error, isLoading } = useGetAdminStatsQuery({
    adminId: "67a22f8b9b9e29e00d5f7e67",
    date:selectedDate||convertToUTC(new Date()),
  });

  useEffect(() => {
    if (response && response.data) {
      setSeries([response.data?.totalStudents,response.data?.presentCount, response.data?.absentCount]);
    }
  }, [response]);
  

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

  console.log(response,'responseresponse')

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between mb-3 border-b-2 pb-4">
        <h5 className="text-lg font-semibold font-nunito">Gender Ratio</h5>
      </div>
      <div>
        <Chart options={chartOptions} series={series} type="donut" height={150} />
      </div>
    </div>
  );
};

export default GenderDonutChart;
