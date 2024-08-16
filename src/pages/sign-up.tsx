import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../components/authenthication/';

export default function Signup() {
    const { supabase, setSession } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { error, session } = await supabase.auth.signUp({ email, password });
        if (!error && session) {
            setSession(session);
            navigate('/'); 
        } else {
            console.error('Signup error:', error?.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">Register</Typography>
            <form onSubmit={handleSignup} style={{ marginTop: 8 }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                >
                    Register
                </Button>
            </form>
        </Container>
    );
}
