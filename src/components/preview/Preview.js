import './preview.css'
import { calculateTime } from '../../utils/utilities';

export const Preview = ({ preview }) => {
  const dateCreated = new Date().getTime();
  const dateCurrent = new Date(preview.created_utc * 1000);



    return (
        <div className="preview">
            <h6>{preview.subreddit_name_prefixed} • Posted by u/{preview.author} {calculateTime(dateCreated, dateCurrent)}</h6>
            <h3>{preview.title}</h3>
        </div>
    )
}

// author: post.data.author,
// subreddit_name_prefixed: post.data.subreddit_name_prefixed,
// title: post.data.title,
// id: post.data.id,
// post_hint: post.data.post_hint,
// created_utc: post.data.created_utc,
// num_comments: post.data.num_comments,
// permalink: post.data.permalink,
// score: post.data.score,
// url: post.data.url