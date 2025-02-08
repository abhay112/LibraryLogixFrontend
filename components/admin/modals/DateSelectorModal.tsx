"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { subDays, subMonths, subYears } from "date-fns";
import { Dispatch, SetStateAction } from "react";

interface DateSelectorProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  date: Date;
  setDate: (date: Date) => void;
}

function DateSelectorModal({ isOpen, setIsOpen, date, setDate }: DateSelectorProps) {
  const today = new Date();
  const yesterday = subDays(today, 1);
  const lastWeek = subDays(today, 7);
  const lastMonth = subMonths(today, 1);
  const lastYear = subYears(today, 1);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full max-sm:max-w-full">
            <Dialog.Title className="text-lg font-bold mb-4 text-center">Select a Date</Dialog.Title>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* Button Group */}
              <div className="flex sm:flex-col sm:border-r border-gray-300 sm:pr-4 sm:pb-0 lg:pb-4  justify-between sm:justify-start space-x-2 sm:space-x-0 lg:overflow-none md:overflow-none overflow-scroll ">
                <Button variant="ghost" size="sm" onClick={() => setDate(today)}>
                  Today
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDate(yesterday)}>
                  Yesterday
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDate(lastWeek)}>
                  Last Week
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDate(lastMonth)}>
                  Last Month
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDate(lastYear)}>
                  Last Year
                </Button>
              </div>

              {/* Calendar Component */}
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="p-2 bg-white dark:bg-gray-800 w-full"
                disabled={[{ after: today }]}
              />
            </div>

            {/* Close Button */}
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

export { DateSelectorModal };