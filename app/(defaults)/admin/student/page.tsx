import AdminStudentTable from '@/components/students/AdminStudentTable';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Students',
};

const Tables = () => {
    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
            <AdminStudentTable />
        </div>
    );
};

export default Tables;
