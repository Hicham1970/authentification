"use client";

import ProtectedRoute from "../components/ProtectedRoute";


function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <section className="max-w-[1200px] w-full  mx-auto p-2 mt-2">
                {children}
            </section>
        </ProtectedRoute>
    );
}

export default DashboardLayout;
