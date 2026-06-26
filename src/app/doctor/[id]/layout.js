// Removed mockData import

export async function generateMetadata({ params }) {
    // Note: since this is an async operation in real Next.js server components,
    // we await the params just in case they're async in Next.js 15+
    const resolvedParams = await params;
    let doctor = null;
    try {
        const res = await fetch(`/api/doctors`);
        if (res.ok) {
            const allDoctors = await res.json();
            if (Array.isArray(allDoctors)) {
                doctor = allDoctors.find(d => d._id === resolvedParams.id || d.id === resolvedParams.id);
            }
        }
    } catch (e) {
        console.error("Failed to fetch doctor for metadata", e);
    }

    if (doctor) {
        return {
            title: `Book Appointment with ${doctor.name} | DocAppoint`,
            description: doctor.description,
        };
    }

    return {
        title: "Doctor Details | DocAppoint",
        description: "View doctor details and book an appointment.",
    };
}

export default function DoctorLayout({ children }) {
    return <>{children}</>;
}
