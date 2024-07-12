// Import necessary libraries
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { moviesMock } from './movies.mocks';
import Movie, { myClickHandler } from '../components/Movie';
import starredSlice from '../data/starredSlice';
import userEvent from '@testing-library/user-event';
import watchLaterSlice from '../data/watchLaterSlice';

const { starMovie, unstarMovie } = starredSlice.actions
const { addToWatchLater,removeFromWatchLater } = watchLaterSlice.actions


describe('Movie component', () => {
  let store;
  let movie;
  let event;
  let parentElement;
  let grandparentElement;

  beforeEach(() => {
    movie = moviesMock[0];
    grandparentElement = document.createElement('div');
    grandparentElement.classList.add('opened');
    parentElement = document.createElement('div');
    grandparentElement.appendChild(parentElement);
    const target = document.createElement('div');
    parentElement.appendChild(target);

    event = {
      stopPropagation: jest.fn(),
      target: target,
    };
  });

  it('renders movie details correctly', () => {
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
    render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    expect(screen.getByText(movie.overview)).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
  });

  it('dispatches starMovie action when star button is clicked', async () => {

    const starred = {
      starredMovies: [movie.id], // Example where the movie is already starred
    };
    const watchLater = {
      watchLaterMovies: [movie.id], // Example where the movie is already in watch later
    };

    store = configureStore({
      reducer: {
        starred: (state = starred, action) => state,
        watchLater: (state = watchLater, action) => state,
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );
    
    const starButton = screen.getByTestId('starred-link');
    await userEvent.click(starButton)

    expect(store.dispatch).toHaveBeenCalledWith(starMovie({
      id: movie.id,
      overview: movie.overview,
      release_date: '2010',
      poster_path: movie.poster_path,
      title: movie.title
    }));
  });  

  it('dispatches addToWatchLater action when watch later button is clicked', async () => {

    const starred = {
      starredMovies: [movie.id], // Example where the movie is already starred
    };
    const watchLater = {
      watchLaterMovies: [movie.id], // Example where the movie is already in watch later
    };

    store = configureStore({
      reducer: {
        starred: (state = starred, action) => state,
        watchLater: (state = watchLater, action) => state,
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    const addWatcherMovie = screen.getByTestId('watch-later');
    await userEvent.click(addWatcherMovie)

    expect(store.dispatch).toHaveBeenCalledWith(addToWatchLater({
      id: movie.id,
      overview: movie.overview,
      release_date: '2010',
      poster_path: movie.poster_path,
      title: movie.title
    }));
  });  

  it('dispatches unstarMovie action when star button is clicked', async () => {
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

    render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );
    
    const starButton = screen.getByTestId('unstar-link');
    await userEvent.click(starButton)

    expect(store.dispatch).toHaveBeenCalledWith(unstarMovie(movie));
  });  

  it('dispatches remove watch later action when watch later button is clicked', async () => {
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

    render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );
    
    const removeWatchLaterButton = screen.getByTestId('remove-watch-later');
    await userEvent.click(removeWatchLaterButton)

    expect(store.dispatch).toHaveBeenCalledWith(removeFromWatchLater(movie));
  });

  it('should call stopPropagation if it exists', () => {
    myClickHandler(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should remove "opened" class from grandparent element', () => {
    myClickHandler(event);
    expect(grandparentElement.classList.contains('opened')).toBe(false);
  });

  it('should set cancelBubble to true if event does not exist', () => {
    let mockEventObject = null;
    mockEventObject = myClickHandler(mockEventObject);
    expect(mockEventObject.cancelBubble).toBe(true);
  });
});
