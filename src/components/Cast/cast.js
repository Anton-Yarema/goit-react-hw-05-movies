import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesCast } from '../../services/api';
import Loader from 'components/Loader';

import NoImage from '../../components/image/No_image_available.svg';

const Cast = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCast(movieId);
  }, [movieId]);

  const fetchCast = async movieId => {
    try {
      setLoading(true);
      const response = await getMoviesCast(movieId);
      setCast(response);
    } catch (error) {
      setError('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Cast:</h3>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {cast.length === 0 ? (
        <p>No cast information available.</p>
      ) : (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : NoImage
                }
                width={100}
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cast;
