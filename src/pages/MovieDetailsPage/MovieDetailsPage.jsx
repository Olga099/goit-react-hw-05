import { useParams, useLocation, Link, Routes, Route } from 'react-router-dom';
import { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from || '/';
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    })
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));
  }, [movieId]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className={styles.container}>
      <Link to={backLinkHref}>← Go back</Link>
      <h1>{movie.title}</h1>
      <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>

      <hr />

      <h2>Additional information</h2>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLinkHref }}>Cast</Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLinkHref }}>Reviews</Link>
        </li>
      </ul>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
