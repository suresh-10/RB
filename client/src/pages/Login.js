import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../resources/authentication.css"; // Ensure the CSS file is properly linked

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const user = await axios.post("/api/user/login", values);
            message.success("Login successful!");
            localStorage.setItem("sheyresume-user", JSON.stringify(user.data));
            navigate("/home");
        } catch (error) {
            message.error("Login failed! Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("sheyresume-user")) {
            navigate("/home");
        }
    }, []);

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="brand">Resume Builder</h1>
                <h2 className="login-title">Login</h2>
                <Form layout="vertical" onFinish={onFinish} className="auth-form">
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: "Please enter your username!" }]}
                    >
                        <Input placeholder="Enter your username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Please enter your password!" }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <div className="button-container">
                        <Button type="primary" htmlType="submit" className="login-btn">
                            {loading ? <Spin size="small" /> : "Log In"}
                        </Button>
                    </div>

                    <div className="register-link-container">
                        <Link to="/register" className="register-link">
                            New here? Register
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
