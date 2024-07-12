import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants';
import { configureStore } from '@reduxjs/toolkit';
import ScrollComponent from '../components/ScrollComponent';
import { fetchMovies } from '../data/moviesSlice';


jest.mock('../data/moviesSlice', () => ({
  fetchMovies: jest.fn(),
}));


describe('ScrollComponent', () => {
    let store;
    it('calls fetchMovies with search query when near bottom of page', () => {

        const movies = {
            fetchStatus: 'listmoreitems',
            searchQuery: 'test',
            page: 1, // Example where the movie is already starred
        };

        store = configureStore({
            reducer: {
                movies: (state = movies, action) => state,
            }
        });

        store.dispatch = jest.fn();

        render(
        <Provider store={store}>
            <ScrollComponent searchQuery={movies.searchQuery}/>
        </Provider>
        );

        // Simulate scroll position near the bottom of the page
        Object.defineProperty(window, 'innerHeight', { value: 1000 });
        Object.defineProperty(window, 'scrollY', { value: 800 });
        Object.defineProperty(document.body, 'offsetHeight', { value: 1500 });

        // Simulate the scroll event
        fireEvent.scroll(window);

        expect(store.dispatch).toHaveBeenCalled();
        expect(fetchMovies).toHaveBeenCalledWith({
        endpoint: `${ENDPOINT_SEARCH}&query=+test&page=2`,
        operation: 'listmoreitems',
        });
    });

    it('calls fetchMovies without search query when near bottom of page', () => {

        const movies = {
            fetchStatus: 'listmoreitems',
            searchQuery: '',
            page: 1, // Example where the movie is already starred
        };

        store = configureStore({
            reducer: {
                movies: (state = movies, action) => state,
            }
        });

        store.dispatch = jest.fn();

        render(
        <Provider store={store}>
            <ScrollComponent />
        </Provider>
        );

        // Simulate scroll position near the bottom of the page
        Object.defineProperty(window, 'innerHeight', { value: 1000 });
        Object.defineProperty(window, 'scrollY', { value: 800 });
        Object.defineProperty(document.body, 'offsetHeight', { value: 1500 });

        // Simulate the scroll event
        fireEvent.scroll(window);

        expect(store.dispatch).toHaveBeenCalled();
        expect(fetchMovies).toHaveBeenCalledWith({
        endpoint: `${ENDPOINT_DISCOVER}&language=en-US&page=2`,
        operation: 'listmoreitems',
        });
  });
});
