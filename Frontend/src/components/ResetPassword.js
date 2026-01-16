import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/forgetPassword.css"; // Reuse your styles

function ResetPassword() {
    const { token } = useParams(); // Grabs the token from the URL
    const navigate = useNavigate();
    
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API}/auth/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Password updated successfully!");
                navigate("/"); // Redirect to login page
            } else {
                setMessage(data.message || "Link expired or invalid.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='forgotP'>
            <h2>Create New Password</h2>
            <p>Please enter your new password below.</p>
            
            <form className='gmail-form' onSubmit={handleSubmit}>
                {message && <span className='error-text'>{message}</span>}
                
                <input 
                    type='password' 
                    placeholder='New Password' 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                
                <button className="btn-forgot" disabled={loading}>
                    {loading ? "Updating..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;