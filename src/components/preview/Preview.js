import './preview.css'
import { calculateTime, parseNumbers, getAudioUrl, addLink } from '../../utils/utilities';
import { decode } from 'html-entities'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';

export const Preview = ({ preview }) => {
    
  const dateCreated = new Date(preview.createdUtc * 1000);
  const dateCurrent = new Date().getTime();
  const content = decode(preview.selftext);
  const title = decode(preview.title);
    const videoThumbnail = preview.preview && decode(preview.preview.images[0].source.url);
  let gallery = [];

  const showMetaData = () => {
    for (let key in preview.mediaMetadata) {
        gallery.push(decode(preview.mediaMetadata[key].s.u))
    }
  }

  showMetaData();

  const [imgToShow, setImgToShow] = useState(1);

  const handleRightClick = () => {
    if (imgToShow === gallery.length) {
        setImgToShow(1)
    } else if(imgToShow < gallery.length) {
        setImgToShow(imgToShow + 1)
    }
  }

  const handleLeftClick = () => {
    
    if (imgToShow === 1) {
        setImgToShow(gallery.length)
    } else if(imgToShow > 1) {
        setImgToShow(imgToShow - 1)
    }
  }

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

  useEffect(() => {
    return () => {
        audio.pause()
    }
})

    return (
    <>
        {preview.thumbnail !== 'nsfw' && 
           <div className="preview">


            {/* SUBREDDIT AND USER */}

           <div className='first-row-container'>
               <Link className='sub' to={`/${preview.subreddit}/hot`}><b>{preview.subredditPrefixed}</b></Link>
               <p className='separator'>&nbsp;•&nbsp;</p>
               <p>Posted by u/{preview.author} {calculateTime(dateCurrent, dateCreated)}</p>
           </div>
           


           {/* TITLE */}

           <h3>{title}</h3>


           {/* LINK */}

            <div className='link'>
                <Link onClick={(e) => {e.preventDefault()}} to=''><a onClick={() => window.open(preview.url, '_blank')} href={preview.url}>{!preview.isRedditMediaDomain && !preview.domain.includes('self.') && !preview.domain.includes('reddit') && !preview.domain.includes('imgur')  ? preview.url : ''}</a></Link>
            </div>
           


           {/* IMAGE */}

           {preview.postHint === 'image' && 

            <figure className='img-container'>
                <a href={preview.url}><img alt='' src={preview.url}></img></a>
            </figure>
       }


            {/* IMAGE GALLERY */}
           {gallery.length > 0 && 
                <figure className='gallery-container'>
                    {gallery.length !== 1 && 
                        <>
                            <Link onClick={(e) => {e.preventDefault()}} to=''><button onClick={handleLeftClick} className='chevron chevron-left'></button></Link>
                        </>}
                    <a href={gallery[0]}>
                        <img className={imgToShow - 0 !== 1 ? 'img-hide abs' : 'abs'} width='100%' alt='' src={gallery[0]}></img>
                    </a> 
                    {gallery.map((image, index) => {
                        if (index !== 0) {
                            return <a href={image}><img className={imgToShow - (index + 1) !== 0 ? 'img-hide abs' : 'abs'} width='100%' alt='' src={image}></img></a> 
                            } else {
                                return ''
                            }
                    })}
                        {gallery.length !== 1 && 
                            <>
                                <Link onClick={(e) => {e.preventDefault()}} to=''><button onClick={handleRightClick} className='chevron chevron-right'></button></Link>
                                <div className='img-counter'>{`${imgToShow}/${gallery.length}`}</div>
                            </>}
                </figure>
           }



           {/* VIDEO */}

           {preview.isVideo && 
            <video onVolumeChange={() => console.log(1213)} poster={videoThumbnail} preload='none' onPlay={handlePlay} onPause={handlePause} onTimeUpdate={handleTimeUpdate} onAbort={handlePause} width='100%' controls>
                <source src={preview.video.fallback_url} type="video/mp4" />
                <audio controls>
                    <source src="https://v.redd.it/xe7n6luqhnj91/DASH_audio.mp4?source=fallback" type="audio/mpeg"/>
                </audio>
            </video>}



            {/* TEXT */}

           {preview.selftext && 
            <div className='link'>
                {!content.includes('preview.redd') && <p dangerouslySetInnerHTML={{__html: content}} className='content'></p>}
            </div>}


            {/* UPVOTES AND COMMENTS */}

           <h6>{parseNumbers(preview.score)} {preview.score === 1 ? 'point' : 'points'} • {parseNumbers(preview.numComments)} {preview.numComments === 1 ? 'comment' : 'comments'}</h6>
       </div> }
    </>
        
    )
}
