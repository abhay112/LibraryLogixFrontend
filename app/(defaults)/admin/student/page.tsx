'use client';

import AdminStudentTable from '@/components/admin/pages/students/AdminStudentTable';
import { useAuth } from '@/context/AuthContext';
import { Metadata } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/hoc/ProtectedRoute';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';

// export const metadata: Metadata = {
//   title: 'Students',
// };

const Tables = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) return <p>Loading...</p>; 

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <AdminStudentTable />
      </div>
    </ProtectedRoute>
  );
};

export default Tables;
