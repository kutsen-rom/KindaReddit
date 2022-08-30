import './filter.css'

import { useParams, NavLink } from 'react-router-dom'


export const Filter = () => {
    const params = useParams();
    const category = params.category ? params.category : '';
    const when = params.when;
    
    return (
      <>
        <div className="filter">
          <NavLink to='/hot' className={({isActive}) => (isActive ? 'active' : 'none')}><b>Hot</b></NavLink>
          <NavLink to='/new' className={({isActive}) => (isActive ? 'active' : 'none')}><b>New</b></NavLink>
          <NavLink to='/top' className={({isActive}) => (isActive ? 'active' : 'none')}><b>Top</b></NavLink>
          <NavLink to='/rising' className={({isActive}) => (isActive ? 'active' : 'none')}><b>Rising</b></NavLink>
        </div>
        { category === 'top' &&
        <div className='filter'>
          <NavLink to='/top/hour' className={({isActive}) => (isActive ? 'active' : 'none')}><b>Now</b></NavLink>
          <NavLink to='/top/day' className={({isActive}) => (!when || isActive ? 'active' : 'none')}><b>Today</b></NavLink>
          <NavLink to='/top/week' className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Week</b></NavLink>
          <NavLink to='/top/month' className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Month</b></NavLink>
          <NavLink to='/top/year' className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Year</b></NavLink>
          <NavLink to='/top/all' className={({isActive}) => (isActive ? 'active' : 'none')}><b>All Time</b></NavLink>
        </div>  
      }
      </>
        
    )
}