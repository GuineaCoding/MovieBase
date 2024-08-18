import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../components/authenthication/';

export default function Signup() {
    const { supabase, setSession } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.'); 
            return;
        }
        const { error, session } = await supabase.auth.signUp({ email, password });
        if (!error && session) {
            navigate('/');  
            setSession(session);
            
        } else {
            console.error('Signup error:', error?.message);
            navigate('/');      
            setError(error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>Register</Typography>
            {error && <Typography color="error">{error}</Typography>}  
            <form onSubmit={handleSignup} style={{ width: '100%', marginTop: 1 }}>
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: 'darkgreen', color: 'white', '&:hover': { bgcolor: 'green' } }}
                >
                    Register
                </Button>
                <Box textAlign="center">
                    <Link to="/signin" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: 'darkgreen', color: 'white', '&:hover': { bgcolor: 'green' } }}
                        >
                            Back to Login
                        </Button>
                    </Link>
                </Box>
            </form>
        </Container>
    );
}
