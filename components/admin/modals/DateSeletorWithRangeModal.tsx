"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import { DateRange } from "react-day-picker";

interface DateRangeSelectorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

function DateRangeSelectorModal({ isOpen, setIsOpen, dateRange, setDateRange }: DateRangeSelectorProps) {
  const today = new Date();
  const presets = [
    { label: "Today", range: { from: today, to: today } },
    { label: "Yesterday", range: { from: subDays(today, 1), to: subDays(today, 1) } },
    { label: "Last 7 Days", range: { from: subDays(today, 6), to: today } },
    { label: "Last 30 Days", range: { from: subDays(today, 29), to: today } },
    { label: "Month to Date", range: { from: startOfMonth(today), to: today } },
    { label: "Last Month", range: { from: startOfMonth(subMonths(today, 1)), to: endOfMonth(subMonths(today, 1)) } },
    { label: "Year to Date", range: { from: startOfYear(today), to: today } },
    { label: "Last Year", range: { from: startOfYear(subYears(today, 1)), to: endOfYear(subYears(today, 1)) } },
  ];
  const [month, setMonth] = useState(today);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full">
            <Dialog.Title className="text-lg font-bold mb-4">Select Date Range</Dialog.Title>
            <div className="flex max-sm:flex-col">
              <div className="relative border-r border-gray-300 pr-4 max-sm:border-b max-sm:pr-0 max-sm:pb-4">
                <div className="flex flex-col">
                  {presets.map(({ label, range }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        setDateRange(range);
                        setMonth(range.to);
                      }}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(newRange) => newRange && setDateRange(newRange)}
                month={month}
                onMonthChange={setMonth}
                className="p-2 bg-white dark:bg-gray-800"
                disabled={[{ after: today }]}
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Close
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

export { DateRangeSelectorModal };