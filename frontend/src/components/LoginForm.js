import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isRegister) {
                await axios.post('http://localhost:8080/api/register', {
                    username,
                    email,
                    password
                });
                setIsRegister(false);
                alert('Cont creat. Te rugam sa te loghezi.');
            } else {
                const res = await axios.post('http://localhost:8080/api/login', {
                    email,
                    password
                });
                localStorage.setItem('token', res.data.token);
                onLogin();
            }
        } catch (err) {
            setError('Eroare: Verifica datele introduse.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>{isRegister ? 'Inregistrare' : 'Autentificare'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                )}
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Parola"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px' }}>
                    {isRegister ? 'Creeaza cont' : 'Logare'}
                </button>
            </form>

            <button 
                onClick={() => setIsRegister(!isRegister)}
                style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
            >
                {isRegister ? 'Ai deja cont? Logheaza-te' : 'Nu ai cont? Inregistreaza-te'}
            </button>
        </div>
    );
};

export default LoginForm;