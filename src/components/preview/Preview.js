import './preview.css'
import { calculateTime, parseNumbers, getAudioUrl } from '../../utils/utilities';
import { decode } from 'html-entities'
import { Link } from 'react-router-dom'
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

  const [currentImage, setCurrentImage] = useState(0);

  const handleRightClick = () => {
    if (currentImage + 1 === gallery.length) {
        setCurrentImage(0)
    } else if(currentImage < gallery.length) {
        setCurrentImage(currentImage + 1)
    }
  }

  const handleLeftClick = () => {
    if (currentImage === 0) {
        setCurrentImage(gallery.length-1)
    } else if(currentImage > 0) {
        setCurrentImage(currentImage - 1)
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
        audio.currentTime = e.target.currentTime;
      }

  useEffect(() => {
    return () => {
        audio.pause()
    }
})

//    SWIPE FOR DEVICES

const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);
const [isLeftSwipe, setIsLeftSwipe] = useState(false);

const minSwipeDistance = 50 

const handleTouchStart = (e) => {
  setTouchEnd(e.targetTouches[0].clientX) 
  setTouchStart(e.targetTouches[0].clientX)
}

const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

const handleTouchEnd = () => {
  if (!touchStart || !touchEnd) return
  const distance = touchStart - touchEnd
  setIsLeftSwipe(distance > minSwipeDistance);
  const isRightSwipe = distance < -minSwipeDistance;
  if (isLeftSwipe || isRightSwipe) {
    isLeftSwipe ? handleRightClick() : handleLeftClick();
  }
  setTouchEnd(0);
  setTouchStart(0) 

}

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
                <Link onClick={(e) => {e.preventDefault()}} to=''>
                    <a 
                        onClick={() => window.open(preview.url, '_blank')} 
                        href={preview.url}>
                            {!preview.isRedditMediaDomain 
                            && !preview.domain.includes('self.') 
                            && !preview.domain.includes('reddit') 
                            && !preview.domain.includes('imgur')  
                            ? preview.url 
                            : ''}
                    </a>
                    </Link>
            </div>
           


           {/* IMAGE */}

           {preview.postHint === 'image' && 

            <figure className='img-container'>
                <a href={preview.url}><img alt='' src={preview.url}></img></a>
            </figure>
       }

            {/* IMAGE GALLERY */}
           {gallery.length > 0 && 
                <figure 
                onTouchStart={handleTouchStart} 
                onTouchMove={handleTouchMove} 
                onTouchEnd={handleTouchEnd} 
                className='gallery-container'>
                    {gallery.map((image, index) => {
                        return <a href={image}>
                                    <img 
                                        style={{transform: `translateX(${(touchEnd -touchStart) / 5}%)`, position: 'absolute'}} 
                                        className={`${((index < currentImage && currentImage !== gallery.length - 1) || (currentImage === 0 && index === gallery.length - 1)) 
                                            ? 'left-hide' 
                                            : (index > currentImage ||  (index === 0 && currentImage === gallery.length - 1)) 
                                            ? 'right-hide' 
                                            : 'current'}`} 
                                        width='100%' 
                                        alt='' 
                                        src={image}>
                                    </img>
                                </a>
                    })}
                        {gallery.length !== 1 && 
                            <>
                                <Link onClick={(e) => {e.preventDefault()}} to=''>
                                    <button onClick={handleLeftClick} className='chevron chevron-left'></button>
                                </Link>
                                <Link onClick={(e) => {e.preventDefault()}} to=''>
                                    <button onClick={handleRightClick} className='chevron chevron-right'></button>
                                </Link>
                                <div className='img-counter'>{`${currentImage + 1}/${gallery.length}`}</div>
                            </>}
                </figure>
           }



           {/* VIDEO */}

           {preview.isVideo && 
            <video 
            poster={videoThumbnail} 
            preload='none' 
            onPlay={handlePlay} 
            onPause={handlePause} 
            onTimeUpdate={handleTimeUpdate} 
            onAbort={handlePause} 
            width='100%' 
            controls>
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

           <h6>{parseNumbers(preview.score)} {preview.score === 1 ? 'point' : 'points'} • 
           {parseNumbers(preview.numComments)} {preview.numComments === 1 ? 'comment' : 'comments'}</h6>
       </div> }
    </>
        
    )
}
