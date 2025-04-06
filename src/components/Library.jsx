import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getGameDetails } from '../services/api'

function Library() {
  const favorites = useSelector(state => state.games.favorites)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFavoriteGames = async () => {
      try {
        setLoading(true)
        const gamePromises = favorites.map(id => getGameDetails(id))
        const gameDetails = await Promise.all(gamePromises)
        setGames(gameDetails)
        setError(null)
      } catch (err) {
        setError('Failed to fetch favorite games. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchFavoriteGames()
  }, [favorites])

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

  if (games.length === 0) {
    return (
      <div className="container py-4">
        <div className="alert alert-info" role="alert">
          Your library is empty. Start adding games by clicking the heart icon on game cards!
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Library</h2>
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
                  {game.genres.map(genre => (
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
    </div>
  )
}

export default Library