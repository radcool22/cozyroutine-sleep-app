function App() {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState('home');

    React.useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (!hash) {
                window.location.hash = 'home';
                return;
            }
            setCurrentPage(hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    React.useEffect(() => {
        if (currentUser && currentPage === 'auth') {
            window.location.hash = 'dashboard';
        }
    }, [currentPage, currentUser]);

    const handleLogin = (userData) => {
        try {
            setCurrentUser(userData);
            window.location.hash = 'dashboard';
        } catch (error) {
            reportError(error);
        }
    };

    const handleLogout = () => {
        try {
            setCurrentUser(null);
            window.location.hash = 'home';
        } catch (error) {
            reportError(error);
        }
    };

    const handleUpdateUser = (userData) => {
        try {
            setCurrentUser(prev => ({
                ...prev,
                ...userData
            }));
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <ThemeProvider>
            <div data-name="app" className="transition-colors duration-200">
                <Navbar 
                    currentUser={currentUser} 
                    onLogout={handleLogout}
                    onUpdateUser={handleUpdateUser}
                />
                {currentPage === 'home' && <Home />}
                {currentPage === 'auth' && !currentUser && <Auth onLogin={handleLogin} />}
                {currentPage === 'dashboard' && (
                    currentUser ? <Dashboard currentUser={currentUser} /> : window.location.hash = 'auth'
                )}
            </div>
        </ThemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
