function Home() {
    const handleGetStarted = () => {
        try {
            window.location.hash = 'auth';
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div data-name="home-page">
            <section data-name="hero" className="hero-section text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 data-name="hero-title" className="text-5xl font-bold mb-6">
                        Sweet Dreams Start with Cozy Routine
                    </h1>
                    <p data-name="hero-subtitle" className="text-xl mb-8">
                        Create personalized bedtime routines for your little ones using AI
                    </p>
                    <Button 
                        onClick={handleGetStarted}
                        data-name="get-started-button">
                        Get Started
                    </Button>
                </div>
            </section>

            <section data-name="features" className="py-16">
                <div className="container mx-auto">
                    <h2 data-name="features-title" className="text-3xl font-bold text-center mb-12">
                        Why Choose Cozy Routine?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div data-name="feature-card" className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">AI-Powered Routines</h3>
                            <p>Personalized schedules based on your child's needs</p>
                        </div>
                        <div data-name="feature-card" className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">Child-Friendly</h3>
                            <p>Designed with children in mind for better sleep habits</p>
                        </div>
                        <div data-name="feature-card" className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">Easy to Adjust</h3>
                            <p>Modify routines as your child grows and needs change</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}