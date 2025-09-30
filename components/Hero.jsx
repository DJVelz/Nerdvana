import React from "react";

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-light_purple via-mediumpurple to-purple text-white py-20 px-6 md:px-16 lg:px:32">
            <div className="max-w-4x1 mx-auto text-center">
                {/* Headline */}
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                    Welcome to <span className="text-gold">Nerdvana</span>
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl mb-8 text-gray-200">
                    The ultimate community for gamers, geeks, and pop culture fans. 
                    Dive into forums, guides, and discussions with fellow nerds.
                </p>
            </div>
        </section>
    );
};

export default Hero;