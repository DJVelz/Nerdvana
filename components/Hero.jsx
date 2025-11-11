import React from "react";

const Hero = ({ title, highlight, subtitle}) => {
    return (
        <section className={"relative bg-gradient-to-r from-light_purple via-blueviolet to-purple text-white py-20 px-6 md:px-16 lg:px:32"}>
            <div className="max-w-4x1 mx-auto text-center">
                {/* Headline */}
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                    {title} <span className="text-gold">{highlight}</span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl mb-8 text-gray-200 whitespace-pre-line">
                    {subtitle}
                </p>
            </div>
        </section>
    );
};

export default Hero;