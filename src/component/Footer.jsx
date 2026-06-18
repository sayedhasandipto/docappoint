import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdAddLocation, MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
    return (
        <div className="bg-base-200 text-base-content w-full">
            <footer className="container mx-auto footer p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center sm:justify-items-start">

                <nav className="flex flex-col space-y-3 items-center sm:items-start text-center sm:text-left">
                    <Link href="/" className="mb-6 block">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={200}
                            height={80}
                            className="object-contain"
                        />
                    </Link>
                    <Link href="/" className="link link-hover gap-4 flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[oklch(0.6204_0.195_253.83)] flex items-center justify-center gap-3 text-center">
                            <MdAddLocation className="text-white w-4 h-4" />
                        </div>
                        123 Anywhere St., Any City 12345</Link>
                    <Link href="/" className="link link-hover gap-4 flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[oklch(0.6204_0.195_253.83)] flex items-center justify-center gap-3 text-center">
                            <MdPhone className="text-white w-4 h-4" />
                        </div>
                        123-456-7890</Link>
                    <Link href="/" className="link link-hover gap-4 flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[oklch(0.6204_0.195_253.83)] flex items-center justify-center gap-3 text-center">
                            <MdEmail className="text-white w-4 h-4" />
                        </div>
                        hellocallcenter@gmail.com</Link>
                </nav>

                <nav className="flex flex-col space-y-3 items-center sm:items-start text-center sm:text-left">
                    <Link href="/departments" className="link link-hover">Departments</Link>
                    <Link href="/departments" className="link link-hover">Doctors</Link>
                    <Link href="/departments" className="link link-hover">Timetable</Link>
                    <Link href="/doctors" className="link link-hover">Appointment</Link>
                    <Link href="/press" className="link link-hover">Testimonials</Link>
                </nav>

                <nav className="flex flex-col space-y-3 items-center sm:items-start text-center sm:text-left">
                    <Link href="/about" className="link link-hover">About us</Link>
                    <Link href="/about" className="link link-hover">Blog</Link>
                    <Link href="/departments" className="link link-hover">Contact Us</Link>
                    <Link href="/doctors" className="link link-hover">Privacy Policy</Link>
                    <Link href="/press" className="link link-hover">Terms and Conditions</Link>
                </nav>

                <form className="w-full max-w-xs flex flex-col space-y-3 items-center sm:items-start text-center sm:text-left">
                    <h2 className="text-2xl font-bold">Be Our Subscribers</h2>
                    <p className="text-sm">To get the latest news about health from our experts</p>
                    <fieldset className="w-full">
                        <div className="join w-full">
                            <div className="relative w-full">
                                <label className="input validator join-item flex items-center gap-2 w-full">
                                    <svg className="h-[1em] opacity-50 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </g>
                                    </svg>
                                    <input type="email" placeholder="mail@site.com" className="w-full bg-transparent" required />
                                </label>
                                <div className="validator-hint hidden absolute left-0 -bottom-5 text-xs text-error">Enter valid email address</div>
                            </div>
                            <button className="btn bg-[oklch(0.6204_0.195_253.83)] text-white join-item">Join</button>
                        </div>
                    </fieldset>
                </form>

            </footer>
        </div>
    );
};

export default Footer;