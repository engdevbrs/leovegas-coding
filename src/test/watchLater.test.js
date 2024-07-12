import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { renderWithProviders } from './utils';
import { moviesMock } from './movies.mocks';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import watchLaterSlice from '../data/watchLaterSlice';
import WatchLater from '../components/WatchLater';


const { remveAllWatchLater } = watchLaterSlice.actions

const searchMoviesMock = jest.fn();
const viewTrailerMock = jest.fn();


describe('Starred Component', () => {

  let store;
  let movie;

  beforeEach(() => {
    movie = moviesMock[0];
  });


  it('should render starred movies', () => {

    const starred = {
      starredMovies: [movie], // Example where the movie is already starred
    };
    const watchLater = {
      watchLaterMovies: [movie], // Example where the movie is already in watch later
    };

    store = configureStore({
      reducer: {
        starred: (state = starred, action) => state,
        watchLater: (state = watchLater, action) => state,
      }
    });
  
    store.dispatch = jest.fn();

    renderWithProviders(<Provider store={store}>
      <WatchLater viewTrailer={viewTrailerMock} searchMovies={searchMoviesMock} />
    </Provider>,
      { initialState: watchLater }
    );

    expect(screen.getByText(/Watch Later List/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Inception/i)[0]).toBeInTheDocument();
  });

  it('should call clearAllStarred function on button click', async () => {

    const starred = {
      starredMovies: [movie], // Example where the movie is already starred
    };
    const watchLater = {
      watchLaterMovies: [movie], // Example where the movie is already in watch later
    };

    store = configureStore({
      reducer: {
        starred: (state = starred, action) => state,
        watchLater: (state = watchLater, action) => state,
      }
    });

    store.dispatch = jest.fn();

    render(<Provider store={store}>
      <WatchLater viewTrailer={viewTrailerMock} searchMovies={searchMoviesMock} />
    </Provider>);

    const removeWatchMoviesButton = screen.getByTestId('remove-watch-movies');
    await userEvent.click(removeWatchMoviesButton)

    expect(store.dispatch).toHaveBeenCalledWith(remveAllWatchLater());
    });

    it('calls searchMovies and navigates to home',async () => {
      const searchMovies = jest.fn();
      renderWithProviders(<WatchLater searchMovies={searchMovies}/>);
      const user = userEvent.setup()
      await user.click(screen.getAllByText(/Home/i)[0])
      
      // Simulate the click event
      expect(searchMovies).toHaveBeenCalledWith('');
    });

});
