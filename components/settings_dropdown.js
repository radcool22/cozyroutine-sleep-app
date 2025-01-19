function SettingsDropdown({ currentUser, onUpdateUser }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentView, setCurrentView] = React.useState(null);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef} data-name="settings-dropdown">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-800"
                data-name="settings-button"
            >
                <i className="fas fa-cog text-xl"></i>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50" data-name="dropdown-menu">
                    {!currentView ? (
                        <div className="py-1">
                            <button
                                onClick={() => setCurrentView('profile')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                data-name="profile-button"
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => setCurrentView('customization')}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                data-name="customization-button"
                            >
                                Customization
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="border-b px-4 py-2 flex justify-between items-center">
                                <h3 className="text-sm font-medium">
                                    {currentView === 'profile' ? 'Profile Settings' : 'Customization'}
                                </h3>
                                <button
                                    onClick={() => setCurrentView(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                    data-name="back-button"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            {currentView === 'profile' ? (
                                <ProfileSettings 
                                    currentUser={currentUser} 
                                    onUpdateUser={onUpdateUser}
                                    onClose={() => setIsOpen(false)}
                                />
                            ) : (
                                <CustomizationSettings onClose={() => setIsOpen(false)} />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}