import { useContext, useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../authenthication';
import { Typography } from "@mui/material";

interface Props {
  movie_id: number;
  image_url: string;
  rating: number;
  title: string;
  overview: string;
  popularity: number;
  release_date: string;
  vote_count: number;
  vote_average: number;
}

const AddToFavouritesIcon = ({
  movie_id,
  image_url,
  rating,
  title,
  overview,
  popularity,
  release_date,
  vote_count,
  vote_average
}: Props) => {
    const { supabase } = useContext(AuthContext) as { supabase: any };
    const [user, setUser] = useState<{ id: number } | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Session error:', error.message);
                return; 
            }
            if (!session || !session.user) {
                console.log('No active session found.');
                // setErrorMsg('No user session found. Please log in.');
                return; 
            }
            setUser(session.user);
            checkFavorite(session.user.id);
        };

        const checkFavorite = async (userId: number) => {
            if (!userId) {
                console.error('No user ID provided for checking favorites');
                setErrorMsg('User ID is missing.');
                return;
            }
            const { data, error } = await supabase
                .from('favorites')
                .select("*")
                .eq("user_id", userId)
                .eq("movie_id", movie_id);
            if (error) {
                console.error('Error checking favorites:', error);
                setErrorMsg('Error checking favorites.');
                return;
            }
            setIsFavorite(data.length > 0);
        };

        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
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
            setErrorMsg("Please log in.");
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
            setErrorMsg('Error adding to favorites.');
            return;
        }
        setIsFavorite(true);
    };

    const removeFromFavorites = async () => {
        if (!user || !movie_id) {
            console.error("No user session or movie ID found for removal.");
            setErrorMsg("Please log in to remove a movie from favorites.");
            return;
        }
        const { data, error } = await supabase
            .from('favorites')
            .delete()
            .eq("user_id", user.id)
            .eq("movie_id", movie_id);
        if (error) {
            console.error('Error removing from favorites:', error);
            setErrorMsg('Error removing from favorites.');
            return;
        }
        setIsFavorite(false);
    };

    return (
        <>
          <IconButton onClick={isFavorite ? removeFromFavorites : addToFavorites}>
              {isFavorite ? <DeleteIcon color="error" /> : <FavoriteIcon color="error" />}
          </IconButton>
          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
        </>
    );
};

export default AddToFavouritesIcon;
