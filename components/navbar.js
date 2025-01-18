function Navbar({ currentUser, onLogout }) {
    return (
        <div data-name="navbar" className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 data-name="logo" className="text-2xl font-bold text-purple-800">Cozy Routine</h1>
                <nav data-name="nav-links" className="flex items-center gap-6">
                    <a href="#" className="nav-link py-2" data-name="home-link">Home</a>
                    {currentUser ? (
                        <div data-name="user-nav" className="flex items-center gap-4">
                            <a href="#dashboard" className="nav-link py-2" data-name="dashboard-link">Dashboard</a>
                            <button 
                                onClick={onLogout}
                                className="nav-link py-2"
                                data-name="logout-button">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <a href="#auth" className="btn-primary" data-name="login-link">Login</a>
                    )}
                </nav>
            </div>
        </div>
    );
}