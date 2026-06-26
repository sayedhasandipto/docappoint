"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Star, ArrowRight, MapPin } from 'lucide-react';

const TopRatedDoctor = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [doctors, setDoctors] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(`/api/doctors`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (Array.isArray(data)) {
                    setDoctors(data);
                } else {
                    console.error("Data is not an array:", data);
                    setDoctors([]);
                }
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
                setDoctors([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const topDoctors = doctors.slice(0, 3);

    return (
        <section className="py-20 px-4 max-w-7xl mx-auto w-full">
            {/* Section Header */}
            <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4 tracking-wide">
                    OUR DOCTORS
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                    Top Rated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Doctors</span>
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    Book appointments with our most trusted and highly-rated medical professionals.
                </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {/* Doctor Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {topDoctors.map((doc) => (
                            <div key={doc._id || doc.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                                {/* Image */}
                                <div className="relative h-72 w-full bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
                                    <Image
                                        src={doc.image}
                                        alt={doc.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Rating Badge */}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                                        <Star size={16} className="text-amber-400 fill-amber-400" />
                                        <span className="font-bold text-gray-900 text-sm">{doc.rating}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{doc.name}</h3>
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                                            {doc.specialty}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-500 mb-6 flex-grow">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-blue-400" />
                                            <span>{doc.hospital}</span>
                                        </div>
                                        <p><span className="font-medium text-gray-700">Experience:</span> {doc.experience}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Consultation Fee</p>
                                            <p className="text-2xl font-bold text-gray-900">${doc.fee}</p>
                                        </div>
                                        <Link href={user ? `/doctor/${doc._id || doc.id}` : "/login"}>
                                            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 text-sm">
                                                Details <ArrowRight size={16} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <Link href="/appointment">
                            <button className="px-8 py-3.5 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto">
                                View All Doctors <ArrowRight size={18} />
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
};

export default TopRatedDoctor;