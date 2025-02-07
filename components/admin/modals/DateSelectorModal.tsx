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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full">
            <Dialog.Title className="text-lg font-bold mb-4">Select a Date</Dialog.Title>
            <div className="flex max-sm:flex-col">
              <div className="relative border-r border-gray-300 pr-4 max-sm:border-b max-sm:pr-0 max-sm:pb-4">
                <div className="flex flex-col">
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
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
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

export { DateSelectorModal };