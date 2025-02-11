import AdminFeesTable from '@/components/admin/pages/Fees/AdminFeesTable';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Students',
};

const Tables = () => {
    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
            <AdminFeesTable />
        </div>
    );
};

export default Tables;
