function RoutineForm({ onSubmit, onClose }) {
    const [formData, setFormData] = React.useState({
        age: '',
        gender: 'notSpecified',
        currentRoutine: Array(5).fill({ time: '', activity: '' })
    });

    const timeOptions = [
        "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM", "8:45 PM",  
        "9:00 PM", "9:15 PM", "9:30 PM", "9:45 PM", "10:00 PM", "10:15 PM", "10:30 PM", "10:45 PM",  
        "11:00 PM", "11:15 PM", "11:30 PM", "11:45 PM", "12:00 AM"
    ];

    const activityOptions = [
        "Choose activity",
        "Eat dinner",
        "Brushing teeth",
        "Taking a shower",
        "Changing into pajamas",
        "Reading a book",
        "Light stretching",
        "Drinking water",
        "Using the bathroom",
        "Setting up the room",
        "Playing a game",
        "Go to sleep",
        "Not Applicable"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoutineChange = (index, field, value) => {
        setFormData(prev => {
            const newRoutine = [...prev.currentRoutine];
            newRoutine[index] = {
                ...newRoutine[index],
                [field]: value
            };
            return {
                ...prev,
                currentRoutine: newRoutine
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            onSubmit(formData);
            onClose();
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div data-name="modal-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div data-name="modal-content" className="bg-white p-8 rounded-lg w-full max-w-md">
                <h3 className="text-2xl font-bold mb-6">Create New Routine</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                                min="1"
                                max="17"
                                data-name="age-input"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                data-name="gender-select"
                            >
                                <option value="notSpecified">Prefer not to say</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-4">Current Routine</label>
                            {formData.currentRoutine.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2" data-name={`routine-step-${index}`}>
                                    <select
                                        value={item.time}
                                        onChange={(e) => handleRoutineChange(index, 'time', e.target.value)}
                                        className="px-4 py-2 border rounded-lg w-1/3"
                                        data-name={`time-select-${index}`}
                                    >
                                        <option value="">Select time</option>
                                        {timeOptions.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={item.activity}
                                        onChange={(e) => handleRoutineChange(index, 'activity', e.target.value)}
                                        className="px-4 py-2 border rounded-lg w-2/3"
                                        data-name={`activity-select-${index}`}
                                    >
                                        {activityOptions.map(activity => (
                                            <option key={activity} value={activity}>{activity}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <Button 
                            type="submit"
                            data-name="submit-button">
                            Create Routine
                        </Button>
                        <Button 
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            data-name="cancel-button">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}