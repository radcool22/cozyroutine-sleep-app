async function generateRoutine(userInput) {
    try {
        //const OPENAI_API_KEY = "";
        const systemPrompt = `You are an expert in children's sleep patterns and routines. Create a personalized nighttime routine that promotes healthy sleep habits.

Key guidelines to follow:
- Activities should become progressively calmer as bedtime approaches
- Avoid screen time near bedtime
- Include essential hygiene activities
- Total routine duration: 1-1.5 hours
- Make activities age-appropriate
- Ensure consistent timing
- Include relaxation techniques

Please format your response with specific times and activities, one per line, like this:
7:00 PM - Dinner time
7:30 PM - Bath time
8:00 PM - Story time
etc.`;

        const userPrompt = `Create a sleep routine for a ${userInput.age} year old child. Current routine steps: ${JSON.stringify(userInput.currentRoutine)}. 
Please generate an improved version that better promotes sleep and relaxation.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: userPrompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}. description: ${errorText}`);
        }

        const data = await response.json();
        const routineText = data.choices[0].message.content;

        // Parse the response into a structured format
        const routineData = {
            name: "Personalized Sleep Routine",
            description: "AI-generated routine optimized for better sleep",
            steps: parseRoutineSteps(routineText)
        };

        if (routineData.steps.length === 0) {
            throw new Error('Failed to parse routine steps from AI response');
        }

        return routineData;
    } catch (error) {
        reportError(error);
        throw new Error('Failed to generate routine: ' + error.message);
    }
}

function parseRoutineSteps(routineText) {
    try {
        // Split the text into lines and extract time and activity
        const lines = routineText.split('\n').filter(line => line.trim());
        const steps = [];

        lines.forEach(line => {
            // Look for time patterns (e.g., "7:00 PM", "7:30 PM")
            const timeMatch = line.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
            if (timeMatch) {
                const time = timeMatch[1];
                let activity = line.replace(time, '').trim()
                    .replace(/^[:-]\s*/, '') // Remove leading colons or dashes
                    .replace(/^[•-]\s*/, ''); // Remove leading bullets
                
                // Extract note if it exists (anything in parentheses)
                let note = '';
                const noteMatch = activity.match(/\((.*?)\)/);
                if (noteMatch) {
                    note = noteMatch[1];
                    activity = activity.replace(/\s*\(.*?\)/, '').trim();
                }
                
                if (activity) {
                    steps.push({
                        time: time,
                        activity: activity,
                        note: note
                    });
                }
            }
        });

        return steps;
    } catch (error) {
        reportError(error);
        return []; // Return empty array if parsing fails
    }
}