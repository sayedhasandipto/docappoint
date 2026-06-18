import { Bars } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className="container mx-auto">
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <Button variant="ghost" className="btn btn-ghost lg:hidden">
                            <Bars className="w-5 h-5" />
                        </Button>

                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content   rounded-box z-1 mt-3 w-52 p-2">
                            {/* Home, All Appointment, Dashboard */}
                            <li>
                                <Link href="/">
                                    <Button variant="ghost">Home</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/appointment">
                                    <Button variant="ghost">All Appointment</Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard">
                                    <Button variant="ghost">Dashboard</Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={150}
                            height={50}
                            className="object-contain"
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4 flex">
                        {/* Home, All Appointment, Dashboard */}
                        <li>
                            <Link href="/">
                                <Button variant="ghost">Home</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/appointment">
                                <Button variant="ghost">All Appointment</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard">
                                <Button variant="ghost">Dashboard</Button>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end gap-4 max-sm:gap-2">
                    <Link href="/login"><Button variant="outline">Login</Button></Link>
                    <Link href="/register"><Button>Register</Button></Link>
                </div>
            </div>
        </div >
    );
};

export default Navbar;