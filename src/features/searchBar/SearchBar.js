
import { Link, Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../theme/themeSlice";
import './searchBar.css'

export const SearchBar = () => {
  
  const [ term, setTerm ] = useState('');

  useEffect(() => {
    setTerm(localStorage.getItem('term'))
  }, [])

  const handleChange = ({ target }) => {
    setTerm(target.value);
    localStorage.setItem('term', target.value);
  }

  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    if (!theme || theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.getElementById('logo').style.backgroundImage = 'url(/images/kindareddit-logo-theme-dark.svg)'
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.getElementById('logo').style.backgroundImage = 'url(/images/kindareddit-logo-theme-light.svg)'
    }
  } , [theme])

  const handleClick = () => {
    if (!theme || theme === 'dark') {
      localStorage.setItem('theme', 'light');
      dispatch(toggleTheme('light'));
    } else {
      localStorage.setItem('theme', 'dark');
      dispatch(toggleTheme('dark'))
    }
  }

 

	return(
    <>
      <div className="search-bar">
        <Link to='/'><div className='logo' id='logo'></div></Link>
        <form >
          <input name="term" value={term} onChange={handleChange} placeholder="Search Reddit" type='text'></input>
        </form>
        <button onClick={handleClick}>Change theme</button>
      </div>
      <Outlet />
    </>
	)


}

