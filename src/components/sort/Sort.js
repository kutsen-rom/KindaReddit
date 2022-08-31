import './sort.css'

import { useParams, NavLink } from 'react-router-dom'


export const Sort = () => {
    const params = useParams();
    const category = params.category ? params.category : '';
    const when = params.when;
    const subreddit = params.subreddit;
    
    return (
      <>
        <div className="sort first-box">
          <NavLink to={`/${subreddit}/hot`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Hot</b></NavLink>
          <NavLink to={`/${subreddit}/new`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>New</b></NavLink>
          <NavLink to={`/${subreddit}/top`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Top</b></NavLink>
          <NavLink to={`/${subreddit}/rising`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Rising</b></NavLink>
        </div>
        { category === 'top' &&
        <div className='sort second-box'>
          <NavLink to={`/${subreddit}/top/hour`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Now</b></NavLink>
          <NavLink to={`/${subreddit}/top/day`} className={({isActive}) => (!when || isActive ? 'active' : 'none')}><b>Today</b></NavLink>
          <NavLink to={`/${subreddit}/top/week`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Week</b></NavLink>
          <NavLink to={`/${subreddit}/top/month`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Month</b></NavLink>
          <NavLink to={`/${subreddit}/top/year`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Year</b></NavLink>
          <NavLink to={`/${subreddit}/top/all`} className={({isActive}) => (isActive ? 'active' : 'none')}><b>All Time</b></NavLink>
        </div>  
      }
      </>
        
    )
}