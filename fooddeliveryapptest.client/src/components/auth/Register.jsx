import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { registerUser } from "./../../components/services/ApiService";

const Register = ({ closeModal }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phoneNumber: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        // Password validation
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }

        if (!/[A-Z]/.test(formData.password)) {
            setError("Password must contain at least one uppercase letter");
            return false;
        }

        if (!/[0-9]/.test(formData.password)) {
            setError("Password must contain at least one number");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const userData = {
                Name: formData.name,
                Email: formData.email,
                PasswordHash: formData.password,
                Address: formData.address,
                PhoneNumber: formData.phoneNumber
            };

            const response = await registerUser(userData);

            if (response.status === 200) {
                // In a real app, you would typically get the user role from the response
                // or make another API call to get user details after login
                const userRole = response.data.role || 'Customer'; // Default to 'Customer'

                // Role-based navigation
                switch (userRole.toLowerCase()) {
                    case 'admin':
                        navigate('/admin-dashboard');
                        break;
                    case 'employee':
                        navigate('/employee-dashboard');
                        break;
                    case 'customer':
                        navigate('/user-dashboard');
                        break;
                    default:
                        navigate('/');
                }

                closeModal();
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data || "Registration failed");
            } else {
                setError("Network error. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("login-popup")) {
            closeModal();
        }
    };

    return (
        <div className="login-popup" onClick={handleOverlayClick}>
            <div className="login-container">
                <h2>Register</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            minLength={3}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                            title="Please enter a valid email address"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            title="Password must be at least 8 characters with at least one uppercase letter and one number"
                        />
                        <small className="password-hint">
                            (8+ characters, 1 uppercase, 1 number)
                        </small>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            pattern="[0-9]{10,15}"
                            title="Phone number should be 10-15 digits"
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p>Already have an account? <span className="link-text" onClick={closeModal}>Login</span></p>
            </div>
        </div>
    );
};

export default Register;