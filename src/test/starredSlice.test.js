import { waitFor } from '@testing-library/react'
import starredSlice from '../data/starredSlice'
import { moviesMock } from './movies.mocks'

describe('starredSlice test', () => {

    const state = { starredMovies: [] }

    it('should set an initial state', async () => {
        const initialState = state
        const action = { type: '' }
        const result = starredSlice.reducer(initialState, action)
        await waitFor(() => {
          expect(result).toEqual({ starredMovies: []})
        })
      })    

      it('should add movie to starred', async () => {
        const initialState = { ...state, starredMovies: [] }
        const action = starredSlice.actions.starMovie(moviesMock[0])
        const result = starredSlice.reducer(initialState, action)
        await waitFor(() => {
          expect(result.starredMovies[0]).toBe(moviesMock[0])
        })
      })

      it('should remove movie from starred', async () => {
        const initialState = { ...state, starredMovies: moviesMock }
        const action = starredSlice.actions.unstarMovie(moviesMock[0])
        const result = starredSlice.reducer(initialState, action)
        await waitFor(() => {
          expect(result.starredMovies[0]).toBe(moviesMock[1])
        })
      })

      it('should remove all movies', async () => {
        const initialState = { ...state, starredMovies: moviesMock }
        const action = starredSlice.actions.clearAllStarred(state)
        const result = starredSlice.reducer(initialState, action)
        await waitFor(() => {
          expect(Object.keys(result.starredMovies).length).toEqual(0)
        })
      })
})