export function getTodayDateISO(): string {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    return today.toISOString().split("T")[0];
  }
  
export function convertToUTC(date: Date): string {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split("T")[0]; // Extract YYYY-MM-DD
}
export const formatDateOrTime = (dateTime: string, type: "date" | "time"): string => {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    return "N/A"; // Return a default message if the date is invalid
  }
  if (type === "date") {
    return date.toLocaleDateString(); // Returns date in 'MM/DD/YYYY' format
  }

  if (type === "time") {
    return date.toLocaleTimeString(); // Returns time in 'HH:MM:SS AM/PM' format
  }

  return "";
};

export const calculateTotalTime = (checkInTime: string, checkOutTime?: string | null): string => {
  const checkIn = new Date(checkInTime);

  // If checkOutTime is not provided, use the current UTC time
  const checkOut = checkOutTime ? new Date(checkOutTime) : new Date();

  // Check for invalid dates
  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    return "Invalid Time"; // Return an error message if any of the times are invalid
  }

  const diffInMilliseconds = checkOut.getTime() - checkIn.getTime();

  if (diffInMilliseconds < 0) {
    return "Invalid Time Range"; // Check if checkout time is before check-in time
  }

  const totalMinutes = Math.floor(diffInMilliseconds / 60000); // Convert milliseconds to minutes
  const hours = Math.floor(totalMinutes / 60); // Extract hours
  const minutes = totalMinutes % 60; // Extract remaining minutes

  // If hours is zero, return only minutes
  if (hours === 0) {
    return `${minutes} minutes`;
  }

  return `${hours} hours ${minutes} minutes`;
};


