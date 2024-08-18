import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './components/authenthication';
import HomePage from "./pages/homePage";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import MovieDetailsPage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMovies";
import SiteHeader from './components/siteHeader';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import GenresPage from './pages/genresPage';
import GenreDetailsPage from "./pages/genreDetailsPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import ActorsPage from "./pages/actorsPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import TVSeriesPage from "./pages/TVSeriesPage";
import FantasyMovieForm from "./pages/myFantasyMovie";
import CompanyDetailsPage from "./pages/companyDetailsPage";
import CountryMoviesPage from "./pages/CountryMoviesPage";
import TVSeriesDetailsPage from "./pages/TVSeriesDetailsPage";
import SearchPage from './pages/SearchPage';
import { LanguageProvider } from './components/language';
import FavoritesPage from './pages/favouriteMoviePage';
import ProtectedRoute from './components/authenthication/ProtectedRoute';
import '../src/css/index.css'; 
import Footer from './components/footer/footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/popular" element={<PopularMoviesPage />} />
                <Route path="/actors" element={<ActorsPage />} />
                <Route path="/tvseries" element={<TVSeriesPage />} />
                <Route path="*" element={<Navigate to="/" />} />

                <Route path="/create-movie" element={<ProtectedRoute><FantasyMovieForm /></ProtectedRoute>} />
                <Route path="/actors/:id" element={<ProtectedRoute><ActorDetailsPage /></ProtectedRoute>} />
                <Route path="/series/:id" element={<ProtectedRoute><TVSeriesDetailsPage /></ProtectedRoute>} />
                <Route path="/genres/:genreId" element={<ProtectedRoute><GenreDetailsPage /></ProtectedRoute>} />
                <Route path="/reviews/form" element={<ProtectedRoute><AddMovieReviewPage /></ProtectedRoute>} />
                <Route path="/movies/:id" element={<ProtectedRoute><MovieDetailsPage /></ProtectedRoute>} />
                <Route path="/reviews/:id" element={<ProtectedRoute><MovieReviewPage /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
                <Route path="/companies/:companyId" element={<ProtectedRoute><CompanyDetailsPage /></ProtectedRoute>} />
                <Route path="/countries/:countryCode" element={<ProtectedRoute><CountryMoviesPage /></ProtectedRoute>} />
              </Routes>
              <Footer />
            </MoviesContextProvider>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const container = document.getElementById('root'); 
const root = ReactDOM.createRoot(container); 

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
