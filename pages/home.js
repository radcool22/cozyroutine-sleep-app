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
                        Create personalized bedtime routines for children using AI technology and track their commitmments to it.
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
                            <p>Personalized schedules based on children's needs, including factors such as age, gender, and their current routines.</p>
                        </div>
                        <div data-name="feature-card" className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-3">Child-Friendly</h3>
                            <p>Designed with feedback from children in mind for better sleep routine generation.</p>
                        </div>
                        <div data-name="feature-card" className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-3">Reward-Based Tracking</h3>
                            <p>Track children's routine with a fun reward system which gamifies following the sleep routine.</p>
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
                        Introducing Cozy Routine, the ultimate sleep routine app for kids! 
                        Designed with AI-powered personalization, this app creates the perfect bedtime schedule tailored to each child's needs. 
                        With just a few simple inputs—such as age, sleep patterns, and bedtime habits—Cozy Routine generates a scientifically backed routine to help kids sleep better. 
                        No more guessing what works best—this app takes the stress out of bedtime for parents while making it fun and engaging for kids.
                        </p>
                        <p className="text-lg mb-4">
                        But Cozy Routine is not just about schedules—it is about motivation too! 
                        The built-in reward system encourages kids to stick to their bedtime routine by earning points and unlocking fun achievements. 
                        Whether it is to brush their teeth on time, completing a bedtime story, or turning off screens early, the kids stay engaged through positive reinforcement. 
                        </p>
                        <p className="text-lg">
                        I am a 15-year-old developer, and I created Cozy Routine for my little sister who struggled with maintaining a healthy sleep schedule. 
                        Seeing how much it helped her, I knew other families could benefit from it too. 
                        Cozy Routine blends AI-driven insights with an interactive, reward-based system to create better sleep habits for kids while giving parents peace of mind. 
                        Try it out and make bedtime a cozy, stress-free experience!
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
