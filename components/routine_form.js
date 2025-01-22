function RoutineForm({ onSubmit, onClose }) {
    const [formData, setFormData] = React.useState({
        name: '',
        age: '',
        gender: '',
        currentRoutine: Array(3).fill({ time: '7:00 PM', activity: '' })
    });

    const timeOptions = [
        "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", 
        "8:00 PM", "8:15 PM", "8:30 PM", "8:45 PM",
        "9:00 PM", "9:15 PM", "9:30 PM", "9:45 PM", 
        "10:00 PM", "10:15 PM", "10:30 PM", "10:45 PM",
        "11:00 PM", "11:15 PM", "11:30 PM", "11:45 PM", 
        "12:00 AM"
    ];

    const activityOptions = [
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
        "Go to sleep"
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

    const addRoutineStep = () => {
        setFormData(prev => ({
            ...prev,
            currentRoutine: [...prev.currentRoutine, { time: '7:00 PM', activity: '' }]
        }));
    };

    const removeRoutineStep = (index) => {
        if (formData.currentRoutine.length <= 3) {
            return; // Don't remove if only 3 steps remain
        }
        setFormData(prev => ({
            ...prev,
            currentRoutine: prev.currentRoutine.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // Validate required fields
            if (!formData.name || !formData.age) {
                alert('Please enter name and age');
                return;
            }
            
            // Validate routine steps
            const isRoutineValid = formData.currentRoutine.every(step => step.time && step.activity);
            if (!isRoutineValid) {
                alert('Please select an activity for each routine step');
                return;
            }

            onSubmit(formData);
            onClose();
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div data-name="modal-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div data-name="modal-content" className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-2xl font-bold mb-4">Create New Routine</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Child's Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                                data-name="name-input"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Age <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                                min="1"
                                max="15"
                                data-name="age-input"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Gender <span className="text-gray-400">(optional)</span>
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                data-name="gender-select"
                            >
                                <option value="">Select a gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="notSpecified">Prefer not to say</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Current Routine <span className="text-red-500">*</span>
                            </label>
                            {formData.currentRoutine.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2 items-center" data-name={`routine-step-${index}`}>
                                    <select
                                        value={item.time}
                                        onChange={(e) => handleRoutineChange(index, 'time', e.target.value)}
                                        className="px-3 py-2 border rounded-lg w-1/3"
                                        required
                                        data-name={`time-select-${index}`}
                                    >
                                        {timeOptions.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={item.activity}
                                        onChange={(e) => handleRoutineChange(index, 'activity', e.target.value)}
                                        className="px-3 py-2 border rounded-lg w-1/2"
                                        required
                                        data-name={`activity-select-${index}`}
                                    >
                                        <option value="">Select an activity</option>
                                        {activityOptions.map(activity => (
                                            <option key={activity} value={activity}>{activity}</option>
                                        ))}
                                    </select>
                                    {formData.currentRoutine.length > 3 && (
                                        <button
                                            type="button"
                                            onClick={() => removeRoutineStep(index)}
                                            className="text-red-500 hover:text-red-700"
                                            data-name={`remove-step-${index}`}
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                            {formData.currentRoutine.length < 10 && (
                                <button
                                    type="button"
                                    onClick={addRoutineStep}
                                    className="text-purple-600 hover:text-purple-700 text-sm mt-2"
                                    data-name="add-step-button"
                                >
                                    + Add another step
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
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