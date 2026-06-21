"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, User, Star } from "lucide-react";

export default function DashboardLayout({ children }) {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [isPending, session, router]);

    if (!mounted || isPending || !session) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const navItems = [
        { href: "/dashboard/bookings", label: "My Bookings", icon: Calendar },
        { href: "/dashboard/reviews", label: "My Reviews", icon: Star },
        { href: "/dashboard/profile", label: "My Profile", icon: User },
    ];

    return (
        <div className="py-12 px-4 max-w-7xl mx-auto w-full min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-6">
                        <div className="mb-6 px-4">
                            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {navItems.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === href ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Icon size={20} />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
