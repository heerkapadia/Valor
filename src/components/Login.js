import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ phone: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone: credentials.phone, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('userid', json.userid);

            navigate("/");
        } else {
            alert("Invalid Credential");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Contact Number</label>
                    <input type="tel" className="form-control" value={credentials.phone} onChange={onChange} id="phone" name="phone" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your contact with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
