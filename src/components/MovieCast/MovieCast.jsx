import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWY4ZWYxMjQyMmQ3YmNlNWYyOTg3OTBmNWFkMDljNiIsIm5iZiI6MTc0NDU2ODQ1My4zOTIsInN1YiI6IjY3ZmMwMDg1ZWMyMmJhM2I0OWQ5NTgwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WWkAXs-4idViml98zzqiZJjjl_hsxQ-ySBySRckooGw',
        },
      }
    )
      .then(res => setCast(res.data.cast))
      .catch(err => console.error('Error loading cast:', err));
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {cast.map(actor => (
        <li key={actor.id}>
          <p>{actor.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
