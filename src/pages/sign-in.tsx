import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
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
                navigate('/');  
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
        <Container component="main" maxWidth="xs" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>Login</Typography>
            <form onSubmit={handleLogin} style={{ width: '100%', marginTop: 1 }}>
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
                    sx={{ mt: 3, mb: 2, bgcolor: 'darkgreen', color: 'white', '&:hover': { bgcolor: 'green' } }}
                >
                    Login
                </Button>
                <Box textAlign="center">
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: 'darkgreen', color: 'white', '&:hover': { bgcolor: 'green' } }}
                        >
                            Go to Signup
                        </Button>
                    </Link>
                </Box>
            </form>
        </Container>
    );
}
