import React, { useEffect, useState } from "react";

interface Holiday {
  date: string;
  localName: string;
}

const ActivityLog: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const countryCode = "IN"; // Change this to the desired country (e.g., US, UK, etc.)

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${year}/${countryCode}`);
        const data: Holiday[] = await response.json();
        setHolidays(data.slice(0, 5)); // Show only the first 5 holidays
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div className="bg-white shadow-lg px-6 py-4 rounded-lg w-full">
      <h4 className="text-gray-700 mb-4 text-xl font-medium">Activity Log</h4>
      <ul className="text-lg text-gray-600">
        {holidays.length > 0 ? (
          holidays.map((holiday, index) => (
            <li key={index} className="mb-4">📅 {holiday.localName} - {holiday.date}</li>
          ))
        ) : (
          <li>Loading holidays...</li>
        )}
      </ul>
    </div>
  );
};

export default ActivityLog;
