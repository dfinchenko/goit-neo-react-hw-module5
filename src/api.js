import axios from "axios";

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmZhMjVjNmY0NDBmMzBjMThhYWVkZmQxMzJiN2EyMSIsIm5iZiI6MTcyNTc0NTQyMS42Mzg5NTgsInN1YiI6IjY2ZGNjNzFmZDljZjExMjNhOWY1ZGU2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xdZOEz16j2oiPUD0mBAQkZgiO45_mL0XboJcFtS6UzM";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: token,
  },
});

const fetchData = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const getToday = async () => {
  return fetchData("/trending/movie/day", {
    language: "en-US",
    page: 1,
  });
};

export const getMovieDetailsById = async (movieId) => {
  return fetchData(`/movie/${movieId}`, {
    language: "en-US",
  });
};

export const fetchMovieCast = async (movieId) => {
  return fetchData(`/movie/${movieId}/credits`, {
    language: "en-US",
  });
};

export const fetchMovieReviews = async (movieId) => {
  return fetchData(`/movie/${movieId}/reviews`);
};

export const fetchMovieByName = async (searchStr) => {
  return fetchData(`/search/movie`, {
    query: searchStr,
    include_adult: false,
    language: "en-US",
    page: 1,
  });
};
