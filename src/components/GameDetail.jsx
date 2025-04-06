import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../store/gamesSlice'
import { getGameDetails, getGameScreenshots } from '../services/api'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

function GameDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.games.favorites)
  const [game, setGame] = useState(null)
  const [screenshots, setScreenshots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isFavorite = favorites.includes(id)

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true)
        const [gameData, screenshotsData] = await Promise.all([
          getGameDetails(id),
          getGameScreenshots(id)
        ])
        setGame(gameData)
        setScreenshots(screenshotsData.results)
        setError(null)
      } catch (err) {
        setError('Failed to fetch game details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchGameData()
  }, [id])

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

  if (!game) {
    return (
      <div className="alert alert-info" role="alert">
        Game not found
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>{game.name}</h1>
            <button
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => dispatch(toggleFavorite(id))}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <img
            src={game.background_image}
            alt={game.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Game Details</h5>
              <p><strong>Release Date:</strong> {new Date(game.released).toLocaleDateString()}</p>
              <p><strong>Rating:</strong> {game.rating}/5</p>
              <p>
                <strong>Genres:</strong>{' '}
                {game.genres.map(genre => genre.name).join(', ')}
              </p>
              <p>
                <strong>Platforms:</strong>{' '}
                {game.platforms.map(p => p.platform.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <h3>Description</h3>
          <div dangerouslySetInnerHTML={{ __html: game.description }} />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h3>Screenshots</h3>
          <div className="row g-4">
            {screenshots.map(screenshot => (
              <div key={screenshot.id} className="col-md-6 col-lg-4">
                <img
                  src={screenshot.image}
                  alt={`${game.name} screenshot`}
                  className="img-fluid rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetail