import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../resources/authentication.css';

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.post('/api/user/register', values);
            message.success('Registration successful!');
            navigate('/login'); // Redirect to login page
        } catch (error) {
            message.error('Registration failed! Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('sheyresume-user')) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="brand">Resume Builder</h1>
                <h2>Register</h2>
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

                    <Form.Item
                        name="cpassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Re-enter your password" />
                    </Form.Item>

                    <div className="button-container">
                        <Button type="primary" htmlType="submit" className="login-btn">
                            {loading ? <Spin size="small" /> : "Register"}
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link to="/login" className="register-link">
                            Already have an account? Login here
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
