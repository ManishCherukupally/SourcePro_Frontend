import { Button, PasswordInput, TextInput } from '@mantine/core';
import axios from 'axios';
import React, { useState } from 'react'

const LoginTest = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (/** @type {{ preventDefault: () => void; }} */ e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://192.168.29.74:8000/api/login/', {
                email,
                password
            });

            if (response.data.success) {
                // Successful login, redirect to home page or dashboard
                console.log('Login successful!');
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An unexpected error occurred.');
        }
        return (
            <div>
                <h2>Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <TextInput label={"Username"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                    <PasswordInput label={"Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <Button type='submit'>Login</Button>
                </form>
            </div>
        )
    }
}

export default LoginTest
