"use client";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Star, MessageSquare, Send } from "lucide-react";

export default function MyReviews() {
    const { data: session } = authClient.useSession();
    const [myBookings, setMyBookings] = useState([]);
    const [myReviews, setMyReviews] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (session?.user?.email) {
                try {
                    // Fetch bookings
                    const resBookings = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments?email=${session.user.email}`);
                    const dataBookings = await resBookings.json();
                    if (dataBookings.success) {
                        setMyBookings(dataBookings.data);
                    }
                    
                    // Fetch reviews
                    const resReviews = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?email=${session.user.email}`);
                    const dataReviews = await resReviews.json();
                    if (dataReviews.success) {
                        setMyReviews(dataReviews.data);
                    }
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            }
        };
        fetchData();
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDoctor) {
            toast.error("Please select a doctor to review.");
            return;
        }
        if (rating === 0) {
            toast.error("Please select a rating.");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please write a comment.");
            return;
        }

        setIsSubmitting(true);
        try {
            const newReview = {
                userEmail: session?.user?.email,
                userName: session?.user?.name,
                doctorName: selectedDoctor,
                rating,
                comment: comment.trim(),
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });

            const result = await response.json();

            if (result.success) {
                setMyReviews(prev => [result.data, ...prev]);
                toast.success("Review submitted successfully!");
                setSelectedDoctor("");
                setRating(0);
                setComment("");
            } else {
                toast.error(result.message || "Failed to submit review.");
            }
        } catch (error) {
            toast.error("Failed to submit review. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const bookedDoctors = [...new Set(myBookings.map(b => b.doctorName))];
    const reviewedDoctors = new Set(myReviews.map(r => r.doctorName));
    const availableForReview = bookedDoctors.filter(d => !reviewedDoctors.has(d));

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Reviews</h1>

            {/* Add Review Form */}
            {availableForReview.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MessageSquare size={20} className="text-blue-600" />
                        Write a Review
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Select Doctor</label>
                            <select
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                className="w-full h-10 px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Choose a doctor you visited...</option>
                                {availableForReview.map(doc => (
                                    <option key={doc} value={doc}>{doc}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            size={28}
                                            className={`transition-colors ${(hoverRating || rating) >= star ? 'text-orange-400 fill-orange-400' : 'text-gray-300'}`}
                                        />
                                    </button>
                                ))}
                                {rating > 0 && (
                                    <span className="ml-2 text-sm text-gray-500 self-center">
                                        {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Your Review</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your experience with the doctor..."
                                rows={4}
                                className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            <Send size={16} />
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>
                </div>
            )}

            {myBookings.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200 mb-6">
                    <MessageSquare size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-2">You haven&apos;t booked any appointments yet.</p>
                    <a href="/appointment" className="text-blue-600 hover:underline text-sm font-medium">Browse Doctors →</a>
                </div>
            )}

            {/* My Reviews List */}
            {myReviews.length > 0 ? (
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900">Your Reviews ({myReviews.length})</h2>
                    {myReviews.map((review) => (
                        <div key={review._id} className="border border-gray-100 rounded-xl p-5 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-gray-900">{review.doctorName}</h3>
                                    <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <Star
                                            key={s}
                                            size={16}
                                            className={s <= review.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-200'}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                myBookings.length > 0 && availableForReview.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>You have reviewed all your visited doctors.</p>
                    </div>
                ) : myBookings.length > 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <Star size={36} className="mx-auto mb-2 text-gray-200" />
                        <p>No reviews yet. Share your experience above!</p>
                    </div>
                )
            )}
        </div>
    );
}
