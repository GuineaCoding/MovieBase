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
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                        <Paper elevation={3} style={{ padding: '30px' }}>
                            <Typography variant="h4" gutterBottom>Welcome to Movie Mania</Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Explore a world of movies at your fingertips.
                            </Typography>
                            <Link component={RouterLink} to="/movies">
                                <Button variant="contained" color="primary">
                                    Browse Movies
                                </Button>
                            </Link>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" color="textSecondary" align="center">
                        © 2024 Movie Mania, Inc.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LandingPage;
