import axios from "axios"

const API_URL = "http://localhost:5173/dashboard"

// Add Album
const addAlbum = async (albumData, token) => {
    const configuration = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, albumData,configuration)

    return response.data
}

//Get Albums 
const getAlbums = async (token) => {
    const configuration = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,configuration)
    return response.data
}

//Delete Album
const deleteAlbum = async (idAlbum, token) => {
    const configuration = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + idAlbum, configuration)
    return response.data
}

const albumService = {
    addAlbum,
    getAlbums,
    deleteAlbum
}

export default albumService