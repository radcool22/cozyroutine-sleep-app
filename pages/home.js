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
            <section data-name="hero" className="hero-section">
                <div className="container mx-auto text-center">
                    <h1 data-name="hero-title" className="text-5xl font-bold mb-4 text-white">
                        Sweet Dreams Start with Cozy Routines
                    </h1>
                    <p data-name="hero-subtitle" className="text-xl mb-6 text-white">
                        Create personalized bedtime routines for the little ones using AI technology
                    </p>
                    <Button 
                        onClick={handleGetStarted}
                        data-name="get-started-button">
                        Get Started
                    </Button>
                </div>
            </section>

            <section data-name="features" className="py-6">
                <div className="container mx-auto">
                    <h2 data-name="features-title" className="text-3xl font-bold text-center mb-6">
                        Why Choose Cozy Routine?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div data-name="feature-card" className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-3">AI-Powered Routines</h3>
                            <p>Personalized schedules based on your child's needs</p>
                        </div>
                        <div data-name="feature-card" className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-3">Child-Friendly</h3>
                            <p>Designed with children in mind for better sleep habits</p>
                        </div>
                        <div data-name="feature-card" className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-3">Easy to Adjust</h3>
                            <p>Modify routines as your child grows and needs change</p>
                        </div>
                    </div>
                </div>
            </section>

            <section data-name="about-us" className="py-8 bg-white">
                <div className="container mx-auto">
                    <h2 data-name="about-title" className="text-3xl font-bold text-center mb-6">
                        About Us
                    </h2>
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-lg mb-4">
                            At Cozy Routine, we understand that every child is unique, and so should be their bedtime routine. 
                            Founded by a team of child sleep specialists and AI experts, we're committed to helping parents 
                            establish healthy sleep habits for their children.
                        </p>
                        <p className="text-lg mb-4">
                            Our AI-powered platform takes into account your child's age, preferences, and current routine to 
                            create a personalized sleep schedule that works for your family. We believe that better sleep leads 
                            to happier, healthier children and more relaxed parents.
                        </p>
                        <p className="text-lg">
                            With years of experience in child development and sleep science, our team has helped thousands of 
                            families worldwide establish effective bedtime routines. We combine this expertise with cutting-edge 
                            AI technology to provide you with the most personalized and effective sleep solutions.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
