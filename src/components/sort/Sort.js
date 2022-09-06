import './sort.css'

import { useParams, NavLink, useOutletContext } from 'react-router-dom'

export const Sort = () => {
    const searchInput = useOutletContext();
    const search = searchInput ? `?search=${searchInput}` : '';
    const params = useParams();
    const sort = params.sort ? params.sort : '';
    const top = params.top;
    const subreddit = params.subreddit;
    
    return (
      <>
        <div className="sort first-box">
          <NavLink to={`/${subreddit}/hot${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Hot</b></NavLink>
          <NavLink to={`/${subreddit}/new${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>New</b></NavLink>
          <NavLink to={`/${subreddit}/top${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Top</b></NavLink>
          <NavLink to={`/${subreddit}/rising${search}`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Rising</b></NavLink>
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