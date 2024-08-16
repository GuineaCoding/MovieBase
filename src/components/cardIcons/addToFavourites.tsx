import React, { useContext, useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../authenthication';

const AddToFavouritesIcon = ({ movie_id }) => {
    const { supabase } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        async function checkSession() {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;
                setUser(session?.user);
                checkFavorite(session.user.id);
            } catch (error) {
                console.error('Session check failed:', error);
            }
        }

        async function checkFavorite(userId) {
            const { data, error } = await supabase
                .from('favorites')
                .select("*")
                .eq("user_id", userId)
                .eq("movie_id", movie_id);
            if (error) {
                console.error('Error checking favorites:', error);
            } else {
                setIsFavorite(data.length > 0);
            }
        }

        checkSession();
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user);
            checkFavorite(session.user.id);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, [supabase.auth, movie_id]);

    const addToFavorites = async () => {
        if (!user || !movie_id) {
            console.error("No user session or movie ID found.");
            alert("Please log in and select a movie to add to favorites.");
            return;
        }

        console.log("Adding to favorites:", movie_id);
        try {
            const { data, error } = await supabase.from('favorites').insert([{ user_id: user.id, movie_id }]);
            if (error) throw error;
            console.log('Added to favorites successfully:', data);
            setIsFavorite(true);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFromFavorites = async () => {
        try {
            const { data, error } = await supabase
                .from('favorites')
                .delete()
                .eq("user_id", user.id)
                .eq("movie_id", movie_id);
            if (error) throw error;
            console.log('Removed from favorites successfully:', data);
            setIsFavorite(false);
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    return (
        <IconButton onClick={isFavorite ? removeFromFavorites : addToFavorites}>
            {isFavorite ? <DeleteIcon color="error" /> : <FavoriteIcon color="error" />}
        </IconButton>
    );
};

export default AddToFavouritesIcon;
