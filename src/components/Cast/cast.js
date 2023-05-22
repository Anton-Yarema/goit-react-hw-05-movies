import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Cast = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const API_KEY = '80a258dcbf0a895a310fa1108346ec65';
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        setCast(response.data.cast);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  if (loading) {
    return <p>Loading cast...</p>;
  }

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }
  return (
    <div>
      <h3>Cast:</h3>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <p>No image available</p>
            )}
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
