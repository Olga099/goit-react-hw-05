import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWY4ZWYxMjQyMmQ3YmNlNWYyOTg3OTBmNWFkMDljNiIsIm5iZiI6MTc0NDU2ODQ1My4zOTIsInN1YiI6IjY3ZmMwMDg1ZWMyMmJhM2I0OWQ5NTgwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WWkAXs-4idViml98zzqiZJjjl_hsxQ-ySBySRckooGw',
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current}>Go back</Link>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>

      <ul>
        <li><Link to="cast">Cast</Link></li>
        <li><Link to="reviews">Reviews</Link></li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
