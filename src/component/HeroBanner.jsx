"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Activity, ShieldCheck, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeroBanner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/appointment?search=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push('/appointment');
        }
    };

    return (
        <div className="relative lg:min-h-[90vh] flex items-center overflow-hidden bg-white w-full pt-10 pb-16 lg:py-0">
            {/* Soft background accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] rounded-full opacity-30 bg-gradient-to-br from-blue-100 to-indigo-50 blur-3xl translate-x-1/3 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] rounded-full opacity-40 bg-gradient-to-tr from-cyan-50 to-blue-50 blur-3xl -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
                    
                    {/* Left Content */}
                    <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left mt-8 lg:mt-0">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6 shadow-sm">
                            <Activity size={16} className="animate-pulse" />
                            <span>Your Health, Our Priority</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
                            Find & Book <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                The Best Doctors
                            </span> <br/>
                            Near You
                        </h1>
                        
                        <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Get access to top-rated medical professionals. Book appointments easily, quickly, and securely from the comfort of your home.
                        </p>

                        {/* Search Box */}
                        <div className="p-2 rounded-2xl mb-10 max-w-xl mx-auto lg:mx-0 bg-white shadow-xl shadow-blue-900/5 border border-gray-100">
                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 relative flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                    <Search className="text-gray-400 mr-3 shrink-0" size={20} />
                                    <input 
                                        type="text" 
                                        placeholder="Search doctors..." 
                                        className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="px-8 py-3 rounded-xl font-semibold transition-all whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30">
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-gray-100">
                            <div className="text-center lg:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center lg:justify-start gap-2">
                                    <Users className="text-blue-500" size={20} /> 50+
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 font-medium">Specialist Doctors</p>
                            </div>
                            <div className="w-px h-10 bg-gray-200"></div>
                            <div className="text-center lg:text-left">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 flex items-center justify-center lg:justify-start gap-2">
                                    <ShieldCheck className="text-emerald-500" size={20} /> 10k+
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 font-medium">Happy Patients</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative mt-8 lg:mt-0 w-full flex justify-center order-first lg:order-last">
                        <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[360px] lg:max-w-[480px] mx-auto">
                            {/* Decorative background shapes */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[2rem] lg:rounded-[3rem] transform rotate-3 scale-105"></div>
                            <div className="absolute inset-2 lg:inset-4 bg-white rounded-[2rem] lg:rounded-[3rem] shadow-xl"></div>
                            
                            {/* Image container */}
                            <div className="relative w-full h-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden border-[6px] lg:border-[12px] border-white shadow-inner">
                                <Image 
                                    src="https://i.ibb.co.com/B5NkGbSZ/hero.png" 
                                    alt="Professional Doctor" 
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 480px"
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>

                            {/* Floating Cards */}
                            <div className="absolute top-4 lg:top-16 -left-4 lg:-left-8 p-2 lg:p-4 rounded-xl lg:rounded-2xl bg-white shadow-xl shadow-blue-900/10 border border-gray-100 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="flex items-center gap-2 lg:gap-3">
                                    <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] lg:text-xs text-gray-500 font-medium">Top Rated</p>
                                        <p className="font-bold text-gray-900 text-[10px] lg:text-sm leading-tight">100% Verified</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-8 lg:bottom-20 -right-4 lg:-right-8 p-2 lg:p-4 rounded-xl lg:rounded-2xl bg-white shadow-xl shadow-blue-900/10 border border-gray-100 animate-bounce" style={{ animationDuration: '4s' }}>
                                <div className="flex items-center gap-2 lg:gap-3">
                                    <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <MapPin className="w-4 h-4 lg:w-5 lg:h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] lg:text-xs text-gray-500 font-medium">Available in</p>
                                        <p className="font-bold text-gray-900 text-[10px] lg:text-sm leading-tight">Dhaka City</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
