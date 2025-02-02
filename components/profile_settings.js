function ProfileSettings({ currentUser, onUpdateUser, onClose }) {
    const [formData, setFormData] = React.useState({
        name: currentUser.name || '',
        email: currentUser.email || '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            onUpdateUser(formData);
            onClose();
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4" data-name="profile-settings-form">
            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-2 py-1 text-sm border rounded"
                        data-name="name-input"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-2 py-1 text-sm border rounded"
                        data-name="email-input"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium mb-1">New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-2 py-1 text-sm border rounded"
                        placeholder="Leave blank to keep current"
                        data-name="password-input"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="mt-4 w-full bg-purple-600 text-white py-2 text-sm rounded hover:bg-purple-700"
                data-name="save-button"
            >
                Save Changes
            </button>
        </form>
    );
}
