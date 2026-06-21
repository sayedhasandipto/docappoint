import React from 'react';
import { Heart, Stethoscope, Award, Clock } from 'lucide-react';

const stats = [
    { icon: Heart, value: "10k+", label: "Happy Patients", color: "from-rose-500 to-pink-600" },
    { icon: Stethoscope, value: "500+", label: "Expert Doctors", color: "from-blue-500 to-indigo-600" },
    { icon: Award, value: "50+", label: "Specialties", color: "from-amber-500 to-orange-600" },
    { icon: Clock, value: "24/7", label: "Support Available", color: "from-emerald-500 to-teal-600" },
];

const StatsSection = () => {
    return (
        <section className="relative py-20 w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">{stat.value}</h3>
                            <p className="text-blue-200 font-medium text-sm uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
