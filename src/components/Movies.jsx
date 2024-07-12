import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer, closeCard,fetchStatus }) => {

    return (
        <>
        <div data-testid="movies" className="movies">
            {movies?.map((movie) => {
                return (
                    <Movie
                        movie={movie}
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard} />
                )
            })}
        </div>
        <div className="row">
            {
                fetchStatus === "loading" ? <div className="row text-center mb-5"><span>Loading more Items...</span></div> : <></>
            }
        </div>
        </>
    )
}

export default Movies
