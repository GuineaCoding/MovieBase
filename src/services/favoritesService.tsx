import supabaseConfig from '../supbase'; 

export async function fetchFavorites(userId) {
  const { data, error } = await supabaseConfig
    .from('favorites')
    .select('movie_id, image_url, rating')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
  return data;
}
