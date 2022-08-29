import './filter.css'
import { useDispatch } from 'react-redux/es/exports'
import { setCategory } from "../../features/posts/postsSlice";
import { useParams, NavLink } from 'react-router-dom'


export const Filter = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const category = params.category ? params.category : '';
    
    const handleClick = () => {
      dispatch(setCategory(category))
    }

    return (
      <>
        <div className="filter">
          <NavLink to='/' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Hot</b></NavLink>
          <NavLink to='/new' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>New</b></NavLink>
          <NavLink to='/top' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Top</b></NavLink>
          <NavLink to='/rising' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Rising</b></NavLink>
        </div>
        { category === 'top' &&
        <div className='filter'>
          <NavLink to='/top/hour' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Now</b></NavLink>
          <NavLink to='/top/day' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>Today</b></NavLink>
          <NavLink to='/top/week' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Week</b></NavLink>
          <NavLink to='/top/month' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Month</b></NavLink>
          <NavLink to='/top/year' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>This Year</b></NavLink>
          <NavLink to='/top/all' onClick={handleClick} className={({isActive}) => (isActive ? 'active' : 'none')}><b>All Time</b></NavLink>
        </div>  
      }
      </>
        
    )
}