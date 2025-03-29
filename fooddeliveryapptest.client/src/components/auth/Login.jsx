import { useState } from "react";
import "./Login.css";

const Login = ({ closeModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        // Add API call for authentication
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("login-popup")) {
            closeModal(); // Close when clicking outside the modal
        }
    };

    return (
        <div className="login-popup" onClick={handleOverlayClick}>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <span className="link-text" onClick={closeModal}>Register</span></p>
            </div>
        </div>
    );
};

export default Login;
