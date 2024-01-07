import React from "react";
import AdminProvider from "@/components/admin_pages/adminProvider";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuthOptions";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Admin - CorteStudios',
    description: 'Admin'
}

export default async function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {

    const session = await getServerSession(nextAuthOptions);

    if (!session?.user) {
        const url = new URL("/auth/login", "http://localhost:3000");
        url.searchParams.append("callbackUrl", "/admin/dashboard");
        redirect(url.toString());
    }

    return (
        <div>
            <AdminProvider>
                {children}
            </AdminProvider>
        </div>
    )
}