import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Reviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const API_KEY = '80a258dcbf0a895a310fa1108346ec65';
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
        );
        setReviews(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading cast...</p>;
  }

  if (reviews.length === 0) {
    return <p>No cast information available.</p>;
  }
  return (
    <div>
      <h3>Reviews:</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h4>Author: {review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Reviews;
