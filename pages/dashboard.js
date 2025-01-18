function Dashboard({ currentUser }) {
    const [routines, setRoutines] = React.useState([]);
    const [isCreating, setIsCreating] = React.useState(false);

    const createRoutine = async (formData) => {
        try {
            const response = await generateRoutine(formData);
            setRoutines([...routines, response]);
            setIsCreating(false);
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div data-name="dashboard" className="container mx-auto py-8">
            <div data-name="dashboard-header" className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Your Sleep Routines</h2>
                <Button 
                    onClick={() => setIsCreating(true)}
                    data-name="create-routine-button">
                    Create New Routine
                </Button>
            </div>

            <div data-name="routines-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {routines.map((routine, index) => (
                    <div 
                        key={index}
                        data-name="routine-card" 
                        className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">{routine.name}</h3>
                        <p className="mb-4">{routine.description}</p>
                        <Button 
                            variant="secondary"
                            data-name="edit-routine-button">
                            Edit Routine
                        </Button>
                    </div>
                ))}
            </div>

            {isCreating && (
                <RoutineForm
                    onSubmit={createRoutine}
                    onClose={() => setIsCreating(false)}
                />
            )}
        </div>
    );
}