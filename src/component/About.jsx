import { ArrowRight } from '@gravity-ui/icons';
import Image from 'next/image';
import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto my-20 flex max-sm:flex-col items-center justify-center gap-10 max-sm:p-4">
            <div>
                <Image
                    src="/about.png"
                    alt="About Us"
                    width={700}
                    height={400}
                />
            </div>
            <div>
                <div className="mb-16">
                    <h1 className="text-5xl text-[#274760] font-bold mb-4">About Us</h1>
                    <p className="text-lg text-[#307BC4] font-bold">
                        PRO HEALTH
                    </p>
                </div>
                <div className="flex gap-4 justify-center">
                    <ArrowRight className="text-lg text-[#307BC4] font-bold w-11 h-11" />
                    <div className="mt-2 w-md max-sm:w-[100%]">
                        <h2 className="text-2xl leading-7 font-bold mb-4 text-[#274760]">ProHealth is a team of experienced
                            medical professionals</h2>
                        <p className="leading-7 text-[#274760a2]">
                            Dedicated to providing top-quality healthcare services.
                            We believe in a holistic approach to healthcare that
                            focuses on treating the whole person, not just the illness
                            or symptoms.</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default About;