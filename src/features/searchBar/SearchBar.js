//! author, created_utc, title, id, num_comments, permalink, score, subreddit_name_prefixed, url, 
//* preview.images.0.source.url

import { Link, Outlet } from "react-router-dom"
import { useState } from "react";
export const SearchBar = () => {

const [ term, setTerm ] = useState('');

	return(
		<div className="search-bar">
			<Link to='/'><div className="logo"></div></Link>
			<form >
				<input name="term" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search Reddit" type='text'></input>
			</form>
			<button>Change theme</button>
		<Outlet />
		</div>
	)


}

