import { Link, Outlet, useSearchParams, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, loadMorePosts, selectIsLoading, selectPostsError, selectPosts, setNoError, setNoResultsError } from "../posts/postsSlice";
import './searchBar.css'
import { LoadingPosts } from "../../components/loadingPosts/LoadingPosts";
import { ErrorPage } from "../../components/errorPage/ErrorPage";
import InfiniteScroll from "react-infinite-scroll-component";

export const SearchBar = ({routeError}) => {
  const error = useSelector(selectPostsError);
  const isLoading = useSelector(selectIsLoading);

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch ] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  const [term, setTerm] = useState('');

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sort = params.sort ? params.sort : '';
  const top = params.top ? params.top : '';
  const subreddit = params.subreddit ? `${params.subreddit}` : '';
  const searchUrl = searchParams.get('search') && '' ;
  const posts = useSelector(selectPosts);
  useEffect(() => {
    if (search) {
      const searchTop = top ? `/${params.top}` : '';
      navigate(`/${subreddit}/${sort}${searchTop}/?search=${search}`)
      dispatch(loadPosts({sort, top, search, subreddit}))
    } else if (!params.postId && !subreddit && sort && !searchUrl) {
      dispatch(loadPosts({sort, top}));
    } else if (top && !searchUrl) {
      dispatch(loadPosts({sort, top, search, subreddit}));
    } else if (sort && !searchUrl) {
      dispatch(loadPosts({sort, top: '', search: '', subreddit}));
    } else if (subreddit && !searchUrl) {
      dispatch(loadPosts({sort: '', top: '', search: '', subreddit}));
    }
    // eslint-disable-next-line
  }, [dispatch, sort, top, subreddit, searchUrl, term])

  useEffect(() => {
    setSearch(localStorage.getItem('search'))
  }, [])

  const handleChange = ({ target }) => {
    setSearch(target.value);
    localStorage.setItem('search', target.value);
  }

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
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    document.activeElement.blur();
    if (search) {
      setSearchParams({ search: search });
      setTerm(search);
    } else {
      setSearchParams({});
    }
    
  }

  const loadMore = () => {

      !isLoading && dispatch(loadMorePosts({sort, top, search, subreddit, after: `&after=${posts[posts.length - 1].after}`}));
}

	return(
    <>
      <div className="search-bar">
        <Link to='/'><div onClick={() => {setSearch(''); dispatch(setNoResultsError()); dispatch(setNoError())}} className='logo' id='logo'></div></Link>
        <form onSubmit={handleSubmit}>
          <input onFocus={() => {setSearch(''); localStorage.setItem('search', '')}} name="term" value={search} onChange={handleChange} placeholder="Search Reddit" type='text'></input>
        </form>
        <button onClick={handleClick}>Change theme</button>
      </div>
      {isLoading ? 
        <><LoadingPosts /><LoadingPosts /></> :
        (error || routeError) ? <ErrorPage search={{search, setSearch}}/> :
        <InfiniteScroll style={{overflow: ''}} dataLength={posts && posts.length-5} next={() => loadMore()} hasMore={true}><Outlet context={[search, setSearch]}/></InfiniteScroll>
        }
    </>
	)


}

