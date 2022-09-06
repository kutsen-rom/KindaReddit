import './error-page.css'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { selectNoResults, setNoResultsError, setNoError } from '../../features/posts/postsSlice';

export const ErrorPage = ({search}) => {
  const navigate = useNavigate();
  const noResults = useSelector(selectNoResults);
  const params = useParams();
  const dispatch = useDispatch();

  const handleNoResults = () => {
    dispatch(setNoResultsError());
    dispatch(setNoError());
    search.setSearch('');
  }

  return (
    <div className='error-container'>
        {noResults ? 
        <h1 className='no-results'>There're no {params.sort} results for '{localStorage.getItem('search')}' {(params.sort === 'top' && !params.top) ? 'today' : !params.top ? '' : `this ${params.top}`}  {params.subreddit !== 'popular' ? `on r/${params.subreddit}` : " in 'popular'"}</h1>        
      : <h1>Something went wrong...</h1>
      }
        <div className='error-buttons'>
          <button onClick={() => noResults ? (handleNoResults(), navigate(-1)) : navigate(-1)}>Go Back</button>
          <div className='space'></div>
          <button onClick={() => noResults ? (handleNoResults(), navigate('/')) : navigate('/')}>To main page</button>
        </div>
    </div>
  )
}