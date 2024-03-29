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
    if (preview.gallery_data) {
    let count = 1;
        if (preview.gallery_data.length === 2) {
            count = 2;
        }
        //eslint-disable-next-line
        for (let j = 0; j < count; j++) {
            for (let i = 0; i < preview.gallery_data.length; i++) {
                gallery.push(decode(preview.mediaMetadata[preview.gallery_data[i]].s.u));
            }
        }
        
    }
  }

  showMetaData();

  const [currentImage, setCurrentImage] = useState(0);
  const [click, setClick] = useState('');

  const scrollBack = () => {
    const y = window.pageYOffset;
    setTimeout(() => {
      window.scrollTo(0, y);
    }, 1)
  }
  
  const handleRightClick = () => {
    scrollBack();
    setClick('right');
    if (currentImage + 1 === preview.gallery_data.length) {
        setCurrentImage(0);
    } else if(currentImage < preview.gallery_data.length) {
        setCurrentImage(currentImage + 1);
    }
  }

  const handleLeftClick = () => {
    scrollBack();
    setClick('left');
    if (currentImage === 0) {
        setCurrentImage(preview.gallery_data.length-1);
    } else if(currentImage > 0) {
        setCurrentImage(currentImage - 1);
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


/*            SWIPE FOR DEVICES            */

const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);
const [topPosition, setTopPosition] = useState(0);

const minSwipeDistance = 50;

const handleTouchStart = (e) => {
  setTouchEnd(e.targetTouches[0].clientX);
  setTouchStart(e.targetTouches[0].clientX);
  setTopPosition(window.pageYOffset);
}
const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    if (touchStart - touchEnd > 10 || touchStart - touchEnd < -10) {
      document.body.setAttribute('scroll', 'disable');
      document.body.style.top = `-${topPosition}px`;
    }
}

const [percent, setPercent] = useState(0);
const [isLeft, setIsLeft] = useState('init');
const handleTouchEnd = () => {
    //           PREVENT VERTICAL SCROLL ON SWIPE
  const distance = touchStart - touchEnd;
  document.body.setAttribute('scroll', '');
  (distance > 10 || distance < -10) && window.scrollTo(0, topPosition);

  const width = document.getElementById(`${preview.id}-img-${currentImage}`).getBoundingClientRect().width;
  const position = document.getElementById(`${preview.id}-img-${currentImage}`).getBoundingClientRect().right;
  setPercent((position / width) / 30);

  if (!touchStart || !touchEnd) return
  const isLeftSwipe = (distance > minSwipeDistance);
  
  const isRightSwipe = distance < -minSwipeDistance;
  if (isLeftSwipe || isRightSwipe) {
    if (isLeftSwipe) {
        setIsLeft(false);
        handleRightClick();
    } else {
        setIsLeft(true);
        handleLeftClick();
    } 
  }
  setTouchEnd(0);
  setTouchStart(0) 
}


const handleAnimation = (index) => {
    if (click === 'right' || !isLeft) {
        return `rightSwipe${
            index === currentImage 
            ? 'Next' 
            : index === currentImage - 1 || index === gallery.length - 1 
            ? 'Current' 
            : ''
        } .5s -${percent * 1}s`
    } else if (click === 'left' || isLeft) {
            return `leftSwipe${
                index === currentImage 
                ? 'Next' 
                : index === currentImage + 1 || (index === 0 && currentImage === gallery.length - 1)
                ? 'Current'
                : ''
            } .5s -${percent * 1}s`
        }
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
                                        style={{
                                            transform: `translateX(${(touchEnd - touchStart) / 2}%)`, 
                                            animation: `${handleAnimation(index)}`}} 
                                        className={`
                                            ${index === 0 && currentImage === gallery.length - 1
                                            ? 'right-hide'
                                            : ((index === currentImage - 1 ) || (currentImage === 0 && index === gallery.length - 1)) 
                                            ? 'left-hide' 
                                            : index === currentImage + 1
                                            ? 'right-hide' 
                                            : index === currentImage 
                                            ? 'current'
                                            : 'img-hide'}`} 
                                            id={`${preview.id}-img-${index}`}
                                        max-width='100%' 
                                        alt=''
                                        max-height='100%'
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
                                <div className='img-counter'>{`${currentImage + 1}/${preview.gallery_data.length}`}</div>
                                <div className='dots'>
                                    {preview.gallery_data.map((image, index) => {
                                    return <div className={`dot ${currentImage === index && 'dot-selected'}`}></div>
})}
                                </div>
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

           <h6>{parseNumbers(preview.score)} {preview.score === 1 ? 'point' : 'points'} •&nbsp; 
           {parseNumbers(preview.numComments)} {preview.numComments === 1 ? 'comment' : 'comments'}</h6>
       </div> }
    </>
        
    )
}
