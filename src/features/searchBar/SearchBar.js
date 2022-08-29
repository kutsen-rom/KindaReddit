import { Link, Outlet, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../theme/themeSlice";
import { loadPosts } from "../posts/postsSlice";
import './searchBar.css'

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    setSearch(localStorage.getItem('search'))
  }, [])

  const handleChange = ({ target }) => {
    setSearch(target.value);
    localStorage.setItem('search', target.value);
    const search = target.value;
    if (search) {
      setSearchParams({ search: search })
    } else {
      setSearchParams({});
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loadPosts({category: '', when: '', search}))
  }

	return(
    <>
      <div className="search-bar">
        <Link to='/'><div className='logo' id='logo'></div></Link>
        <form onSubmit={handleSubmit}>
          <input name="term" value={searchParams.get('search') || ''} onChange={handleChange} placeholder="Search Reddit" type='text'></input>
        </form>
        <button onClick={handleClick}>Change theme</button>
      </div>
      <Outlet />
    </>
	)


}

