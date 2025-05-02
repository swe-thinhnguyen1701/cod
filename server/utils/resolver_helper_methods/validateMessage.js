const validateMessage = ({ name, email, message }) => {
    if (!name || !email || !message) return "Please fill in all fields";
    if (name.length > 32) return "Name cannot exceed 32 characters";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return "Please enter a valid email address";
    if (message.length > 2000) return "Message cannot exceed 2000 characters";
    return null;
}

module.exports = { validateMessage };