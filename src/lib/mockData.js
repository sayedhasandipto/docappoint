export const doctors = [
  {
    id: "d1",
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=250&auto=format&fit=crop",
    experience: "10 years",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description: "Highly experienced cardiologist specializing in heart diseases, preventive care, and patient-centered treatment. Dedicated to providing the best possible care.",
    hospital: "Labaid Cardiac Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 800,
    rating: 4.8,
    reviews: 120
  },
  {
    id: "d2",
    name: "Dr. Syed Hasan",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=250&auto=format&fit=crop",
    experience: "15 years",
    availability: ["10:00 AM - 01:00 PM", "05:00 PM - 08:00 PM"],
    description: "Expert in treating disorders of the nervous system. Provides comprehensive diagnostic and therapeutic services for neurological conditions.",
    hospital: "Square Hospital",
    location: "Panthapath, Dhaka",
    fee: 1000,
    rating: 4.9,
    reviews: 85
  },
  {
    id: "d3",
    name: "Dr. Farhana Islam",
    specialty: "Dermatologist",
    image: "https://images.unsplash.com/photo-1594824432252-c0e086f6d4d1?q=80&w=250&auto=format&fit=crop",
    experience: "8 years",
    availability: ["11:00 AM - 02:00 PM", "06:00 PM - 09:00 PM"],
    description: "Specializes in diagnosing and treating skin, hair, and nail conditions. Focuses on helping patients achieve healthy, glowing skin.",
    hospital: "Apollo Hospital",
    location: "Bashundhara, Dhaka",
    fee: 700,
    rating: 4.7,
    reviews: 200
  },
  {
    id: "d4",
    name: "Dr. Kamal Hossain",
    specialty: "Orthopedic",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=250&auto=format&fit=crop",
    experience: "12 years",
    availability: ["08:00 AM - 12:00 PM", "03:00 PM - 06:00 PM"],
    description: "Specialized in musculoskeletal system issues, sports injuries, and joint replacement surgeries. Ensures patients regain optimal mobility.",
    hospital: "Ibn Sina Hospital",
    location: "Mirpur, Dhaka",
    fee: 900,
    rating: 4.6,
    reviews: 150
  },
  {
    id: "d5",
    name: "Dr. Nusrat Jahan",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=250&auto=format&fit=crop",
    experience: "7 years",
    availability: ["09:00 AM - 01:00 PM", "04:00 PM - 08:00 PM"],
    description: "Caring and compassionate pediatrician. Focuses on the physical, emotional, and social health of children from birth to young adulthood.",
    hospital: "United Hospital",
    location: "Gulshan, Dhaka",
    fee: 600,
    rating: 4.9,
    reviews: 310
  },
  {
    id: "d6",
    name: "Dr. Rahman Khan",
    specialty: "General Surgeon",
    image: "https://images.unsplash.com/photo-1537368910025-70280458b4f9?q=80&w=250&auto=format&fit=crop",
    experience: "20 years",
    availability: ["10:00 AM - 02:00 PM", "05:00 PM - 09:00 PM"],
    description: "Highly experienced general surgeon. Provides expert surgical care for a wide range of diseases and conditions.",
    hospital: "BIRDEM General Hospital",
    location: "Shahbag, Dhaka",
    fee: 1200,
    rating: 4.8,
    reviews: 420
  }
];

export const mockBookings = [
  {
    _id: "b1",
    userEmail: "test@example.com",
    doctorName: "Dr. Ayesha Rahman",
    patientName: "John Doe",
    gender: "Male",
    phone: "01712345678",
    appointmentDate: "2026-05-12",
    appointmentTime: "10:30 AM"
  }
];

// Helper functions for local storage mock backend
export const getBookings = (email) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mockBookings');
    const bookings = saved ? JSON.parse(saved) : mockBookings;
    return bookings.filter(b => b.userEmail === email);
  }
  return mockBookings.filter(b => b.userEmail === email);
};

export const addBooking = (booking) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mockBookings');
    const bookings = saved ? JSON.parse(saved) : mockBookings;
    const newBooking = { ...booking, _id: Math.random().toString(36).substr(2, 9) };
    localStorage.setItem('mockBookings', JSON.stringify([...bookings, newBooking]));
    return newBooking;
  }
};

export const updateBooking = (id, updatedData) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mockBookings');
    let bookings = saved ? JSON.parse(saved) : mockBookings;
    bookings = bookings.map(b => b._id === id ? { ...b, ...updatedData } : b);
    localStorage.setItem('mockBookings', JSON.stringify(bookings));
  }
};

export const deleteBooking = (id) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mockBookings');
    let bookings = saved ? JSON.parse(saved) : mockBookings;
    bookings = bookings.filter(b => b._id !== id);
    localStorage.setItem('mockBookings', JSON.stringify(bookings));
  }
};
