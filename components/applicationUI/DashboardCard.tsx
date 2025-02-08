import React from "react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  color:string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon: Icon, title, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 flex flex-col items-left justify-left text-left">
      <Icon className={`w-5 h-5  mb-2 text-left ${color}`} />
      <span className="font-semibold text-[15px]">{title}</span>
    </div>
  );
};

export default DashboardCard;
