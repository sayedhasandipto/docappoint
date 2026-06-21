import Image from 'next/image';
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
    "Holistic approach to healthcare",
    "Experienced medical professionals",
    "Patient-centered treatment plans",
    "Modern diagnostic equipment",
];

const About = () => {
    return (
        <section className="py-20 px-4 w-full bg-gradient-to-b from-white to-blue-50/30">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10">
                            <Image
                                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800&auto=format&fit=crop"
                                alt="About DocAppoint"
                                width={600}
                                height={450}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100">
                            <div className="text-center">
                                <p className="text-4xl font-extrabold text-blue-600">15+</p>
                                <p className="text-sm text-gray-500 font-medium">Years of<br/>Excellence</p>
                            </div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4 tracking-wide">
                            ABOUT US
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            We Are a Team of <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Experienced Medical
                            </span> Professionals
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-8">
                            Dedicated to providing top-quality healthcare services. We believe in a holistic approach to healthcare that focuses on treating the whole person, not just the illness or symptoms.
                        </p>

                        {/* Feature List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/appointment">
                            <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2">
                                Book Appointment <ArrowRight size={18} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;