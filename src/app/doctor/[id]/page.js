"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import BookingModal from '@/component/BookingModal';
import { MapPin, Building2, Clock, Briefcase, Star } from 'lucide-react';

export default function DoctorDetails() {
    const params = useParams();
    const router = useRouter();
    const [doctor, setDoctor] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        const fetchDoctor = async () => {
            if (params.id) {
                try {
                    const res = await fetch(`/api/doctors`);
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    const allDoctors = await res.json();
                    if (Array.isArray(allDoctors)) {
                        const foundDoctor = allDoctors.find(d => d._id === params.id || d.id === params.id);
                        if (foundDoctor) {
                            setDoctor(foundDoctor);
                        }
                    } else {
                        console.error("Data is not an array:", allDoctors);
                    }
                } catch (error) {
                    console.error("Failed to fetch doctor details:", error);
                }
            }
        };
        fetchDoctor();
    }, [params.id]);

    if (!doctor) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const handleBookAppointment = () => {
        if (!session && !isPending) {
            router.push('/login');
        } else {
            setIsOpen(true);
        }
    };

    return (
        <div className="py-12 px-4 max-w-5xl mx-auto w-full min-h-screen">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/3 relative h-80 md:h-auto bg-gray-50">
                        <Image
                            src={doctor.image}
                            alt={doctor.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                                        {doctor.specialty || doctor.specialization}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1 rounded-lg font-bold">
                                        <Star size={18} fill="currentColor" />
                                        <span>{doctor.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1">{doctor.reviews || 0} reviews</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {doctor.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start gap-3">
                                    <Briefcase className="w-6 h-6 text-blue-500 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">Experience</h4>
                                        <p className="text-gray-600">{doctor.experience} {doctor.experience ? 'years' : ''}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Building2 className="w-6 h-6 text-blue-500 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">Hospital</h4>
                                        <p className="text-gray-600">{doctor.hospital || "Not Specified"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-6 h-6 text-blue-500 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">Location</h4>
                                        <p className="text-gray-600">{doctor.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-6 h-6 text-blue-500 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">Availability</h4>
                                        <div className="text-gray-600 flex flex-col text-sm">
                                            {(doctor.availability || ["10:00 AM - 05:00 PM"]).map((slot, i) => (
                                                <span key={i}>{slot}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Consultation Fee</p>
                                <p className="text-3xl font-bold text-gray-900">${doctor.fee}</p>
                            </div>
                            <button
                                onClick={handleBookAppointment}
                                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal isOpen={isOpen} onOpenChange={setIsOpen} doctor={doctor} />
        </div>
    );
}
