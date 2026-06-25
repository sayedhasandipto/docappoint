"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Search } from 'lucide-react';

export default function AllAppointments() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name-asc");
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
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

    // Filter by name
    let filteredDoctors = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    filteredDoctors = filteredDoctors.sort((a, b) => {
        if (sortBy === "name-asc") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "name-desc") {
            return b.name.localeCompare(a.name);
        } else if (sortBy === "fee-asc") {
            return a.fee - b.fee;
        } else if (sortBy === "fee-desc") {
            return b.fee - a.fee;
        } else if (sortBy === "rating-desc") {
            return b.rating - a.rating;
        }
        return 0;
    });

    return (
        <div className="py-12 px-4 max-w-7xl mx-auto w-full min-h-screen">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-4">All Appointments</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">Find the right doctor for your needs and book an appointment instantly.</p>
            </div>

            {/* Search and Sort */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-full md:w-1/2 relative flex items-center bg-gray-100/50 border border-gray-200 rounded-lg h-10 px-3 focus-within:ring-2 focus-within:ring-blue-500">
                    <Search size={18} className="text-gray-500 mr-2 shrink-0" />
                    <input
                        type="search"
                        placeholder="Search doctor by name..."
                        className="w-full h-full bg-transparent focus:outline-none text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-64 flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium px-1">Sort by</label>
                    <select
                        className="w-full h-10 px-3 py-2 bg-gray-100/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="fee-asc">Fee (Low to High)</option>
                        <option value="fee-desc">Fee (High to Low)</option>
                        <option value="rating-desc">Rating (High to Low)</option>
                    </select>
                </div>
            </div>

            {/* Doctor Grid */}
            {filteredDoctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDoctors.map((doc) => (
                        <div key={doc._id || doc.id} className="w-full bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
                            <div className="relative h-56 w-full bg-gray-100 shrink-0">
                                <Image
                                    src={doc.image}
                                    alt={doc.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-5 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{doc.name}</h3>
                                            <p className="text-blue-600 font-medium text-sm">{doc.specialty}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 mt-3 text-sm text-gray-600">
                                        <p><span className="font-semibold">Rating:</span> ★ {doc.rating} ({doc.reviews} reviews)</p>
                                        <p><span className="font-semibold">Exp:</span> {doc.experience}</p>
                                        <p><span className="font-semibold">Fee:</span> ${doc.fee}</p>
                                        <p className="line-clamp-1" title={doc.hospital}><span className="font-semibold">Location:</span> {doc.hospital}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 pb-5 pt-0 bg-white border-t-0 shrink-0 mt-auto">
                                <Link href={user ? `/doctor/${doc._id || doc.id}` : "/login"} className="w-full">
                                    <button className="w-full h-10 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No doctors found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
            )}
                </>
            )}
        </div>
    );
}
