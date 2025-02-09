import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const FeesDonutChart: React.FC = () => {
  const [series, setSeries] = useState<number[]>([35.1, 23.5]);

  const chartOptions: ApexOptions = {
    // colors: ["#4CAF50", "#FFC107"], 
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
              formatter: () => `118`,
            },
          },
          size: "80%",
        },
      },
    },
    labels: ["Total Collected", "Pending Fees"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      position: "left",
      itemMargin: {
        horizontal: 10, 
        vertical: 10,
      },
    },
  };
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm p-4">
     <div className="flex justify-between mb-3 border-b-2 pb-4">
        <h5 className="text-lg font-semibold font-nunito">Fees</h5>
      </div>
      <Chart options={chartOptions} series={series} type="pie" height={150} />
    </div>
  );
};

export default FeesDonutChart;
