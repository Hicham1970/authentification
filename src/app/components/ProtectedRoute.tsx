"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '../../hooks/useAuth'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isFetch } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user && !isFetch) {
            router.push('/signInAndUp');
        }
    }, [user, isFetch, router])

    if (isFetch) return (
        <section className="w-full h-screen flex items-center justify-center">
            <h2 className="text-xl font-semibold text-center  text-gray-500">Chargement en cour ...</h2>
        </section>)

    return <>{children}</>;
}

export default ProtectedRoute
