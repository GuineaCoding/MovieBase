import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <Container>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Movie Mania
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/movies">Movies</Button>
                    <Button color="inherit" component={RouterLink} to="/about">About</Button>
                </Toolbar>
            </AppBar>
        </Container>
    );
};

export default LandingPage;
