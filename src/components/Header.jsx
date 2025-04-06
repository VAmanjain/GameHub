import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { setSearchTerm } from '../store/gamesSlice'
import { FaSearch, FaBookmark } from 'react-icons/fa'

function Header() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const { isSignedIn } = useUser()

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    dispatch(setSearchTerm(value))
  }

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          GameHub
        </Link>
        
        <div className="search-bar mx-auto">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search games..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="d-flex align-items-center">
          {isSignedIn ? (
            <>
              <Link to="/library" className="btn btn-outline-light me-3">
                <FaBookmark className="me-2" />
                Library
              </Link>
              <UserButton />
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="btn btn-primary">Sign In</button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header