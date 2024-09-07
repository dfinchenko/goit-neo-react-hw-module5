import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovieByName } from "../../api";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (queryParam) {
      const fetchMovies = async () => {
        try {
          const moviesData = await fetchMovieByName(queryParam);
          setMovies(moviesData.results);
        } catch (err) {
          console.error("Error fetching movies:", err);
          setError("Something went wrong while fetching movies");
        }
      };
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [queryParam]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      alert("Please enter a search term");
      return;
    }
    setSearchParams({ query });
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={query}
          onChange={handleInputChange}
          className={css.searchString}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
