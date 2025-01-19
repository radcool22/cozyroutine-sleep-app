const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = React.useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}