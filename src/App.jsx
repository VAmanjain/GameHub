import { Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import GameList from './components/GameList'
import GameDetail from './components/GameDetail'
import Library from './components/Library'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route
            path="/library"
            element={
              <>
                <SignedIn>
                  <Library />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App