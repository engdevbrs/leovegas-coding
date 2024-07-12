import { waitFor } from '@testing-library/react'
import watchLaterSlice from '../data/watchLaterSlice'
import { moviesMock } from './movies.mocks'

describe('watchLaterSlice test', () => {

    const state = { watchLaterMovies: [] }

    it('should set initial state', async () => {
        const initialState = state
        const action = { type: '' }
        const result = watchLaterSlice.reducer(initialState, action)
        await waitFor(() => {
          expect(result).toEqual({ watchLaterMovies: []})
        });
      })    

      it('should add movie to watch later', async () => {
        const initialState = { ...state, watchLaterMovies: [] }
        const action = watchLaterSlice.actions.addToWatchLater(moviesMock[0])
        const result = watchLaterSlice.reducer(initialState, action)
        await waitFor(() => {
          expect(result.watchLaterMovies[0]).toBe(moviesMock[0])
        });
      })

      it('should remove movie from watch later', async () => {
        const initialState = { ...state, watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.removeFromWatchLater(moviesMock[0])
        const result = watchLaterSlice.reducer(initialState, action)
        await waitFor(() => {
          expect(result.watchLaterMovies[0]).toBe(moviesMock[1])
        });
      })

      it('should remove all movies', async () => {
        const initialState = { ...state, watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.remveAllWatchLater(state)
        const result = watchLaterSlice.reducer(initialState, action)
        await waitFor(() => {
          expect(Object.keys(result.watchLaterMovies).length).toEqual(0)
        });
      })
})