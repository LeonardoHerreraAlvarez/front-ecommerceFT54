import Link from "next/link";
import React from "react";
import { FaUser, FaShoppingCart, FaClipboardList } from "react-icons/fa";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <div className="w-1/4 bg-[#1a2238] text-white p-6">
                <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
                <hr className="my-6 border-gray-100" />
                <ul className="space-y-4">
                    <li>
                        <Link href="/" className="flex items-center text-lg hover:underline">
                            <FaShoppingCart className="mr-2" /> Shop
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className="flex items-center text-lg hover:underline">
                            <FaUser className="mr-2" /> Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/orders" className="flex items-center text-lg hover:underline">
                            <FaClipboardList  className="mr-2" /> Orders
                        </Link>
                    </li>                    
                </ul>
            </div>
            <div className="flex-1 bg-white p-6">{children}</div>
        </div>
    );
}
