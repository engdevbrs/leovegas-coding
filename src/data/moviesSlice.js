import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

let data = []

export const fetchMovies = createAsyncThunk('fetch-movies', async ({endpoint, operation}) => {
    const response = await fetch(endpoint)
    data = await response.json();
    return { results: data.results, operation };
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
        operation: null,
        page: 1,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload.operation === "listmoreitems" ? [...state.movies, ...action.payload.results] : action.payload.results;
            state.fetchStatus = 'success'
            state.page = action.payload.operation === "listmoreitems" && action.payload.results.length > 0 ? state.page + 1 : 1;  // Incrementa la página
            state.operation = action.payload.operation;
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
