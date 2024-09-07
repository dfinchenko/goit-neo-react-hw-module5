import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api";
import css from "./MovieReviews.module.css";

const MovieReview = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        setError(true);
        console.error("Error fetching reviews:", error);
      }
    };

    getReviews();
  }, [movieId]);

  if (error) {
    return <p>Could not fetch reviews. Please try again later.</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews available for this movie.</p>;
  }

  return (
    <div className={css.reviewsContainer}>
      <h2>Reviews</h2>
      <ul className={css.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={css.reviewItem}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReview;
