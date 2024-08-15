// src/index.tsx
import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './components/authenthication/index';
import HomePage from "./pages/homePage";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import MovieDetailsPage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
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
                <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                <Route path="/movies/:id" element={<MovieDetailsPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/genres/:genreId" element={<GenreDetailsPage />} />
                <Route path="/popular" element={<PopularMoviesPage />} />
                <Route path="/actors" element={<ActorsPage />} />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />
                <Route path="/tvseries" element={<TVSeriesPage />} />
                <Route path="/create-movie" element={<FantasyMovieForm />} />
                <Route path="/companies/:companyId" element={<CompanyDetailsPage />} />
                <Route path="/countries/:countryCode" element={<CountryMoviesPage />} />
                <Route path="/series/:id" element={<TVSeriesDetailsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
