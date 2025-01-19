function Dashboard({ currentUser }) {
    const [routinePairs, setRoutinePairs] = React.useState([]);
    const [isCreating, setIsCreating] = React.useState(false);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [selectedPairId, setSelectedPairId] = React.useState(null);

    const createRoutine = async (formData) => {
        try {
            setIsGenerating(true);
            const originalRoutine = {
                name: "Original Routine",
                description: "Your input routine",
                steps: formData.currentRoutine.map(step => ({
                    time: step.time,
                    activity: step.activity,
                    note: ""
                }))
            };

            const aiGeneratedRoutine = await generateRoutine(formData);
            
            const newPair = {
                id: Date.now(),
                childAge: formData.age,
                childGender: formData.gender,
                createdAt: new Date().toISOString(),
                originalRoutine,
                aiRoutine: aiGeneratedRoutine
            };

            setRoutinePairs(prev => [newPair, ...prev]);
            setIsCreating(false);
        } catch (error) {
            reportError(error);
            alert('Failed to generate routine. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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

            {isGenerating && (
                <div className="text-center py-4" data-name="loading-indicator">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
                    <p className="mt-2 text-gray-600">Generating your perfect routine...</p>
                </div>
            )}

            <div data-name="routines-list" className="space-y-4">
                {routinePairs.map((pair) => (
                    <div 
                        key={pair.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                        data-name="routine-pair-item"
                    >
                        <div 
                            className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                            onClick={() => setSelectedPairId(selectedPairId === pair.id ? null : pair.id)}
                        >
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Routine for {pair.childAge} year old
                                    {pair.childGender && ` (${pair.childGender})`}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Created on {formatDate(pair.createdAt)}
                                </p>
                            </div>
                            <i className={`fas fa-chevron-${selectedPairId === pair.id ? 'up' : 'down'} text-gray-400`}></i>
                        </div>

                        {selectedPairId === pair.id && (
                            <div className="p-4 border-t">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div data-name="original-routine" className="space-y-4">
                                        <h4 className="font-semibold text-lg">Original Routine</h4>
                                        <ul className="space-y-2">
                                            {pair.originalRoutine.steps.map((step, index) => (
                                                <li 
                                                    key={index}
                                                    className="flex items-start gap-2"
                                                    data-name={`original-step-${index}`}>
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
                                        <h4 className="font-semibold text-lg">AI-Enhanced Routine</h4>
                                        <ul className="space-y-2">
                                            {pair.aiRoutine.steps.map((step, index) => (
                                                <li 
                                                    key={index}
                                                    className="flex items-start gap-2"
                                                    data-name={`ai-step-${index}`}>
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
                        )}
                    </div>
                ))}
            </div>

            {routinePairs.length === 0 && !isCreating && !isGenerating && (
                <div 
                    className="text-center py-12 bg-gray-50 rounded-lg"
                    data-name="empty-state">
                    <h3 className="text-xl font-semibold mb-2">No Routines Yet</h3>
                    <p className="text-gray-600 mb-4">Create your first routine to get started!</p>
                    <Button 
                        onClick={() => setIsCreating(true)}
                        data-name="create-first-routine-button">
                        Create First Routine
                    </Button>
                </div>
            )}

            {isCreating && (
                <RoutineForm
                    onSubmit={createRoutine}
                    onClose={() => setIsCreating(false)}
                />
            )}
        </div>
    );
}