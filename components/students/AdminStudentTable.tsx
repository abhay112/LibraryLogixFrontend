'use client';
import IconPencil from '@/components/icon/icon-pencil';
import IconSettings from '@/components/icon/icon-settings';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import React from 'react';
import Link from 'next/link';

const AdminStudentTable = () => {
    const tableData = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@yahoo.com',
            date: '10/08/2020',
            sale: 120,
            status: 'Complete',
            register: '5 min ago',
            progress: '40%',
            position: 'Developer',
            office: 'London',
        },
        {
            id: 2,
            name: 'Shaun Park',
            email: 'shaunpark@gmail.com',
            date: '11/08/2020',
            sale: 400,
            status: 'Pending',
            register: '11 min ago',
            progress: '23%',
            position: 'Designer',
            office: 'New York',
        },
        {
            id: 3,
            name: 'Alma Clarke',
            email: 'alma@gmail.com',
            date: '12/02/2020',
            sale: 310,
            status: 'In Progress',
            register: '1 hour ago',
            progress: '80%',
            position: 'Accountant',
            office: 'Amazon',
        },
        {
            id: 4,
            name: 'Vincent Carpenter',
            email: 'vincent@gmail.com',
            date: '13/08/2020',
            sale: 100,
            status: 'Canceled',
            register: '1 day ago',
            progress: '60%',
            position: 'Data Scientist',
            office: 'Canada',
        },
    ];
    return (
        <div className=''>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Students</span>
                </li>
            </ul>
            <div className="table-responsive  flex mb-5 bg-white mt-4 dark:text-white-light dark:bg-slate-700">
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" className="form-checkbox" />
                        </th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Sale</th>
                        <th className="!text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data) => {
                        return (
                            <tr key={data.id}>
                                <td>
                                    <input type="checkbox" className="form-checkbox" />
                                </td>
                                <td>
                                    <div className="whitespace-nowrap">{data.name}</div>
                                </td>
                                <td>{data.date}</td>
                                <td>{data.sale}</td>
                                <td className="text-center">
                                    <ul className="flex items-center justify-center gap-2">
                                        <li>
                                            <Tippy content="Settings">
                                                <button type="button">
                                                    <IconSettings className="h-5 w-5 text-primary" />
                                                </button>
                                            </Tippy>
                                        </li>
                                        <li>
                                            <Tippy content="Edit">
                                                <button type="button">
                                                    <IconPencil className="text-success" />
                                                </button>
                                            </Tippy>
                                        </li>
                                        <li>
                                            <Tippy content="Delete">
                                                <button type="button">
                                                    <IconTrashLines className="text-danger" />
                                                </button>
                                            </Tippy>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
      
    );
};

export default AdminStudentTable;
