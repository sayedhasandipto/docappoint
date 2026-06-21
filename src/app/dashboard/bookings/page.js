"use client";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Calendar, Clock, Phone, Trash2, Edit, X, User } from "lucide-react";

export default function MyBookings() {
    const { data: session } = authClient.useSession();
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            if (session?.user?.email) {
                try {
                    const res = await fetch(`http://localhost:8000/appointments?email=${session.user.email}`);
                    const data = await res.json();
                    if (data.success) {
                        setBookings(data.data);
                    }
                } catch (error) {
                    console.error("Failed to fetch bookings:", error);
                }
            }
        };
        fetchBookings();
    }, [session]);

    const handleDelete = (id) => {
        setConfirmDelete(id);
    };

    const confirmDeleteAction = async () => {
        try {
            const res = await fetch(`http://localhost:8000/appointments/${confirmDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            
            if (data.success) {
                setBookings(bookings.filter(b => b._id !== confirmDelete));
                toast.success("Appointment deleted successfully!");
            } else {
                toast.error(data.message || "Failed to delete appointment");
            }
        } catch (error) {
            toast.error("An error occurred while deleting.");
        } finally {
            setConfirmDelete(null);
        }
    };

    const handleEditClick = (booking) => {
        setSelectedBooking(booking);
        reset({
            patientName: booking.patientName,
            gender: booking.gender,
            phone: booking.phone,
            appointmentDate: booking.appointmentDate,
            appointmentTime: booking.appointmentTime
        });
        setIsOpen(true);
    };

    const onClose = () => setIsOpen(false);

    const onSubmitUpdate = async (data) => {
        setIsUpdating(true);
        try {
            const res = await fetch(`http://localhost:8000/appointments/${selectedBooking._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result = await res.json();
            
            if (result.success) {
                setBookings(bookings.map(b => 
                    b._id === selectedBooking._id ? { ...b, ...data } : b
                ));
                toast.success("Appointment updated successfully!");
                setIsOpen(false);
            } else {
                toast.error(result.message || "Failed to update appointment");
            }
        } catch (error) {
            toast.error("Failed to update appointment");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 relative">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 mb-4">You have no upcoming appointments.</p>
                    <a href="/appointment" className="inline-block px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                        Browse Doctors
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white">
                            <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.doctorName}</h3>
                                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-4 h-4 text-blue-500" />
                                            <span className="font-medium text-gray-900">{booking.patientName}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            <span>{booking.appointmentDate}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-blue-500" />
                                            <span>{booking.appointmentTime}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Phone className="w-4 h-4 text-blue-500" />
                                            <span>{booking.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <button
                                        onClick={() => handleEditClick(booking)}
                                        className="p-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                        aria-label="Edit"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(booking._id)}
                                        className="p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                        aria-label="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
                        <div className="p-6 text-center">
                            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-7 h-7 text-red-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Appointment?</h3>
                            <p className="text-gray-500 text-sm">Are you sure you want to delete this appointment? This action cannot be undone.</p>
                        </div>
                        <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteAction}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Update Appointment</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitUpdate)}>
                            <div className="p-5 space-y-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Doctor Name</label>
                                    <input
                                        type="text"
                                        value={selectedBooking?.doctorName || ''}
                                        readOnly
                                        className="w-full h-10 px-3 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Patient Name</label>
                                    <input
                                        type="text"
                                        className="w-full h-10 px-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                        {...register("patientName", { required: true })}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full h-10 px-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                        {...register("phone", { required: true })}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Appointment Date</label>
                                    <input
                                        type="date"
                                        className="w-full h-10 px-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                        {...register("appointmentDate", { required: true })}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Appointment Time</label>
                                    <select
                                        className="w-full h-10 px-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                        {...register("appointmentTime", { required: true })}
                                        defaultValue={selectedBooking?.appointmentTime || ""}
                                    >
                                        <option value="" disabled>Select time</option>
                                        <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                                        <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                                        <option value="04:00 PM - 07:00 PM">04:00 PM - 07:00 PM</option>
                                        <option value="05:00 PM - 08:00 PM">05:00 PM - 08:00 PM</option>
                                    </select>
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
                                    disabled={isUpdating}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${isUpdating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {isUpdating ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
