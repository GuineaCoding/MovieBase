import { useContext, useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../authenthication';

const AddToFavouritesIcon = ({
  movie_id, image_url, rating, title, overview, popularity, release_date, vote_count, vote_average
}) => {
    const { supabase } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Session error:', error.message);
                return; 
            }
            if (!session) {
                console.log('No active session found.');
                return; 
            }
            setUser(session.user);
            if (session.user) {
                checkFavorite(session.user.id);
            }
        };

        const checkFavorite = async (userId) => {
            if (!userId) {
                console.error('No user ID provided for checking favorites');
                return;
            }
            const { data, error } = await supabase
                .from('favorites')
                .select("*")
                .eq("user_id", userId)
                .eq("movie_id", movie_id);
            if (error) {
                console.error('Error checking favorites:', error);
                return;
            }
            setIsFavorite(data.length > 0);
        };

        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session && session.user) {
                setUser(session.user);
                checkFavorite(session.user.id);
            } else {
                setUser(null);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, [supabase.auth, movie_id]);

    const addToFavorites = async () => {
        if (!user || !movie_id) {
            console.error("No user session or movie ID found.");
            alert("Please log in and select a movie to add to favorites.");
            return;
        }

        const { data, error } = await supabase.from('favorites').insert([{
            user_id: user.id,
            movie_id,
            image_url,
            rating,
            title,
            overview,
            popularity,
            release_date,
            vote_count,
            vote_average
        }]);
        if (error) {
            console.error('Error adding to favorites:', error);
            return;
        }
        console.log('Added to favorites successfully:', data);
        setIsFavorite(true);
    };

    const removeFromFavorites = async () => {
        if (!user || !movie_id) {
            console.error("No user session or movie ID found for removal.");
            return;
        }
        const { data, error } = await supabase
            .from('favorites')
            .delete()
            .eq("user_id", user.id)
            .eq("movie_id", movie_id);
        if (error) {
            console.error('Error removing from favorites:', error);
            return;
        }
        console.log('Removed from favorites successfully:', data);
        setIsFavorite(false);
    };

    return (
        <IconButton onClick={isFavorite ? removeFromFavorites : addToFavorites}>
            {isFavorite ? <DeleteIcon color="error" /> : <FavoriteIcon sx={{ color: isFavorite ? 'error' : 'yellow' }} />}
        </IconButton>
    );
};

export default AddToFavouritesIcon;
