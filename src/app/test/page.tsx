import React from 'react';

const HooksMaster = () => {
    return (
        <div className="relative min-h-screen bg-blue-50 flex flex-col items-center overflow-hidden">
            {/* Header */}
            <header className="w-full bg-white shadow-md py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                    {/* Placeholder for the Logo */}
                    <div className="w-28 h-10 bg-gray-300 rounded-md"></div>
                    <nav className="space-x-6 text-gray-800">
                        <a href="#" className="hover:underline">Home</a>
                        <a href="#" className="hover:underline">Portfolio</a>
                        <a href="#" className="hover:underline">About</a>
                        <a href="#" className="hover:underline">Contact</a>
                    </nav>
                    <div className="space-x-4">
                        <button className="text-blue-500 bg-white border border-blue-500 px-4 py-2 rounded-full hover:bg-gray-100">Login</button>
                        <button className="text-white bg-blue-600 px-5 py-2 rounded-full hover:bg-blue-700">Get Started</button>
                    </div>
                </div>
            </header>

            {/* Semicircle Background Shape */}
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 w-[300px] h-[300px] rounded-full"></div>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 max-w-2xl">
                    Create <span className="text-yellow-500">High-Converting</span> Video Hooks Effortlessly
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl">
                    Every Facebook Advertiser Knows The Power Of A Great Video Hook. Now, With HooksMaster.io, You Can Create Winning Hooks In Minutes, Without The Hassle Or Expense Of Hiring Video Editors.
                </p>
                <button className="mt-6 text-white bg-blue-600 px-8 py-3 rounded-full text-lg hover:bg-blue-700">Get Started Now</button>

                {/* Placeholder for the Video Section */}
                <div className="w-full max-w-4xl mt-12 bg-gray-300 h-64 rounded-lg"></div>
            </main>

            {/* How It Works Section */}
            <section className="w-full bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center">How It Works</h2>
                    <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
                        It’s That Simple. With HooksMaster.io, You Can Test Hooks Rapidly, Find Winning Ads Faster, And Skyrocket Your Facebook Ad ROI.
                    </p>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                            <div className="text-4xl font-bold text-blue-500">1</div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">Prepare Your Hooks:</h3>
                            <p className="mt-2 text-gray-600">Type Up Your Hooks In a CSV File.</p>
                        </div>
                        <div className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                            <div className="text-4xl font-bold text-blue-500">2</div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">Select Video Clips:</h3>
                            <p className="mt-2 text-gray-600">Choose The Video Clips You Want To Include.</p>
                        </div>
                        <div className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                            <div className="text-4xl font-bold text-blue-500">3</div>
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">Generate Hooks:</h3>
                            <p className="mt-2 text-gray-600">Click-Play And Get Brand New Hooks Instantly.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HooksMaster;
