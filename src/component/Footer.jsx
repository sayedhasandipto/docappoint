import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div className="container mx-auto">
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                <nav className="w-80 space-y-5 mx-auto">
                    <Link href="/" className="link link-hover mb-10">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={200}
                            height={80}
                            className="object-contain"
                        />
                    </Link>
                    <Link href="/">
                        <p className="link link-hover">123 Anywhere St., Any City 12345</p>
                    </Link>
                    <Link href="/">
                        <p className="link link-hover">123-456-7890</p>
                    </Link>
                    <Link href="/">
                        <p className="link link-hover">hellocallcenter@gmail.com</p>
                    </Link>

                </nav>
                <nav className="w-80 space-y-5 mx-auto">
                    <Link href="/departments" className="link link-hover">
                        Departments
                    </Link>
                    <Link href="/departments" className="link link-hover">
                        Doctors
                    </Link>
                    <Link href="/departments" className="link link-hover">
                        Timetable
                    </Link>

                    <Link href="/doctors" className="link link-hover">
                        Appointment
                    </Link>
                    <Link href="/press" className="link link-hover">
                        Testimonials
                    </Link>
                </nav>
                <nav className="w-80 space-y-5 mx-auto">
                    <Link href="/about" className="link link-hover">
                        About us
                    </Link>
                    <Link href="/about" className="link link-hover">
                        Blog
                    </Link>
                    <Link href="/departments" className="link link-hover">
                        Contact Us
                    </Link>
                    <Link href="/doctors" className="link link-hover">
                        Privacy Policy
                    </Link>
                    <Link href="/press" className="link link-hover">
                        Terms and Conditions
                    </Link>
                </nav>
                <form className="w-80 space-y-2 mx-auto">
                    <h1 className="text-3xl font-bold">Be Our Subscribers</h1>
                    <p>To get the latest news about health from our
                        experts</p>
                    <fieldset className="w-80">
                        <div className="join">
                            <div>
                                <label className="input validator join-item">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            strokeWidth="2.5"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </g>
                                    </svg>
                                    <input type="email" placeholder="mail@site.com" required />
                                </label>
                                <div className="validator-hint hidden">Enter valid email address</div>
                            </div>
                            <button className="btn btn-neutral join-item">Join</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
        </div>
    );
};

export default Footer;