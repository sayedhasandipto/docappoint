"use client"

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@heroui/react';

const Navbar = () => {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const {
        data: session,
        isPending,
        error,
        refetch
    } = authClient.useSession()

    const user = session?.user

    const handelSignOut = async () => {
        await authClient.signOut();
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/appointment", label: "All Appointment" },
        { href: "/dashboard", label: "Dashboard" },
    ];

    return (
        <div className="container mx-auto">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <button
                            className="btn btn-ghost lg:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        {mobileOpen && (
                            <ul className="menu menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 bg-white shadow-lg border border-gray-100">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="py-2 px-3 hover:bg-gray-50 rounded-lg"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="DocAppoint Logo"
                            width={150}
                            height={50}
                            className="object-contain"
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2 flex">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="btn btn-ghost text-base font-medium"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <ul className="navbar-end gap-4 max-sm:gap-2">
                    {user ?
                        <>
                            <li>
                                <Link href={"/dashboard/profile"}>
                                    <div className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                        {user?.image ? (
                                            <img
                                                referrerPolicy="no-referrer"
                                                alt={user?.name || "User"}
                                                src={user.image}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            user?.name?.charAt(0)?.toUpperCase() || "U"
                                        )}
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handelSignOut}
                                    className="btn btn-outline btn-error btn-sm md:btn-md"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <Link href="/login">
                                    <Button variant="outline" className="rounded-mdlogin">Login</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup">
                                    <Button className="rounded-mdlogin">Regester</Button>
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;