import React from "react";

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-light_purple via-mediumpurple to-purple text-white py-20 px-6 md:px-16 lg:px:32">
            <div className="max-w-4x1 mx-auto text-center">
                {/* Headline */}
                <h1 className="text-6x1 md:text-6x1 font-extrabold mb-6">
                    Welcome to <span className="text-gold">Nerdvana</span>
                </h1>
            </div>
        </section>
    );
};

export default Hero;