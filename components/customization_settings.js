function CustomizationSettings({ onClose }) {
    const { darkMode, toggleTheme } =   (ThemeContext);

    return (
        <div className="p-4" data-name="cus tomization-settings">
            <div className="flex items-center justify-between">
                <span className="text-sm">Dark Mode</span>
                <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        darkMode ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                    data-name="theme-toggle"
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                </button>
            </div>
        </div>
    );
}