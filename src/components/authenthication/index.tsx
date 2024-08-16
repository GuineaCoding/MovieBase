import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Container, TextField, Button, Typography } from '@mui/material';
import { supabaseConfig } from '../../../src/supbase';  

const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

export const AuthContext = createContext({
    session: null,
    setSession: () => {}
});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        console.log("Checking session on load...");

        supabase.auth.getSession()
            .then(({ data: { session } }) => {
                console.log("Session retrieved:", session);
                setSession(session);
            })
            .catch(error => console.error("Error getting session:", error));
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth state changed:", event, session);
            setSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();
            console.log("Unsubscribed from auth changes.");
        };
    }, []);

   
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Attempting login with:", email, password);
        try {
            const { error, session } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            console.log("Login successful, session:", session);
            setSession(session);
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("Attempting signup with:", email, password);
        try {
            const { error, session } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            console.log("Signup successful, session:", session);
            setSession(session);
        } catch (error) {
            console.error('Signup error:', error.message);
        }
    };

    if (!session) {
     
        return (
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    Login or Register
                </Typography>
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
                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={handleSignup}
                        style={{ marginTop: 8 }}
                    >
                        Register
                    </Button>
                </form>
            </Container>
        );
    } else {
        
        return <>{children}</>;
    }
};
