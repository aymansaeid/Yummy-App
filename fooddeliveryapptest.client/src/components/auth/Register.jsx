import { useState } from "react";
import "./Login.css";

const Register = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log("Registering: ", formData);
        // Add API call for registration here
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("login-popup")) {
            closeModal(); // Close when clicking outside the modal
        }
    };

    return (
        <div className="login-popup" onClick={handleOverlayClick}>
            <div className="login-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
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
                        />
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
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <span className="link-text" onClick={closeModal}>Login</span></p>
            </div>
        </div>
    );
};

export default Register;
