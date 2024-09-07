import { useEffect, useState } from "react";
import { getToday } from "../../api";
import MovieList from "../../components/MovieList/MovieList";

export const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getToday();
        setMovies(moviesData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
