import Link from 'next/link';
import React from 'react';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white w-full">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight">
                                Doc<span className="text-blue-400">Appoint</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Your trusted healthcare partner. Book appointments with top-rated doctors easily and securely.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                                    <MapPin size={16} className="text-blue-400" />
                                </div>
                                <span className="text-sm">123 Anywhere St., Any City 12345</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                                    <Phone size={16} className="text-blue-400" />
                                </div>
                                <span className="text-sm">123-456-7890</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                                    <Mail size={16} className="text-blue-400" />
                                </div>
                                <span className="text-sm">hellocallcenter@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            {["Departments", "Doctors", "Timetable", "Appointment", "Testimonials"].map((item) => (
                                <li key={item}>
                                    <Link href="/appointment" className="text-slate-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative inline-block">
                            Company
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            {["About Us", "Blog", "Contact Us", "Privacy Policy", "Terms & Conditions"].map((item) => (
                                <li key={item}>
                                    <Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative inline-block">
                            Newsletter
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></span>
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Subscribe to get the latest news about health from our experts.
                        </p>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                            <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all whitespace-nowrap">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} DocAppoint. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="https://www.facebook.com/SayedHasanDipto25" target="_blank" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </Link>
                        <Link href="https://www.youtube.com/@sayedhasandipto" target="_blank" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </Link>
                        <Link href="https://www.linkedin.com/in/sayedhasandipto/" target="_blank" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                            </svg>
                        </Link>
                    </div>
                    <p className="text-slate-500 text-sm">
                        Developed by <Link href="https://sayedhasandipto.vercel.app" target="_blank" className="text-blue-400 hover:underline">Sayed Hasan Dipto</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;