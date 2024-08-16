import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../components/authenthication/';

export default function Login() {
    const { supabase, setSession } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                console.log("Auth state changed: SIGNED_IN", session);
                setSession(session);
                navigate('/');  // Navigate to home on successful login
            }
        });

        return () => authListener.subscription.unsubscribe();
    }, [setSession, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Login error:', error.message);
        } else {
            console.log("Login request sent, waiting for auth state change...");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">Login</Typography>
            <form onSubmit={handleLogin} style={{ marginTop: 8 }}>
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
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </form>
        </Container>
    );
}
