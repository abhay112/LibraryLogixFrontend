import Dropdown from '@/components/dropdown';
import React from "react";
import IconServer from "@/components/icon/icon-server";
import IconHorizontalDots from "@/components/icon/icon-horizontal-dots";
import IconPlus from "@/components/icon/icon-plus";
import IconMail from "@/components/icon/icon-mail";
import IconChecks from "@/components/icon/icon-checks";
import IconFile from "@/components/icon/icon-file";
import PerfectScrollbar from 'react-perfect-scrollbar';

const HolidayListComponent = () => {
  return (
    <div className="panel border-0 shadow-none h-full flex-[3]">
        <div className="-mx-5 mb-3 flex items-start justify-between border-b  p-5 pt-0   ">
            <h5 className="text-lg font-semibold ">Activity Log</h5>
            <div className="dropdown">
                <Dropdown
                    offset={[0, 5]}
                    placement={`${false ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="hover:text-primary"
                    button={<IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />}
                >
                    <ul>
                        <li>
                            <button type="button">View All</button>
                        </li>
                        <li>
                            <button type="button">Mark as Read</button>
                        </li>
                    </ul>
                </Dropdown>
            </div>
        </div>
        <PerfectScrollbar className="perfect-scrollbar relative h-[300px] ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3">
            <div className="space-y-7">
                <div className="flex">
                    <div className="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white shadow shadow-secondary">
                            <IconPlus className="h-4 w-4" />
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold dark:text-white-light">
                            Holi Holiday
                            <button type="button" className="text-success">
                                Celibrate Holi with Colors
                            </button>
                        </h5>
                        <p className="text-xs text-white-dark">27 March, 2025</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success text-white shadow-success">
                            <IconMail className="h-4 w-4" />
                        </div>
                    </div>
                    <div>
                         <h5 className="font-semibold dark:text-white-light">
                            RAM Navami
                            <button type="button" className="text-success">
                                
                            </button>
                        </h5>
                        <p className="text-xs text-white-dark">21 April, 2025</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                            <IconChecks className="h-4 w-4" />
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold dark:text-white-light">Server Logs Updated</h5>
                        <p className="text-xs text-white-dark">27 Feb, 2020</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-danger text-white">
                            <IconChecks className="h-4 w-4" />
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold dark:text-white-light">
                            Task Completed :
                            <button type="button" className="ml-1 text-success">
                                [Backup Files EOD]
                            </button>
                        </h5>
                        <p className="text-xs text-white-dark">01 Mar, 2020</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="relative z-10 shrink-0 before:absolute before:left-4 before:top-10 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30 ltr:mr-2 rtl:ml-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning text-white">
                            <IconFile className="h-4 w-4" />
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold dark:text-white-light">
                            Documents Submitted from <button type="button">Sara</button>
                        </h5>
                        <p className="text-xs text-white-dark">10 Mar, 2020</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="shrink-0 ltr:mr-2 rtl:ml-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-dark text-white">
                            <IconServer className="h-4 w-4" />
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold dark:text-white-light">Server rebooted successfully</h5>
                        <p className="text-xs text-white-dark">06 Apr, 2020</p>
                    </div>
                </div>
            </div>
        </PerfectScrollbar>
    </div>
  )
}

export default HolidayListComponent