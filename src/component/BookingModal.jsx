"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function BookingModal({ isOpen, onOpenChange, doctor }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    if (!isOpen) return null;

    const onClose = () => onOpenChange(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const bookingData = {
                userEmail: session?.user?.email || 'user@example.com',
                doctorName: doctor.name,
                patientName: data.patientName,
                gender: data.gender,
                phone: data.phone,
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
            };

            const response = await fetch(`/api/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
                credentials: 'include',
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Appointment booked successfully!");
                reset();
                onClose();
                router.push('/dashboard/bookings');
            } else {
                toast.error(result.message || "Failed to book appointment.");
            }
        } catch (error) {
            toast.error("Failed to book appointment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        Book Appointment with {doctor?.name}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-5 space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Patient Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className={`w-full h-10 px-3 py-2 bg-transparent border-2 rounded-lg text-sm focus:outline-none ${errors.patientName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                                {...register("patientName", { required: "Name is required" })}
                            />
                            {errors.patientName && <p className="text-xs text-red-500">{errors.patientName.message}</p>}
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Gender</label>
                            <select
                                className={`w-full h-10 px-3 py-2 bg-transparent border-2 rounded-lg text-sm focus:outline-none ${errors.gender ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                                {...register("gender", { required: "Gender is required" })}
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="e.g., 01712345678"
                                className={`w-full h-10 px-3 py-2 bg-transparent border-2 rounded-lg text-sm focus:outline-none ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                                {...register("phone", { 
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{11}$/,
                                        message: "Please enter a valid 11-digit phone number"
                                    }
                                })}
                            />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Appointment Date</label>
                            <input
                                type="date"
                                className={`w-full h-10 px-3 py-2 bg-transparent border-2 rounded-lg text-sm focus:outline-none ${errors.appointmentDate ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                                {...register("appointmentDate", { required: "Date is required" })}
                            />
                            {errors.appointmentDate && <p className="text-xs text-red-500">{errors.appointmentDate.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Appointment Time</label>
                            <select
                                className={`w-full h-10 px-3 py-2 bg-transparent border-2 rounded-lg text-sm focus:outline-none ${errors.appointmentTime ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                                {...register("appointmentTime", { required: "Time is required" })}
                            >
                                <option value="">Select a time slot</option>
                                {(doctor?.availability?.length > 0 ? doctor.availability : ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "07:00 PM"]).map((slot, index) => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                            {errors.appointmentTime && <p className="text-xs text-red-500">{errors.appointmentTime.message}</p>}
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 mt-2">
                            <p className="text-sm text-blue-800 flex justify-between">
                                <span className="font-semibold">Consultation Fee:</span> 
                                <span className="font-bold">${doctor?.fee}</span>
                            </p>
                        </div>
                    </div>
                    
                    <div className="p-5 border-t border-gray-100 flex justify-end gap-2 bg-gray-50">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {isSubmitting ? 'Booking...' : 'Book Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
