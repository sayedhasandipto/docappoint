import { Heart, Lightbulb, Shield, HandHeart, Users } from "lucide-react";

const values = [
    {
        Icon: Heart,
        title: "Compassion",
        description: "We create a welcoming and supportive environment that puts our patients at ease during their care journey.",
        gradient: "from-rose-500 to-pink-600",
        bg: "bg-rose-50",
    },
    {
        Icon: Lightbulb,
        title: "Excellence",
        description: "We continuously improve our skills and resources to deliver the highest quality care possible.",
        gradient: "from-amber-500 to-orange-600",
        bg: "bg-amber-50",
    },
    {
        Icon: Shield,
        title: "Integrity",
        description: "We practice medicine with transparency and honesty, always putting our patients' interests first.",
        gradient: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50",
    },
    {
        Icon: HandHeart,
        title: "Respect",
        description: "We treat all individuals with dignity regardless of their background, beliefs, or circumstances.",
        gradient: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50",
    },
    {
        Icon: Users,
        title: "Teamwork",
        description: "We work collaboratively with healthcare professionals to provide comprehensive care to patients.",
        gradient: "from-violet-500 to-purple-600",
        bg: "bg-violet-50",
    }
];

const Value = () => {
    return (
        <section className="py-20 px-4 w-full bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4 tracking-wide">
                        WHY CHOOSE US
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                        Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Values</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        The principles that guide everything we do in healthcare.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <div 
                            key={index} 
                            className={`group relative p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-100/30 transition-all duration-500 hover:-translate-y-1 ${index === 4 ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                <value.Icon className="w-7 h-7 text-white" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{value.description}</p>

                            {/* Decorative corner */}
                            <div className={`absolute top-0 right-0 w-24 h-24 ${value.bg} rounded-bl-[4rem] rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Value;