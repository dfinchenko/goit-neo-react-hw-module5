import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData.cast);
      } catch (error) {
        setError("Error fetching cast. Please try again later.");
        console.error("Error fetching cast:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={css.castContainer}>
      <h2>Cast</h2>
      {cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.castItem}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className={css.actorImage}
                />
              ) : (
                <div className={css.actorImagePlaceholder}>No Image</div>
              )}
              <p className={css.actor}>{actor.name}</p>
              <p className={css.character}>as {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
