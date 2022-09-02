import './preview.css'
import { calculateTime, parseNumbers, getAudioUrl } from '../../utils/utilities';
import { decode } from 'html-entities'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

export const Preview = ({ preview }) => {
  const dateCreated = new Date(preview.createdUtc * 1000);
  const dateCurrent = new Date().getTime();
  const content = decode(preview.selftext);
  const title = decode(preview.title);
  let gallery = [];

  const audioSource = preview.isVideo && getAudioUrl(preview.video.fallback_url);
    const audio = new Audio(audioSource);
    const handlePlay = () => {
        audio.play();
    }
    const handlePause = () => {
        audio.pause();
    }

    const handleTimeUpdate = (e) => {
        console.log(e.target.currentTime)
        audio.currentTime = e.target.currentTime;
      }

  const showMetaData = () => {
    for (let key in preview.mediaMetadata) {
        gallery.push(decode(preview.mediaMetadata[key].s.u))
    }
  }

  useEffect(() => {
    return () => {
        audio.pause()
        console.log("in cleanup")
    }
})

  showMetaData();
 
    return (
    <>
        {preview.thumbnail !== 'nsfw' && 
           <div className="preview">
           <div className='first-row-container'>
               <Link className='sub' to={`/${preview.subreddit}/hot`}><b>{preview.subredditPrefixed}</b></Link>
               <p className='separator'>&nbsp;•&nbsp;</p>
               <p>Posted by u/{preview.author} {calculateTime(dateCurrent, dateCreated)}</p>
           </div>
           
           <h3>{title}</h3>
            <div className='link'>
                <a href={preview.url}>{!preview.isRedditMediaDomain && !preview.domain.includes('self.') && !preview.domain.includes('reddit') && !preview.domain.includes('imgur')  ? preview.url : ''}</a>
            </div>
           
           {preview.postHint === 'image' && 
           <a href={preview.url}><img width='100%' alt='' src={preview.url}></img></a>
       }
           {gallery && gallery.map(image => {
               return <a href={image}><img width='100%' alt='' src={image}></img></a> 
           })}

           {preview.isVideo && 
            <video onPlay={handlePlay} onPause={handlePause} onTimeUpdate={handleTimeUpdate} onAbort={handlePause} width='100%' controls muted>
                <source src={preview.video.fallback_url} type="video/mp4" />
                <audio controls>
                    <source src="https://v.redd.it/xe7n6luqhnj91/DASH_audio.mp4?source=fallback" type="audio/mpeg"/>
                </audio>
            </video>}

           {preview.selftext && 
            <div className='link'>
                <p dangerouslySetInnerHTML={{__html: content}} className='content'></p>
            </div>}
           <h6>{parseNumbers(preview.score)} {preview.score === 1 ? 'point' : 'points'} • {parseNumbers(preview.numComments)} {preview.numComments === 1 ? 'comment' : 'comments'}</h6>
       </div> }
    </>
        
    )
}

//!        <video width='100%' type="video/mp4" src={preview.video.fallback_url} controls muted></video>}

/* 
<video id="myvideo" controls muted>
    <source src="path/to/video.mp4" type="video/mp4" />
    <audio id="myaudio" controls>
        <source src="path/to/audio.mp3" type="audio/mpeg"/>
    </audio>
</video>

<script>
var myvideo = document.getElementById("myvideo");
var myaudio = document.getElementById("myaudio");
myvideo.onplay  = function() { myaudio.play();  }
myvideo.onpause = function() { myaudio.pause(); }
</script>


*/