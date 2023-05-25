import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesReviews } from '../../services/api';
import Loader from 'components/Loader';

const Reviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews(movieId);
  }, [movieId]);

  const fetchReviews = async movieId => {
    try {
      setLoading(true);
      const response = await getMoviesReviews(movieId);
      setReviews(response);
    } catch (error) {
      setError('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Reviews:</h3>
      {loading && <Loader />}
      {reviews.length > 0 && !error && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h4>Author: {review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && !error && !loading && (
        <p>No reviews information available.</p>
      )}

      {error && <p>No reviews information available.</p>}
    </div>
  );
};

export default Reviews;
