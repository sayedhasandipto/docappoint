import { Bulb, CircleDollar } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaHandsHoldingChild } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
import { TiPointOfInterestOutline } from "react-icons/ti";

const Value = () => {
    return (
        <div className="container mx-auto my-20">
            <h1 className="text-5xl text-[#274760] font-bold text-center mb-25">Our Values</h1>
            <div className="flex flex-wrap items-center justify-center gap-10" >
                <Card className="w-100 text-center p-6">
                    <Card.Header>
                        <Card.Title className="flex items-center text-[#274760] gap-2 mx-auto text-3xl mb-6 font-bold">
                            <div className="w-10 h-10 rounded-full bg-[oklch(0.6204_0.195_253.83)] flex items-center justify-center gap-3 text-center">
                                <FaHandsHoldingChild className="text-white w-5 h-5" />
                            </div>
                            Compassion
                        </Card.Title>
                        <Card.Description className="text-lg text-[#27476088] leading-7">
                            We understand that seeking medical
                            care can be a stressful and emotional
                            experience, and we strive to create a
                            welcoming and supportive environment
                            that puts our patients at ease and every
                            one.
                        </Card.Description>
                    </Card.Header>
                </Card>
                <Card className="w-100 text-center p-6">
                    <Card.Header>
                        <Card.Title className="flex items-center text-[#274760] gap-2 mx-auto text-3xl mb-6 font-bold">
                            <div className="w-10 h-10 rounded-full bg-[oklch(0.6204_0.195_253.83)] flex items-center justify-center gap-3 text-center">
                                <Bulb className="text-white w-5 h-5" />
                            </div>
                            Excellence
                        </Card.Title>
                        <Card.Description className="text-lg text-[#27476088] leading-7">
                            We are committed to providing excellent
                            medical care and services to our
                            patients. We believe in continuously
                            improving our skills, knowledge, and
                            resources to ensure that we deliver the
                            highest quality care possible.
                        </Card.Description>
                    </Card.Header>
                </Card>
                <Card className="w-100 text-center p-6">
                    <Card.Header>
                        <Card.Title className="flex items-center text-[#274760] gap-2 mx-auto text-3xl mb-6 font-bold">
                            <div className="w-10 h-10 rounded-full bg-[oklch(0.6204_0.195_253.83)] flex items-center justify-center gap-3 text-center">
                                <TiPointOfInterestOutline className="text-white w-5 h-5" />
                            </div>
                            Integrity
                        </Card.Title>
                        <Card.Description className="text-lg text-[#27476088] leading-7">
                            We believe in practicing medicine with
                            integrity and honesty. We are
                            transparent in our communication and
                            decision-making processes, and we
                            always put our patient&apos;s interests first &
                            provide best solution.
                        </Card.Description>
                    </Card.Header>
                </Card>
                <Card className="w-100 text-center p-6">
                    <Card.Header>
                        <Card.Title className="flex items-center text-[#274760] gap-2 mx-auto text-3xl mb-6 font-bold">
                            <div className="w-10 h-10 rounded-full bg-[oklch(0.6204_0.195_253.83)] flex items-center justify-center gap-3 text-center">
                                <FaHandHoldingHeart className="text-white w-5 h-5" />
                            </div>
                            Respect
                        </Card.Title>
                        <Card.Description className="text-lg text-[#27476088] leading-7">
                            We treat all individuals with respect and
                            dignity, regardless of their background,
                            beliefs, or circumstances. We believe
                            that every person deserves to be treated
                            with compassion and kindness.
                        </Card.Description>
                    </Card.Header>
                </Card>
                <Card className="w-100 text-center p-6">
                    <Card.Header>
                        <Card.Title className="flex items-center text-[#274760] gap-2 mx-auto text-3xl mb-6 font-bold">
                            <div className="w-10 h-10 rounded-full bg-[oklch(0.6204_0.195_253.83)] flex items-center justify-center gap-3 text-center">
                                <RiTeamFill className="text-white w-5 h-5" />
                            </div>
                            Teamwork
                        </Card.Title>
                        <Card.Description className="text-lg text-[#27476088] leading-7">
                            We believe in working collaboratively
                            with our team membersvand other
                            healthcare professionals to provide
                            comprehensive and effective care to our
                            patients.
                        </Card.Description>
                    </Card.Header>
                </Card>
            </div>
        </div>
    );
};

export default Value;