import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favorites: [],
  searchTerm: '',
  filters: {
    category: '',
    tags: [],
    releaseYear: '',
    popularity: '',
  },
  currentPage: 1,
}

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const gameId = action.payload
      const index = state.favorites.indexOf(gameId)
      if (index === -1) {
        state.favorites.push(gameId)
      } else {
        state.favorites.splice(index, 1)
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

export const { toggleFavorite, setSearchTerm, setFilters, setCurrentPage } = gamesSlice.actions
export default gamesSlice.reducer