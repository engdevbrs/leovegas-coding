import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants';
import { fetchMovies } from '../data/moviesSlice';
import { useCallback } from 'react';

const ScrollComponent = ({searchQuery}) => {

  const dispatch = useDispatch();
  const { fetchStatus } = useSelector((state) => state.movies);
  const { page } = useSelector((state) => state.movies);


  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && fetchStatus !== 'loading' && searchQuery){
      const endpoint = `${ENDPOINT_SEARCH}&query=+${searchQuery}&page=${page + 1}`;
      const operation = 'listmoreitems';
      dispatch(fetchMovies({ endpoint, operation }));
    } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && fetchStatus !== 'loading') {
      const endpoint = `${ENDPOINT_DISCOVER}&language=en-US&page=${page + 1}`;
      const operation = 'listmoreitems';
      dispatch(fetchMovies({ endpoint, operation }));
    }
  }, [dispatch, fetchStatus, searchQuery, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};

export default ScrollComponent;
