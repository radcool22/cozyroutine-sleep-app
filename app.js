function App() {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState('home');

    React.useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            // If no hash is present, default to home
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
        // Redirect to home if accessing auth page while logged in
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

    return (
        <div data-name="app">
            <Navbar currentUser={currentUser} onLogout={handleLogout} />
            {currentPage === 'home' && <Home />}
            {currentPage === 'auth' && !currentUser && <Auth onLogin={handleLogin} />}
            {currentPage === 'dashboard' && (
                currentUser ? <Dashboard currentUser={currentUser} /> : window.location.hash = 'auth'
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);