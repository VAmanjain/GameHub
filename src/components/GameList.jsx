import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

function GameList() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  
  const { searchTerm, filters, currentPage } = useSelector(state => state.games)
  const favorites = useSelector(state => state.games.favorites)

useEffect(() => {
  const fetchGames = async () => {
    try {
      setLoading(true);

      // Replace with your RAWG API key
      const API_KEY = import.meta.env.VITE_RAWG_API_KEY
      
      // Construct query parameters dynamically
      const params = {
        key: API_KEY,
        page: currentPage,
        page_size: 12,
        search: searchTerm || undefined,
        genres: filters.category ? filters.category.toLowerCase() : undefined,
        tags: filters.tags.length > 0 ? filters.tags.join(',').toLowerCase() : undefined,
        dates: filters.releaseYear 
          ? `${filters.releaseYear}-01-01,${filters.releaseYear}-12-31` 
          : undefined,
        ordering: filters.popularity === 'rating' 
          ? '-rating' 
          : filters.popularity === 'release' 
          ? '-released' 
          : filters.popularity === 'name' 
          ? 'name' 
          : undefined,
      };

      // Make API call
      const response = await axios.get('https://api.rawg.io/api/games', { params });

      // Update state with results
      setGames(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 12));
      setError(null);
    } catch (err) {
      setError('Failed to fetch games. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  fetchGames();
}, [searchTerm, filters, currentPage]);


  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="flex-grow-1">
      <div className="row g-4">
        {games.map(game => (
          <div key={game.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 game-card">
              <img 
                src={game.background_image} 
                className="card-img-top" 
                alt={game.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text small text-muted">
                  Released: {new Date(game.released).toLocaleDateString()}
                </p>
                <div className="mb-2">
                  {game.genres.slice(0, 3).map(genre => (
                    <span 
                      key={genre.id} 
                      className="badge bg-secondary me-1"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link 
                    to={`/game/${game.id}`} 
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                  <span className="badge bg-success">
                    Rating: {game.rating}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav aria-label="Game list pagination" className="mt-4">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li 
              key={index + 1} 
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button 
                className="page-link"
                onClick={() => dispatch(setCurrentPage(index + 1))}
              >
                {index + 1}
              </button>
            </li>
          )).slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))}
        </ul>
      </nav>
    </div>
  )
}

export default GameList