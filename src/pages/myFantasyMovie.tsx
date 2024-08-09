import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const FantasyMovieForm = () => {
    const [movie, setMovie] = useState({
        title: '',
        overview: '',
        genre: '',
        releaseDate: '',
        runtime: '',
        productionCompany: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMovie(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(movie); 
    };

    return (
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
            <TextField name="releaseDate" label="Release Date" type="date" value={movie.releaseDate} onChange={handleChange} fullWidth />
            <TextField name="runtime" label="Runtime" type="number" value={movie.runtime} onChange={handleChange} fullWidth />
            <TextField name="productionCompany" label="Production Company" value={movie.productionCompany} onChange={handleChange} fullWidth />
            <Button type="submit" variant="contained" color="primary">Create Movie</Button>
        </form>
    );
};

export default FantasyMovieForm;
