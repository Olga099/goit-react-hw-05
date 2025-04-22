import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWY4ZWYxMjQyMmQ3YmNlNWYyOTg3OTBmNWFkMDljNiIsIm5iZiI6MTc0NDU2ODQ1My4zOTIsInN1YiI6IjY3ZmMwMDg1ZWMyMmJhM2I0OWQ5NTgwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WWkAXs-4idViml98zzqiZJjjl_hsxQ-ySBySRckooGw',
        },
      }
    )
      .then(res => setReviews(res.data.results))
      .catch(err => console.error('Error loading reviews:', err));
  }, [movieId]);

  return (
    <ul className={styles.list}>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map(review => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default MovieReviews;
