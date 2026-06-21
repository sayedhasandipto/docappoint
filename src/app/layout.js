import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "DocAppoint - Your Appointment Management Solution",
  description: `DocAppoint is a comprehensive appointment management solution designed to streamline scheduling and enhance patient care. Our platform offers an intuitive interface for both healthcare providers and patients, ensuring efficient appointment booking, reminders, and management. With DocAppoint, you can easily manage your appointments, reduce no-shows, and improve overall patient satisfaction.

Key Features:
- User-Friendly Interface: Navigate through our platform with ease, making appointment scheduling a breeze.
- Automated Reminders: Receive timely notifications to reduce missed appointments and improve attendance.
- Secure Data Management: Protect sensitive patient information with our robust security measures.
- Customizable Scheduling: Tailor appointment slots to fit your practice's unique needs.
- Analytics and Reporting: Gain insights into appointment trends and patient behavior to optimize your services.

Experience the future of appointment management with DocAppoint, where convenience meets efficiency.`,
  keywords: [
    "appointment management",
    "scheduling solution",
    "healthcare appointments",
    "patient care",
    "automated reminders",
    "secure data management",
    "customizable scheduling",
    "analytics and reporting",
  ],
  authors: [{ name: "Sayed Hasan Dipto", url: "https://sayedhasandipto.vercel.app" }],
  creator: "Sayed Hasan Dipto",
  publisher: "Sayed Hasan Dipto",
  openGraph: {
    title: "DocAppoint - Your Appointment Management Solution",
    description: "DocAppoint is a comprehensive appointment management solution designed to streamline scheduling and enhance patient care.",
    url: "https://sayedhasandipto.vercel.app",
    siteName: "DocAppoint",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "DocAppoint Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocAppoint - Your Appointment Management Solution",
    description: "DocAppoint is a comprehensive appointment management solution designed to streamline scheduling and enhance patient care.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
