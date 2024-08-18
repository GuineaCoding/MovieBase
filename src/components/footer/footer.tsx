import { Link } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'darkgreen', color: 'white', padding: '20px 0' }}>
            <Container maxWidth="lg">
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                TMDb MOVIEBASE
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center', my: 2 }}>
                    Explore the world of movies and TV series. Discover actors, genres, and upcoming hits!
                </Typography>

                <Typography variant="body2" sx={{ textAlign: 'center', my: 2 }}>
                    
This product uses the TMDb API but is not endorsed or certified by TMDb." 
Any use of the TMDb logo in your application shall be less prominent than the logo or mark that primarily describes the application and your use of the TMDb logo shall not imply any endorsement by TMDb. 
When attributing TMDb, the attribution must be within your application's "About" or "Credits" type section. 
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                    <Link to="/movies/upcoming" style={{ color: 'white', textDecoration: 'none' }}>Upcoming Movies</Link>
                    <Link to="/genres" style={{ color: 'white', textDecoration: 'none' }}>Genres</Link>
                    <Link to="/popular" style={{ color: 'white', textDecoration: 'none' }}>Popular Movies</Link>
                    <Link to="/actors" style={{ color: 'white', textDecoration: 'none' }}>Actors</Link>
                    <Link to="/tvseries" style={{ color: 'white', textDecoration: 'none' }}>TV Series</Link>
                    <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>Favorites</Link>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
