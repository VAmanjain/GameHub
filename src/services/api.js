import axios from 'axios'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY
  }
})

export const getGames = async (params) => {
  const response = await api.get('/games', { params })
  return response.data
}

export const getGameDetails = async (id) => {
  const response = await api.get(`/games/${id}`)
  return response.data
}

export const getGameScreenshots = async (id) => {
  const response = await api.get(`/games/${id}/screenshots`)
  return response.data
}

export default api