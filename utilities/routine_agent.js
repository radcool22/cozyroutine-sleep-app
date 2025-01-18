async function generateRoutine(userInput) {
    try {
        const systemPrompt = `You are an expert in children's sleep patterns and routines. Create a personalized nighttime routine based on the following parameters. The routine should be engaging, child-friendly, and promote healthy sleep habits.`;
        
        const userPrompt = `Create a bedtime routine for a child with these preferences: ${JSON.stringify(userInput)}`;
        
        const routineResponse = await invokeAIAgent(systemPrompt, userPrompt);
        return JSON.parse(routineResponse);
    } catch (error) {
        reportError(error);
        throw new Error('Failed to generate routine');
    }
}