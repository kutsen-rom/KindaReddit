import './preview.css'
import { calculateTime } from '../../utils/utilities';
import { decode } from 'html-entities'

export const Preview = ({ preview }) => {
  const dateCreated = new Date(preview.created_utc * 1000);
  const dateCurrent = new Date().getTime();
  const content = decode(preview.selftext);
  const title = decode(preview.title);
  let gallery = [];

  const showMetaData = () => {
    for (let key in preview.media_metadata) {
        gallery.push(decode(preview.media_metadata[key].s.u))
        console.log(key)
    }
  }
  showMetaData();
  console.log(gallery);
 

    return (
        <div className="preview">
            <p><b>{preview.subreddit_name_prefixed}</b> • Posted by u/{preview.author} {calculateTime(dateCurrent, dateCreated)}</p>
            <h3>{title}</h3>
            {preview.post_hint === 'image' && 
            <a href={preview.url}><img width='100%' src={preview.url}></img></a>
        }
            {gallery && gallery.map(image => {
                return <a href={image}><img width='100%' src={image}></img></a> 
            })}
            {preview.is_video && 
            <video width='100%' type="video/mp4" src={preview.video.fallback_url} controls ></video>    }
            {preview.selftext && 
            <p dangerouslySetInnerHTML={{__html: content}} className='content'></p>}
            <h6>{preview.num_comments} {preview.num_comments === 1 ? 'Comment' : 'Comments'}</h6>
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