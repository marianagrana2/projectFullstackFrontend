import axios from "axios"

const API_URL = "http://localhost:3005/api/v1/albums"

// Add Album
const addAlbum = async (albumData, token) => {
    const configuration = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + '/add', albumData,configuration)

    return response.data
}

//Get Albums 
const getAlbums = async (token) => {
    const configuration = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(API_URL)
    const response = await axios.get(API_URL,configuration)
    return response.data
}

//Delete Album
const deleteAlbum = async (albumName, token) => {
    const configuration = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + albumName, configuration)
    return response.data
}

const albumService = {
    addAlbum,
    getAlbums,
    deleteAlbum
}

export default albumService