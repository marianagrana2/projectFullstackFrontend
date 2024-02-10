import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import albumService from './albumService'

const initialState = {
    albums: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const addAlbum = createAsyncThunk('albums/add', async (albumData, thunkAPI) =>{
    try{
      const {strAlbum: albumName, intYearReleased: albumYear, ...albumDataWithoutNameAndYear} = albumData;
      const albumDataWithNewProps = {albumName, albumYear, ...albumDataWithoutNameAndYear};
      const token = thunkAPI.getState().auth.user.token
      console.log("Albums obtenidos desde albumSlice:",albumDataWithNewProps)
      return await albumService.addAlbum(albumDataWithNewProps,token)
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAlbums = createAsyncThunk('albums/getAlbums', async (_,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await albumService.getAlbums(token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteAlbum = createAsyncThunk('albums/delete', async (id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await albumService.deleteAlbum(id, token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(addAlbum.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addAlbum.fulfilled, (state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            const {responseData, originalData} = action.payload;
            state.albums.push(responseData)
        })
        .addCase(addAlbum.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAlbums.pending, (state) => {
            console.log("getAlbums pending", state)
            state.isLoading = true
        })
        .addCase(getAlbums.fulfilled, (state,action) => {
            console.log("getAlbums desde albumSlice: ",action.payload)
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.albums = action.payload
        })
        .addCase(getAlbums.rejected, (state,action) => {
            console.log("getAlbums rejected", action.payload)
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteAlbum.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteAlbum.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.albums = state.albums.filter((album) => album._id !== action.payload.id)
        })
        .addCase(deleteAlbum.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = albumSlice.actions
export default albumSlice.reducer