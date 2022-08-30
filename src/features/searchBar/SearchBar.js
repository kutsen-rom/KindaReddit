import { Link, Outlet, useSearchParams, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../theme/themeSlice";
import { loadPosts, selectIsLoading, selectPostsError } from "../posts/postsSlice";
import './searchBar.css'
import { LoadingPosts } from "../../components/loadingPosts/LoadingPosts";
import { ErrorPage } from "../../components/errorPage/ErrorPage";

export const SearchBar = () => {
  const error = useSelector(selectPostsError);
  const isLoading = useSelector(selectIsLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [ search, setSearch ] = useState('');
  const params = useParams();
  const dispatch = useDispatch();


  const category = params.category ? params.category : '';
  const when = params.when;

  useEffect(() => {
    if (searchParams.get('search')) {
      dispatch(loadPosts({category: '', when: '', search}))
    } else if (!params.postId) {
      dispatch(loadPosts({category, when}));
    }
  }, [dispatch, category, when])

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

  const theme = useSelector(selectTheme);

  useEffect(() => {
    if (!theme || theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.getElementById('logo').style.backgroundImage = 'url(/images/kindareddit-logo-theme-light.svg)'
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.getElementById('logo').style.backgroundImage = 'url(/images/kindareddit-logo-theme-dark.svg)'
    }
  } , [theme])

  const handleClick = () => {
    if (!theme || theme === 'light') {
      localStorage.setItem('theme', 'dark');
      dispatch(toggleTheme('dark'));
    } else {
      localStorage.setItem('theme', 'light');
      dispatch(toggleTheme('light'))
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
      {isLoading ? 
        <><LoadingPosts /><LoadingPosts /></> :
        error ? <ErrorPage /> :
        <Outlet />}
    </>
	)


}

