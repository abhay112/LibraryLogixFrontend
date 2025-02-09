import { convertToUTC } from "@/lib/dateUtils";
import React, { useState, useEffect, useRef } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const generateCalendarDates = (year: number, month: number) => {
    const startDate = new Date(year, month, 1);
    const datesArray = [];
    const today = new Date();
  
    for (let i = -startDate.getDay(); i < 42 - startDate.getDay(); i++) {
      const date = new Date(year, month, i + 1);
  
      // Convert to local date string instead of using UTC (ISO format)
      const fullDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  
      datesArray.push({
        date: date.getDate(),
        day: daysOfWeek[date.getDay()],
        month: months[date.getMonth()],
        fullDate: fullDate, // Now in local time
        isToday: today.toDateString() === date.toDateString(),
        isCurrentMonth: date.getMonth() === month,
        isFutureDate: date > today
      });
    }
  
    return datesArray;
  };
  

type CalendarDate = {
    date: number;
    day: string;
    month: string;
    fullDate: string;
    isToday: boolean;
    isCurrentMonth: boolean;
    isFutureDate: boolean;
  };

type CalendarUIProps = {
  onSelectionChange: (date: string, shift: string) => void;
};


const CalendarUI: React.FC<CalendarUIProps> = ({ onSelectionChange }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
  const [isExpanded, setIsExpanded] = useState(false);
//   const calendarDates = generateCalendarDates(currentYear, currentMonth);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleWeekDates, setVisibleWeekDates] = useState<CalendarDate[]>([]);
  const [calendarDates, setCalendarDates] = useState<CalendarDate[]>(
    generateCalendarDates(today.getFullYear(), today.getMonth())
  );
  const [selectedShift, setSelectedShift] = useState("");
  useEffect(() => {
    if (!isExpanded) {
      const todayIndex = calendarDates.findIndex((date) => date.isToday);
      if (scrollRef.current && todayIndex !== -1) {
        const scrollPosition = todayIndex * 30; // Approximate width of each date button
        scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    }
  }, [calendarDates, isExpanded]);

  useEffect(() => {
    setCalendarDates(generateCalendarDates(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const todayIndex = calendarDates.findIndex((date) => date.isToday);
    const startOfWeek = todayIndex >= 0 ? todayIndex - (todayIndex % 7) : 0;
    setVisibleWeekDates(calendarDates.slice(startOfWeek, startOfWeek + 7));
  }, [calendarDates]);

  const handleDateSelect = (fullDate: string) => {
    setSelectedDate(fullDate);
    onSelectionChange(fullDate, selectedShift);
  };
  const handleShiftSelect = (shift: string) => {
    setSelectedShift(shift);
    onSelectionChange(selectedDate, shift);
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const handleScrollLeft = () => {
    const firstVisibleDate = visibleWeekDates[0];
    const firstVisibleIndex = calendarDates.findIndex(
      (date) => date.fullDate === firstVisibleDate.fullDate
    );
    const newStartIndex = Math.max(firstVisibleIndex - 7, 0);
    setVisibleWeekDates(calendarDates.slice(newStartIndex, newStartIndex + 7));

    if (!calendarDates[newStartIndex].isCurrentMonth) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((prev) => prev - 1);
      } else {
        setCurrentMonth((prev) => prev - 1);
      }
    }
  };

  const handleScrollRight = () => {
    const lastVisibleDate = visibleWeekDates[visibleWeekDates.length - 1];
    const lastVisibleIndex = calendarDates.findIndex(
      (date) => date.fullDate === lastVisibleDate.fullDate
    );
    const newStartIndex = Math.min(lastVisibleIndex + 1, calendarDates.length - 7);
    setVisibleWeekDates(calendarDates.slice(newStartIndex, newStartIndex + 7));

    if (!calendarDates[newStartIndex].isCurrentMonth) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
      } else {
        setCurrentMonth((prev) => prev + 1);
      }
    }
  };

  console.log(selectedDate,visibleWeekDates, 'selectedDate')
  return (
    <div className="w-full max-w-md mx-auto py-4 px-2 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Mark Attendance</h2>
        <button
          className="text-blue-500 text-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-2">
        <button className="text-lg font-bold" onClick={handlePreviousMonth}>
          &#8249;
        </button>
        <h3 className="text-base font-semibold">
          {months[currentMonth]} {currentYear}
        </h3>
        <button className="text-lg font-bold" onClick={handleNextMonth}>
          &#8250;
        </button>
      </div>
      {isExpanded ? (
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
          {calendarDates.map(({ date, fullDate, isToday, isCurrentMonth, isFutureDate }) => (
            <button
              key={fullDate}
              className={`p-1 rounded-lg transition
                ${selectedDate === fullDate ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-gray-300"}
                ${isToday ? "font-bold border-2 border-blue-500" : ""}
                ${!isCurrentMonth ? "text-gray-400" : ""}
                ${isFutureDate ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => {!isFutureDate && setSelectedDate(fullDate); handleDateSelect(fullDate)}}
              disabled={isFutureDate}
            >
              {date}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex justify-between items-center mb-2">
            <button className="text-lg font-bold" onClick={handleScrollLeft}>&#8249;</button>
            <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map((day) => (
                <div key={day} className="text-center font-semibold">
                    {day}
                </div>
                ))}
                {visibleWeekDates.map(({ date, fullDate, isToday, isFutureDate }) => (
                <button
                    key={fullDate}
                    className={`p-2 rounded-full transition
                    ${selectedDate === fullDate ? "bg-indigo-900 text-white" : "bg-white-200 text-black hover:bg-gray-300"}
                    ${isToday ? "font-bold border-indigo-900" : ""}
                    ${isFutureDate ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => {
                      if (!isFutureDate) {
                        setSelectedDate(fullDate);
                        handleDateSelect(fullDate);
                      }
                    }}
                    disabled={isFutureDate}
                >
                    {date}
                </button>
                ))}
            </div>
            <button className="text-lg font-bold" onClick={handleScrollRight}>&#8250;</button>
        </div>
      )}
      {selectedDate !== convertToUTC(new Date())&&
      <div className="mt-4">
        <p>Shifts</p>
        <div className="p-4 overflow-auto">
          <div className="flex gap-2 flex-nowrap">
            {["Morning", "Afternoon", "Evening", "Full Day"].map((shift) => (
              <button
                key={shift}
                className={`whitespace-nowrap flex-1 p-2 rounded-lg ${
                  selectedShift === shift ? "bg-slate-500 text-white" : "border text-black hover:bg-gray-300"
                }`}
                onClick={() => handleShiftSelect(shift)}
              >
                {shift}
              </button>
            ))}
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default CalendarUI;
