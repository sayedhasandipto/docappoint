"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { User, Mail, Link as LinkIcon, Edit, X } from "lucide-react";
import Image from "next/image";

export default function MyProfile() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [localUser, setLocalUser] = useState(user);
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [isUpdating, setIsUpdating] = useState(false);

    React.useEffect(() => {
        if (user && !localUser) {
            setLocalUser(user);
        }
    }, [user, localUser]);

    const handleEditClick = () => {
        reset({
            name: localUser?.name || '',
            image: localUser?.image || ''
        });
        setIsOpen(true);
    };

    const onClose = () => setIsOpen(false);

    const onSubmitUpdate = async (data) => {
        setIsUpdating(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            setLocalUser({
                ...localUser,
                name: data.name,
                image: data.image
            });

            toast.success("Profile updated successfully!");
            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    if (!localUser) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-3xl relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <button
                    onClick={handleEditClick}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition-colors"
                >
                    <Edit size={16} />
                    Update Profile
                </button>
            </div>

            <div className="w-full border border-gray-100 overflow-visible p-8 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-32 h-32 shrink-0 rounded-full border-4 border-blue-500 overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center text-4xl font-bold text-gray-400">
                        {localUser?.image ? (
                            <Image
                                src={localUser.image}
                                alt={localUser?.name || "User Avatar"}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                                width={128}
                                height={128}
                            />
                        ) : (
                            localUser?.name?.charAt(0)?.toUpperCase() || <User size={48} />
                        )}
                    </div>

                    <div className="flex-1 w-full space-y-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                                <User size={16} /> Full Name
                            </p>
                            <p className="text-lg font-bold text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                {localUser?.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                                <Mail size={16} /> Email Address
                            </p>
                            <p className="text-lg font-medium text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                {localUser?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Profile Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Update Profile</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitUpdate)}>
                            <div className="p-5 space-y-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            className="w-full h-10 pl-9 pr-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                            {...register("name", { required: "Name is required" })}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            value={localUser?.email || ''}
                                            readOnly
                                            className="w-full h-10 pl-9 pr-3 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400">Email address cannot be changed.</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Photo URL</label>
                                    <div className="relative">
                                        <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="https://example.com/photo.jpg"
                                            className="w-full h-10 pl-9 pr-3 py-2 bg-transparent border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                            {...register("image")}
                                        />
                                    </div>
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
