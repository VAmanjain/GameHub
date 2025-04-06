import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../store/gamesSlice'

function Sidebar() {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.games.filters)

  const categories = [
    'Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 
    'Racing', 'Simulation', 'Indie'
  ]

  const years = Array.from({ length: 24 }, (_, i) => 2024 - i)

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }))
  }

  return (
    <div className="sidebar bg-light p-3" style={{ minWidth: '250px' }}>
      <h5 className="mb-3">Filters</h5>
      
      {/* Categories */}
      <div className="mb-4">
        <h6>Category</h6>
        <select 
          className="form-select"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Release Year */}
      <div className="mb-4">
        <h6>Release Year</h6>
        <select 
          className="form-select"
          value={filters.releaseYear}
          onChange={(e) => handleFilterChange('releaseYear', e.target.value)}
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Popularity */}
      <div className="mb-4">
        <h6>Sort By</h6>
        <select 
          className="form-select"
          value={filters.popularity}
          onChange={(e) => handleFilterChange('popularity', e.target.value)}
        >
          <option value="">Default</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="release">Release Date (New to Old)</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <h6>Popular Tags</h6>
        <div className="d-flex flex-wrap gap-2">
          {['Multiplayer', 'Single-player', 'Open World', 'FPS', 'Horror'].map(tag => (
            <button
              key={tag}
              className={`btn btn-sm ${filters.tags.includes(tag) ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => {
                const newTags = filters.tags.includes(tag)
                  ? filters.tags.filter(t => t !== tag)
                  : [...filters.tags, tag]
                handleFilterChange('tags', newTags)
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar