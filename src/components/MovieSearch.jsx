import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFilteredMoviesQuery, useGetGenresQuery } from "../MovieAPI/movieApi";

const MovieSearch = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        year: '',
        genres: '',
    });

    const { data: genreData, isLoading: genreLoading, error: genreError } = useGetGenresQuery();
    const { data, error, isLoading, refetch } = useGetFilteredMoviesQuery(searchParams, { skip: false });

    useEffect(() => {
        console.log('Search params changed:', searchParams);
        refetch();
    }, [searchParams, refetch]);

    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = (id) => {
        navigate(`/movie/${id}`);
    };

    const years = Array.from({ length: 2024 - 1900 + 1 }, (v, k) => 2024 - k); 
    return (
        <div className="movie-search-container">
            <h2 className="movie-search-header">Search Movies</h2>
            <form className="movie-search-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Year:</label>
                    <select name="year" value={searchParams.year} onChange={handleChange}>
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Genres:</label>
                    {genreLoading ? (
                        <p>Loading genres...</p>
                    ) : genreError ? (
                        <p>Error loading genres</p>
                    ) : (
                        <select name="genres" value={searchParams.genres} onChange={handleChange}>
                            <option value="">Select Genre</option>
                            {genreData.genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            </form>

            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data && (
                <div className="movie-list-container">
                    <ul className="movie-list">
                        {data.results.map((movie) => (
                            <li key={movie.id} className="movie-item" onClick={() => handleClick(movie.id)}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                <h2>{movie.title}</h2>
                                <p>{movie.overview}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MovieSearch;
