"use client";

import { useEffect, useState } from "react";
import MarqueeText from "react-marquee-text";

const MarqueeSpeed = ({ children }: { children: React.ReactNode }) => {
    const [duration, setDuration] = useState(20);

    useEffect(() => {
        const updateDuration = () => {
            setDuration(window.innerWidth < 768 ? 5 : 20);
        };

        updateDuration();
        window.addEventListener("resize", updateDuration);

        return () => {
            window.removeEventListener("resize", updateDuration);
        };
    }, []);

    return (
        <MarqueeText direction="right" duration={duration}>
            {children}
        </MarqueeText>
    );
};

export default MarqueeSpeed;
