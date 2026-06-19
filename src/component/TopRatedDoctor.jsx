import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const TopRatedDoctor = () => {
    return (
        <div>

            <div className="flex gap-4">
                <Card className="col-span-12 min-h-100 w-100 overflow-hidden rounded-3xl lg:col-span-6">
                    {/* Background image */}
                    <Image
                        src="https://i.ibb.co/FL6H0BN7/pfp.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                    {/* Header */}
                    <Card.Header className="z-10 text-white">
                        <Card.Title className="text-xs font-semibold tracking-wide text-black/70">
                            SAYED HASAN DIPTO
                        </Card.Title>
                        <Card.Description className="text-sm leading-5 font-medium text-black/50">
                            Web Developer
                        </Card.Description>
                    </Card.Header>
                    {/* Footer */}
                    <Card.Footer className="z-10 mt-auto gap-8 flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-white">Available soon</div>
                            <div className="text-xs text-white/60">Get notified</div>
                        </div>
                        <Button className="bg-white text-black" size="sm" variant="tertiary">
                            Notify me
                        </Button>
                    </Card.Footer>
                </Card>
            </div>

        </div >
    );
};

export default TopRatedDoctor;