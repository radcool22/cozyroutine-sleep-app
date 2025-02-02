function Auth({ onLogin }) {
    const [isLogin, setIsLogin] = React.useState(true);
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        name: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // Simulate authentication
            const userData = {
                id: Date.now(),
                email: formData.email,
                name: formData.name || formData.email.split('@')[0]
            };
            onLogin(userData);
        } catch (error) {
            reportError(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div data-name="auth-page" className="min-h-screen bg-purple-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    data-name="name-input"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                                data-name="email-input"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                                data-name="password-input"
                            />
                        </div>
                        <Button type="submit" className="w-full" data-name="submit-button">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                    </form>
                    <p className="text-center mt-4">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-purple-600 font-semibold hover:text-purple-700"
                            data-name="toggle-auth-mode">
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
