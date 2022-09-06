export const calculateTime = (dateCreated, dateCurrent) => {
  const difference = Math.round(((dateCreated - dateCurrent) / 1000 / 60));
  const seconds = Math.round(difference * 60);
  const minutes = Math.round(difference);
  const hours = Math.round(difference / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(weeks / 4);
  const years = Math.round(months / 12);
  
    if (seconds === 1) {
      return `${seconds} second ago`
    }  else if (seconds < 60) {
    return `${seconds} seconds ago`
    } else if (minutes === 1 ) {
      return `${minutes} minute ago`
     } else if ( minutes > 1 && minutes < 60) {
    return `${minutes} minutes ago`
   } else if (hours === 1) {
    return `${hours} hour ago`;
   } else if (hours > 1 && hours < 24) {
    return `${hours} hours ago`;
   } else if (days === 1) {
    return `${days} day ago`
   } else if (days > 1 && days < 7) {
    return `${days} days ago`
   } else if (weeks === 1) {
    return `${weeks} week ago`
   } else if (weeks > 1 && weeks < 4) {
    return `${weeks} weeks ago`
   } else if (months === 1) {
    return `${months} month ago`
   } else if (months > 1 && months < 12) {
    return `${months} months ago`
   } else if (years === 1) {
    return `${years} year ago`
   } else if (years > 1){
    return `${years} years ago`
   }

   }

  export const mapPosts = (json) => {
  return json.data.children.map(post => ({
    author: post.data.author,
    after: post.data.name,
    subredditPrefixed: post.data.subreddit_name_prefixed,
    subreddit: post.data.subreddit,
    subscribers: post.data.subreddit_subscribers,
    title: post.data.title,
    id: post.data.id,
    createdUtc: post.data.created_utc,
    numComments: post.data.num_comments,
    permalink: post.data.permalink,
    score: post.data.score,
    url: post.data.url,
    postHint: post.data.post_hint,
    thumbnail: post.data.thumbnail,
    isVideo: post.data.is_video,
    selftext: post.data.selftext_html,
    preview: post.data.preview,
    mediaMetadata: post.data.media_metadata,
    isRedditMediaDomain: post.data.is_reddit_media_domain,
    domain: post.data.domain,
    ...(post.data.media) && {video: post.data.media.reddit_video}
}));
}

export const mapComments = (json) => {
  return json.data.children.map(comment => ({
    data: {
      id: comment.data.id,
      author: comment.data.author,
      created_utc: comment.data.created_utc,
      score: comment.data.score,
      body_html: comment.data.body_html,
      replies: comment.data.replies
    }
  }))
}

export const parseNumbers = (number) => {
  const num = number.toString();
  const length = num.length;
  if (length === 4 || length === 5) {
    return num.slice(0, length-3) + ',' + num.slice(length-3, length-2) + 'k'
    } else if (length === 6) {
    return num.slice(0, length-3) + 'k' 
    } else if (length === 7 || length === 8) {
      return num.slice(0, length-6) + ',' + num.slice(length-6, length-5) + 'm' 
    } else if (length === 9) {
      return num.slice(0, length-6) + 'm' 
    } else {
      return num
    }
}

export const getAudioUrl = (videoFallbackUrl) => {
  const indexDash =  videoFallbackUrl.indexOf('_');
  const indexDot = videoFallbackUrl.indexOf('mp4');
  return videoFallbackUrl.slice(0, indexDash+1) + 'audio.' + videoFallbackUrl.slice(indexDot)
}