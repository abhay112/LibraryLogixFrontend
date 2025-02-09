import React, { useState, useEffect } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Type definition for a single calendar date
type CalendarDate = {
  date: number;
  day: string;
  month: string;
  fullDate: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  isFutureDate: boolean;
};

const generateCalendarDates = (year: number, month: number): CalendarDate[] => {
  const startDate = new Date(year, month, 1);
  const datesArray: CalendarDate[] = [];
  const today = new Date();

  for (let i = -startDate.getDay(); i < 42 - startDate.getDay(); i++) {
    const date = new Date(year, month, i + 1);
    datesArray.push({
      date: date.getDate(),
      day: daysOfWeek[date.getDay()],
      month: months[date.getMonth()],
      fullDate: date.toISOString().split("T")[0],
      isToday: date.toDateString() === today.toDateString(),
      isCurrentMonth: date.getMonth() === month,
      isFutureDate: date > today
    });
  }

  return datesArray;
};

const CalendarUI: React.FC = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [calendarDates, setCalendarDates] = useState<CalendarDate[]>(
    generateCalendarDates(today.getFullYear(), today.getMonth())
  );
  const [visibleWeekDates, setVisibleWeekDates] = useState<CalendarDate[]>([]);

  // Update calendarDates when year or month changes
  useEffect(() => {
    setCalendarDates(generateCalendarDates(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  // Set visible week dates when calendarDates change
  useEffect(() => {
    const todayIndex = calendarDates.findIndex((date) => date.isToday);
    const startOfWeek = todayIndex >= 0 ? todayIndex - (todayIndex % 7) : 0;
    setVisibleWeekDates(calendarDates.slice(startOfWeek, startOfWeek + 7));
  }, [calendarDates]);

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

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-xl">
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
        <button className="text-lg font-bold" onClick={handleScrollLeft}>
          &#8249;
        </button>
        <h3 className="text-base font-semibold">
          {months[currentMonth]} {currentYear}
        </h3>
        <button className="text-lg font-bold" onClick={handleScrollRight}>
          &#8250;
        </button>
      </div>

      {/* Week View */}
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {visibleWeekDates.map(({ date, fullDate, isToday, isFutureDate }) => (
          <button
            key={fullDate}
            className={`p-2 rounded-lg transition
              ${selectedDate === fullDate ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}
              ${isToday ? "font-bold border-2 border-blue-500" : ""}
              ${isFutureDate ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !isFutureDate && setSelectedDate(fullDate)}
            disabled={isFutureDate}
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarUI;





// ------------------------------------




// import React, { useState, useEffect, useRef } from "react";

// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const months = [
//   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

// const generateCalendarDates = (year: number, month: number) => {
//   const startDate = new Date(year, month, 1);
//   const datesArray = [];
//   const today = new Date();

//   for (let i = -startDate.getDay(); i < 42 - startDate.getDay(); i++) {
//     const date = new Date(year, month, i + 1);
//     datesArray.push({
//       date: date.getDate(),
//       day: daysOfWeek[date.getDay()],
//       month: months[date.getMonth()],
//       fullDate: date.toISOString().split("T")[0],
//       isToday: date.toDateString() === today.toDateString(),
//       isCurrentMonth: date.getMonth() === month,
//       isFutureDate: date > today
//     });
//   }

//   return datesArray;
// };

// type CalendarDate = {
//     date: number;
//     day: string;
//     month: string;
//     fullDate: string;
//     isToday: boolean;
//     isCurrentMonth: boolean;
//     isFutureDate: boolean;
//   };

// const CalendarUI = () => {
//   const today = new Date();
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);
//   const [isExpanded, setIsExpanded] = useState(false);
// //   const calendarDates = generateCalendarDates(currentYear, currentMonth);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [visibleWeekDates, setVisibleWeekDates] = useState<CalendarDate[]>([]);
//  const [calendarDates, setCalendarDates] = useState<CalendarDate[]>(
//     generateCalendarDates(today.getFullYear(), today.getMonth())
//   );
//   useEffect(() => {
//     if (!isExpanded) {
//       const todayIndex = calendarDates.findIndex((date) => date.isToday);
//       if (scrollRef.current && todayIndex !== -1) {
//         const scrollPosition = todayIndex * 30; // Approximate width of each date button
//         scrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
//       }
//     }
//   }, [calendarDates, isExpanded]);

//   const handlePreviousMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else {
//       setCurrentMonth(currentMonth - 1);
//     }
//   };

//   const handleNextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(currentMonth + 1);
//     }
//   };
//   // Update calendarDates when year or month changes
//     useEffect(() => {
//       setCalendarDates(generateCalendarDates(currentYear, currentMonth));
//     }, [currentYear, currentMonth]);

//     useEffect(() => {
//       const todayIndex = calendarDates.findIndex((date) => date.isToday);
//       const startOfWeek = todayIndex >= 0 ? todayIndex - (todayIndex % 7) : 0;
//       setVisibleWeekDates(calendarDates.slice(startOfWeek, startOfWeek + 7));
//     }, [calendarDates]);

//   const handleScrollLeft = () => {
//     const firstVisibleDate = visibleWeekDates[0];
//     const firstVisibleIndex = calendarDates.findIndex(
//       (date) => date.fullDate === firstVisibleDate.fullDate
//     );
//     const newStartIndex = Math.max(firstVisibleIndex - 7, 0);
//     setVisibleWeekDates(calendarDates.slice(newStartIndex, newStartIndex + 7));

//     if (!calendarDates[newStartIndex].isCurrentMonth) {
//       if (currentMonth === 0) {
//         setCurrentMonth(11);
//         setCurrentYear((prev) => prev - 1);
//       } else {
//         setCurrentMonth((prev) => prev - 1);
//       }
//     }
//   };

//   const handleScrollRight = () => {
//     const lastVisibleDate = visibleWeekDates[visibleWeekDates.length - 1];
//     const lastVisibleIndex = calendarDates.findIndex(
//       (date) => date.fullDate === lastVisibleDate.fullDate
//     );
//     const newStartIndex = Math.min(lastVisibleIndex + 1, calendarDates.length - 7);
//     setVisibleWeekDates(calendarDates.slice(newStartIndex, newStartIndex + 7));

//     if (!calendarDates[newStartIndex].isCurrentMonth) {
//       if (currentMonth === 11) {
//         setCurrentMonth(0);
//         setCurrentYear((prev) => prev + 1);
//       } else {
//         setCurrentMonth((prev) => prev + 1);
//       }
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-xl">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-bold">Mark Attendance</h2>
//         <button
//           className="text-blue-500 text-sm"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           {isExpanded ? "Collapse" : "Expand"}
//         </button>
//       </div>

//       {/* Calendar Navigation */}
//       <div className="flex justify-between items-center mb-2">
//         <button className="text-lg font-bold" onClick={handlePreviousMonth}>
//           &#8249;
//         </button>
//         <h3 className="text-base font-semibold">
//           {months[currentMonth]} {currentYear}
//         </h3>
//         <button className="text-lg font-bold" onClick={handleNextMonth}>
//           &#8250;
//         </button>
//       </div>
      
//       <div className="flex justify-between items-center mb-2">
//         <button className="text-lg font-bold" onClick={handleScrollLeft}>
//           &#8249;
//         </button>
//         {isExpanded ? (
//         <div className="grid grid-cols-7 gap-1">
//           {daysOfWeek.map((day) => (
//             <div key={day} className="text-center font-bold">
//               {day}
//             </div>
//           ))}
//           {calendarDates.map(({ date, fullDate, isToday, isCurrentMonth, isFutureDate }) => (
//             <button
//               key={fullDate}
//               className={`p-1 rounded-lg transition
//                 ${selectedDate === fullDate ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-gray-300"}
//                 ${isToday ? "font-bold border-2 border-blue-500" : ""}
//                 ${!isCurrentMonth ? "text-gray-400" : ""}
//                 ${isFutureDate ? "opacity-50 cursor-not-allowed" : ""}`}
//               onClick={() => !isFutureDate && setSelectedDate(fullDate)}
//               disabled={isFutureDate}
//             >
//               {date}
//             </button>
//           ))}
//         </div>
//       ) : (
//         // <div className="overflow-x-auto flex space-x-3 p-2 scrollbar-hide" ref={scrollRef}>
//         //   {calendarDates
//         //     .filter(({ isCurrentMonth }) => isCurrentMonth)
//         //     .map(({ date, day, fullDate, isToday, isFutureDate }) => (
//         //       <button
//         //         key={fullDate}
//         //         className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-[40px] transition
//         //          `}
//         //         onClick={() => !isFutureDate && setSelectedDate(fullDate)}
//         //         disabled={isFutureDate}
//         //       >
//         //         <span className="text-sm">{day}</span>
//         //         <span className={`font-bold text-lg min-w-[60px] transition rounded-full mt-2
//         //             ${selectedDate === fullDate ? "bg-blue-500 text-white" : "bg-white-200 text-black hover:bg-gray-300"}
//         //             ${isToday ? "font-bold border-2 border-blue-500" : ""}
//         //             ${isFutureDate ? "opacity-50 cursor-not-allowed" : ""}
//         //         `}>{date}</span>
//         //       </button>
//         //     ))}
//         // </div>
//         <div className="grid grid-cols-7 gap-1">
//         {daysOfWeek.map((day) => (
//           <div key={day} className="text-center font-bold">
//             {day}
//           </div>
//         ))}
//         {visibleWeekDates.map(({ date, fullDate, isToday, isFutureDate }) => (
//           <button
//             key={fullDate}
//             className={`p-2 rounded-lg transition
//               ${selectedDate === fullDate ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}
//               ${isToday ? "font-bold border-2 border-blue-500" : ""}
//               ${isFutureDate ? "opacity-50 cursor-not-allowed" : ""}`}
//             onClick={() => !isFutureDate && setSelectedDate(fullDate)}
//             disabled={isFutureDate}
//           >
//             {date}
//           </button>
//         ))}
//       </div>
//       )}
//         <button className="text-lg font-bold" onClick={handleScrollRight}>
//           &#8250;
//         </button>
//       </div>

//       {/* Calendar View */}
//       {/* {isExpanded ? (
//         <div className="grid grid-cols-7 gap-1">
//           {daysOfWeek.map((day) => (
//             <div key={day} className="text-center font-bold">
//               {day}
//             </div>
//           ))}
//           {calendarDates.map(({ date, fullDate, isToday, isCurrentMonth, isFutureDate }) => (
//             <button
//               key={fullDate}
//               className={`p-1 rounded-lg transition
//                 ${selectedDate === fullDate ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-gray-300"}
//                 ${isToday ? "font-bold border-2 border-blue-500" : ""}
//                 ${!isCurrentMonth ? "text-gray-400" : ""}
//                 ${isFutureDate ? "opacity-50 cursor-not-allowed" : ""}`}
//               onClick={() => !isFutureDate && setSelectedDate(fullDate)}
//               disabled={isFutureDate}
//             >
//               {date}
//             </button>
//           ))}
//         </div>
//       ) : (
//         <div className="overflow-x-auto flex space-x-3 p-2 scrollbar-hide" ref={scrollRef}>
//           {calendarDates
//             .filter(({ isCurrentMonth }) => isCurrentMonth)
//             .map(({ date, day, fullDate, isToday, isFutureDate }) => (
//               <button
//                 key={fullDate}
//                 className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-[40px] transition
//                  `}
//                 onClick={() => !isFutureDate && setSelectedDate(fullDate)}
//                 disabled={isFutureDate}
//               >
//                 <span className="text-sm">{day}</span>
//                 <span className={`font-bold text-lg min-w-[60px] transition rounded-full mt-2
//                     ${selectedDate === fullDate ? "bg-blue-500 text-white" : "bg-white-200 text-black hover:bg-gray-300"}
//                     ${isToday ? "font-bold border-2 border-blue-500" : ""}
//                     ${isFutureDate ? "opacity-50 cursor-not-allowed" : ""}
//                 `}>{date}</span>
//               </button>
//             ))}
//         </div>
//       )} */}

//       {/* Employee Section */}
//       <div className="mt-4">
//         <input
//           type="text"
//           placeholder="Search employee"
//           className="w-full p-2 border border-gray-300 rounded mb-4"
//         />

//         <div className="p-4 border border-gray-300 rounded-lg">
//           <div className="flex justify-between items-center mb-3">
//             <div>
//               <h3 className="text-base font-semibold">Vikay</h3>
//               <p className="text-sm text-gray-500">Employee</p>
//             </div>
//             <button className="text-blue-500 text-sm">More options</button>
//           </div>

//           <div className="flex gap-2">
//             <button
//               className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Present
//             </button>
//             <button
//               className="flex-1 p-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
//             >
//               Halfday
//             </button>
//             <button
//               className="flex-1 p-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
//             >
//               Absent
//             </button>
//             <button
//               className="flex-1 p-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
//             >
//               Holiday
//             </button>
//             <button
//               className="flex-1 p-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
//             >
//               NotSet
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarUI;
