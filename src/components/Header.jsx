import { Link, NavLink} from "react-router-dom"
import { useSelector } from 'react-redux'
import '../styles/header.scss'

const Header = ({ searchMovies, searchQuery }) => {
  
  const { starredMovies } = useSelector((state) => state.starred)

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies('')}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link className="search-link" onClick={(e) => e.preventDefault()}>
          <input type="search" data-testid="search-movies"
            onChange={(e) => searchMovies(e.target.value)} 
            value={searchQuery || ""}
            className="form-control rounded" 
            placeholder="Search movies..." 
            aria-label="Search movies" 
            aria-describedby="search-addon" 
            />
        </Link>            
      </div>      
    </header>
  )
}

export default Header
