import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import watchLaterSlice from '../data/watchLaterSlice'
import Movie from './Movie'
import '../styles/starred.scss'

const WatchLater = ({viewTrailer,searchMovies}) => {

    const state = useSelector((state) => state)
    const { watchLater } = state
    const { remveAllWatchLater } = watchLaterSlice.actions
    const dispatch = useDispatch()

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLater.watchLaterMovies.length > 0 && (<div data-testid="watch-later-movies">
        <h6 className="header">Watch Later List</h6>
        <div className="starred-movies">
        {watchLater.watchLaterMovies.map((movie) => (
          <Movie 
            movie={movie} 
            key={movie.id}
            viewTrailer={viewTrailer}
          />
        ))}
        </div>

        <footer className="text-center">
          <button data-testid="remove-watch-movies" className="btn btn-primary empty-watch" onClick={() => dispatch(remveAllWatchLater())}>Empty list</button>
        </footer>
      </div>)}

      {watchLater.watchLaterMovies.length === 0 && (<div data-testid='empty-cart' className="text-center empty-cart">
        <i className="bi bi-heart" />
        <p>You have no movies saved to watch later.</p>
        <p>Go to <Link to='/' onClick={() => searchMovies('')}>Home</Link></p>
      </div>)}
    </div>
  )
}

export default WatchLater
