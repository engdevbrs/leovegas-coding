import { waitFor } from '@testing-library/react';
import moviesSlice, { fetchMovies } from '../data/moviesSlice'

const moviesMock = {
    operation: 'listmoreitems',
    results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }]
};

describe('MovieSlice test', () => {
    
    it('should set loading true while action is pending', async () => {
        const action = { type: fetchMovies.pending };
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',operation: null, page: 1,
        }, action);

        await waitFor(() => {
            expect(initialState.fetchStatus).toEqual('loading');
        });
     })

    it('should return payload when action is fulfilled', async () => {
        const action = {
            type: fetchMovies.fulfilled, 
            payload: { operation: 'listmoreitems', results: moviesMock.results }
        };
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',operation: null, page: 1,
        }, action);
        
          await waitFor(() => {
            expect(initialState.movies).toEqual([...moviesMock.results]);
          });
      
          await waitFor(() => {
            expect(initialState.fetchStatus).toEqual('success');
          });
      
          await waitFor(() => {
            expect(initialState.page).toEqual(2); // This assumes the logic for page increment in your reducer
          });
      
          await waitFor(() => {
            expect(initialState.operation).toEqual('listmoreitems');
          });
    })

    it('should set error when action is rejected', async () => {
        const action = {type: fetchMovies.rejected};
        moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',operation: null, page: 1,
        }, action);
        await waitFor(() => {
            expect(action).toEqual({type: fetchMovies.rejected})
        });
     })

})