function FeedbackForm({ onSuccess, showSuccess }) {
    const [feedback, setFeedback] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            // Here you would typically send the feedback to your backend
            console.log('Feedback submitted:', feedback);
            setFeedback('');
            onSuccess();
        } catch (error) {
            reportError(error);
        }
    };

    if (showSuccess) {
        return (
            <div className="p-4 text-center" data-name="feedback-success">
                <i className="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
                <p className="text-sm text-gray-700">
                    Thanks for your feedback! We will try to get back with you shortly!
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-4" data-name="feedback-form">
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think..."
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:border-purple-500 resize-none"
                rows="4"
                required
                data-name="feedback-input"
            ></textarea>
            <button
                type="submit"
                className="mt-2 w-full bg-purple-600 text-white py-2 text-sm rounded hover:bg-purple-700 transition-colors"
                data-name="submit-feedback"
            >
                Submit Feedback
            </button>
        </form>
    );
}