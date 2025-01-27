function Button({ children, onClick, variant = "primary", className = "" }) {
    const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-300";
    const variants = {
        primary: "bg-purple-600 text-white hover:bg-purple-700",
        secondary: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    };

    return (
        <button
            data-name="button"
            className={`${baseClasses} ${variants[variant]} ${className}`}
            onClick={onClick}>
            {children}
        </button>
    );
}
