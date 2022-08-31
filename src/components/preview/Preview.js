import './preview.css'
import { calculateTime } from '../../utils/utilities';
import { decode } from 'html-entities'
import { Link } from 'react-router-dom'

export const Preview = ({ preview }) => {
  const dateCreated = new Date(preview.createdUtc * 1000);
  const dateCurrent = new Date().getTime();
  const content = decode(preview.selftext);
  const title = decode(preview.title);
  let gallery = [];

  const showMetaData = () => {
    for (let key in preview.mediaMetadata) {
        gallery.push(decode(preview.mediaMetadata[key].s.u))
    }
  }
  showMetaData();
 
    return (
    <>
        {preview.thumbnail !== 'nsfw' && 
           <div className="preview">
           <div className='first-row-container'>
               <Link to={`/${preview.subreddit}/hot`}><b>{preview.subredditPrefixed}</b></Link>
               <p>&nbsp;• Posted by u/{preview.author} {calculateTime(dateCurrent, dateCreated)}</p>
           </div>
           <h3>{title}</h3>
           <a href={preview.url}>{!preview.isRedditMediaDomain && !preview.domain.includes('self.') && !preview.domain.includes('reddit') && !preview.domain.includes('imgur')  ? preview.url : ''}</a>
           {preview.postHint === 'image' && 
           <a href={preview.url}><img width='100%' src={preview.url}></img></a>
       }
           {gallery && gallery.map(image => {
               return <a href={image}><img width='100%' src={image}></img></a> 
           })}
           {preview.isVideo && 
           <video width='100%' type="video/mp4" src={preview.video.fallback_url} controls ></video>}
           {preview.selftext && 
           <p dangerouslySetInnerHTML={{__html: content}} className='content'></p>}
           <h6>{preview.score} {preview.score === 1 ? 'point' : 'points'} • {preview.numComments} {preview.numComments === 1 ? 'comment' : 'comments'}</h6>
       </div> }
    </>
        
    )
}
