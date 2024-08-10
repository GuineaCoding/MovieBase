import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Card, CardContent, Typography } from '@mui/material';

const FantasyMovieForm = () => {
    const [movie, setMovie] = useState({
        title: '',
        overview: '',
        genre: '',
        releaseDate: '',
        runtime: '',
        productionCompany: ''
    });
 
    const [movies, setMovies] = useState(() => {
        const savedMovies = sessionStorage.getItem('fantasyMovies');
        return savedMovies ? JSON.parse(savedMovies) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('fantasyMovies', JSON.stringify(movies));
    }, [movies]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMovie(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMovies(prevMovies => [...prevMovies, movie]);
        setMovie({ title: '', overview: '', genre: '', releaseDate: '', runtime: '', productionCompany: '' });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField name="title" label="Title" value={movie.title} onChange={handleChange} fullWidth />
                <TextField name="overview" label="Overview" value={movie.overview} onChange={handleChange} fullWidth multiline rows={4} />
                <FormControl fullWidth>
                    <InputLabel>Genre</InputLabel>
                    <Select name="genre" value={movie.genre} onChange={handleChange} label="Genre">
                        <MenuItem value="Action">Action</MenuItem>
                        <MenuItem value="Comedy">Comedy</MenuItem>
                        <MenuItem value="Drama">Drama</MenuItem>
                    </Select>
                </FormControl>
                <TextField name="releaseDate" type="date" value={movie.releaseDate} onChange={handleChange} fullWidth />
                <TextField name="runtime" label="Runtime" type="number" value={movie.runtime} onChange={handleChange} fullWidth />
                <TextField name="productionCompany" label="Production Company" value={movie.productionCompany} onChange={handleChange} fullWidth />
                <Button type="submit" variant="contained" color="primary">Create Movie</Button>
            </form>
            <div>
                {movies.map((m, index) => (
                    <Card key={index} style={{ marginTop: 16 }}>
                        <CardContent>
                            <Typography variant="h5">{m.title}</Typography>
                            <Typography variant="body1">{m.overview}</Typography>
                            <Typography variant="body2">Genre: {m.genre}</Typography>
                            <Typography variant="body2">Release Date: {m.releaseDate}</Typography>
                            <Typography variant="body2">Runtime: {m.runtime} minutes</Typography>
                            <Typography variant="body2">Production: {m.productionCompany}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default FantasyMovieForm;
