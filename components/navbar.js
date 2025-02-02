function Navbar({ currentUser, onLogout, onUpdateUser }) {
    const [currentPath, setCurrentPath] = React.useState(window.location.hash);

    React.useEffect(() => {
        const handleHashChange = () => {
            setCurrentPath(window.location.hash || '#');
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div data-name="navbar" className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 data-name="logo" className="text-2xl font-bold text-purple-800">
                    <span data-name="logo-icon" className="mr-2">💤</span>
                    Cozy Routine
                </h1>
                <nav data-name="nav-links" className="flex items-center gap-6">
                    <a 
                        href="#" 
                        className={`nav-link ${currentPath === '#' ? 'active' : ''}`}
                        data-name="home-link"
                    >
                        Home
                    </a>
                    {currentUser ? (
                        <div data-name="user-nav" className="flex items-center gap-4">
                            <a 
                                href="#dashboard" 
                                className={`nav-link ${currentPath.startsWith('#dashboard') || currentPath.includes('routine-tracker') ? 'active' : ''}`}
                                data-name="dashboard-link"
                            >
                                Dashboard
                            </a>
                            <SettingsDropdown 
                                currentUser={currentUser}
                                onUpdateUser={onUpdateUser}
                                onLogout={onLogout}
                            />
                        </div>
                    ) : (
                        <a 
                            href="#auth" 
                            className={`nav-link ${currentPath === '#auth' ? 'active' : ''}`}
                            data-name="login-link"
                        >
                            Login
                        </a>
                    )}
                </nav>
            </div>
        </div>
    );
}
