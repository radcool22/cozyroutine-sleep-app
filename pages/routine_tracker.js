function RoutineTracker({ routinePair, onBack }) {
    const [selectedMonth, setSelectedMonth] = React.useState(new Date());
    const [trackingData, setTrackingData] = React.useState({});
    const [showRoutine, setShowRoutine] = React.useState(false);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    };

    const handleTrackDay = (date, followed) => {
        try {
            const dateStr = date.toISOString().split('T')[0];
            setTrackingData(prev => ({
                ...prev,
                [dateStr]: followed
            }));
            // Here you would typically save this to a backend
        } catch (error) {
            reportError(error);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const changeMonth = (increment) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        setSelectedMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + increment);
            
            // Don't allow going to past months
            if (increment < 0) {
                const currentMonth = today.getMonth();
                const currentYear = today.getFullYear();
                if (newDate.getMonth() < currentMonth && newDate.getFullYear() <= currentYear) {
                    return prev;
                }
            }
            
            return newDate;
        });
    };

    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const canNavigateToPrevMonth = () => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        return selectedMonth.getMonth() > currentMonth || 
               selectedMonth.getFullYear() > currentYear;
    };

    return (
        <div data-name="routine-tracker" className="container mx-auto py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={onBack}
                        className="text-purple-600 hover:text-purple-800 flex items-center gap-2"
                        data-name="back-button"
                    >
                        <i className="fas fa-arrow-left"></i>
                        Back to Dashboard
                    </button>
                    <button
                        onClick={() => setShowRoutine(!showRoutine)}
                        className="text-purple-600 hover:text-purple-800 flex items-center gap-2"
                        data-name="view-routine-button"
                    >
                        <i className={`fas fa-${showRoutine ? 'calendar' : 'list'}`}></i>
                        {showRoutine ? 'View Calendar' : 'View Routine'}
                    </button>
                </div>

                {/* Rest of the component remains exactly the same */}
                {showRoutine ? (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">
                            {routinePair.childName}'s Routine
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div data-name="original-routine" className="space-y-4">
                                <h3 className="font-semibold text-lg">Original Routine</h3>
                                <ul className="space-y-2">
                                    {routinePair.originalRoutine.steps.map((step, index) => (
                                        <li 
                                            key={index}
                                            className="flex items-start gap-2"
                                            data-name={`original-step-${index}`}
                                        >
                                            <span className="font-medium min-w-[80px]">{step.time}</span>
                                            <div>
                                                <p className="font-medium">{step.activity}</p>
                                                {step.note && (
                                                    <p className="text-sm text-gray-600">{step.note}</p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div data-name="ai-routine" className="space-y-4">
                                <h3 className="font-semibold text-lg">AI-Enhanced Routine</h3>
                                <ul className="space-y-2">
                                    {routinePair.aiRoutine.steps.map((step, index) => (
                                        <li 
                                            key={index}
                                            className="flex items-start gap-2"
                                            data-name={`ai-step-${index}`}
                                        >
                                            <span className="font-medium min-w-[80px]">{step.time}</span>
                                            <div>
                                                <p className="font-medium">{step.activity}</p>
                                                {step.note && (
                                                    <p className="text-sm text-gray-600">{step.note}</p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">
                                Tracking: {routinePair.childName}'s Routine
                            </h2>
                            <p className="text-gray-600">
                                Track your progress by marking each day as followed or not followed
                            </p>
                        </div>

                        <div className="mb-6 flex items-center justify-between">
                            <button
                                onClick={() => changeMonth(-1)}
                                className={`text-purple-600 hover:text-purple-800 ${!canNavigateToPrevMonth() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!canNavigateToPrevMonth()}
                                data-name="prev-month"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <h3 className="text-xl font-semibold">
                                {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h3>
                            <button
                                onClick={() => changeMonth(1)}
                                className="text-purple-600 hover:text-purple-800"
                                data-name="next-month"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div 
                                    key={day} 
                                    className="text-center font-semibold text-sm py-2"
                                    data-name={`weekday-${day.toLowerCase()}`}
                                >
                                    {day}
                                </div>
                            ))}

                            {getDaysInMonth(selectedMonth).map((date, index) => {
                                const dateStr = date.toISOString().split('T')[0];
                                const dayOfWeek = date.getDay();
                                const followed = trackingData[dateStr];

                                // Add empty cells for days before the first day of the month
                                if (index === 0) {
                                    const emptyDays = Array.from({ length: dayOfWeek }, (_, i) => (
                                        <div key={`empty-${i}`} className="h-24"></div>
                                    ));
                                    return [...emptyDays, 
                                        <div 
                                            key={dateStr}
                                            className={`border rounded-lg p-2 h-24 ${
                                                isToday(date) ? 'bg-purple-50' : ''
                                            }`}
                                            data-name={`day-${date.getDate()}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className={`text-sm ${isToday(date) ? 'font-bold' : ''}`}>
                                                    {date.getDate()}
                                                </span>
                                                {isPastDate(date) && (
                                                    <div className="space-x-2">
                                                        <button
                                                            onClick={() => handleTrackDay(date, true)}
                                                            className={`text-lg ${followed === true ? 'text-green-500' : 'text-gray-300'}`}
                                                            title="Followed routine"
                                                            data-name={`follow-btn-${date.getDate()}`}
                                                        >
                                                            <i className="fas fa-thumbs-up"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleTrackDay(date, false)}
                                                            className={`text-lg ${followed === false ? 'text-red-500' : 'text-gray-300'}`}
                                                            title="Did not follow routine"
                                                            data-name={`not-follow-btn-${date.getDate()}`}
                                                        >
                                                            <i className="fas fa-thumbs-down"></i>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ];
                                }

                                return (
                                    <div 
                                        key={dateStr}
                                        className={`border rounded-lg p-2 h-24 ${
                                            isToday(date) ? 'bg-purple-50' : ''
                                        }`}
                                        data-name={`day-${date.getDate()}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className={`text-sm ${isToday(date) ? 'font-bold' : ''}`}>
                                                {date.getDate()}
                                            </span>
                                            {isPastDate(date) && (
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => handleTrackDay(date, true)}
                                                        className={`text-lg ${followed === true ? 'text-green-500' : 'text-gray-300'}`}
                                                        title="Followed routine"
                                                        data-name={`follow-btn-${date.getDate()}`}
                                                    >
                                                        <i className="fas fa-thumbs-up"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleTrackDay(date, false)}
                                                        className={`text-lg ${followed === false ? 'text-red-500' : 'text-gray-300'}`}
                                                        title="Did not follow routine"
                                                        data-name={`not-follow-btn-${date.getDate()}`}
                                                    >
                                                        <i className="fas fa-thumbs-down"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}