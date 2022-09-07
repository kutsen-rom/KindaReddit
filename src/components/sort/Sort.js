import './sort.css'

import { useParams, NavLink, useOutletContext, useSearchParams } from 'react-router-dom'

export const Sort = () => {
    const searchInput = useOutletContext();
    const search = searchInput[0] ? `?search=${searchInput[0]}` : '';
    const [searchParams, setSearchParams] = useSearchParams();
    const searchUrl = searchParams.get('search');
  console.log(search)
    const params = useParams();
    const sort = params.sort ? params.sort : '';
    const top = params.top;
    const subreddit = params.subreddit;
    return (
      <>
        <div className="sort first-box">
          {searchUrl && <NavLink to={`/${subreddit}/relevance${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Relevance</b></NavLink>}
          <NavLink to={`/${subreddit}/hot${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Hot</b></NavLink>
          <NavLink to={`/${subreddit}/new${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>New</b></NavLink>
          <NavLink to={`/${subreddit}/top${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Top</b></NavLink>
          {(subreddit === 'popular' || (subreddit !== 'popular' && !searchUrl)) && <NavLink to={`/${subreddit}/rising${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Rising</b></NavLink>}
          {(subreddit !== 'popular' && searchUrl) && <NavLink to={`/${subreddit}/comments${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Most Comments</b></NavLink>}
        </div>
        { sort === 'top' &&
        <div className='sort second-box'>
          <NavLink to={`/${subreddit}/top/hour${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Now</b></NavLink>
          <NavLink to={`/${subreddit}/top/day${search}`} className={({isActive}) => (!top || isActive ? 'active' : 'none')}><b>Today</b></NavLink>
          <NavLink to={`/${subreddit}/top/week${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Week</b></NavLink>
          <NavLink to={`/${subreddit}/top/month${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Month</b></NavLink>
          {subreddit !== 'popular' && 
            <NavLink to={`/${subreddit}/top/year${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Year</b></NavLink>
          }
          <NavLink to={`/${subreddit}/top/all${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>All Time</b></NavLink>
        </div>  
      }
      </>
        
    )
}