export const calculateTime = (dateCreated, dateCurrent) => {
  const difference = ((dateCreated - dateCurrent) / 1000 / 60).toFixed();
  const seconds = (difference * 60).toFixed();
  const minutes = difference;
  const hours = (difference / 60).toFixed();
  const days = (hours / 24).toFixed();
  const weeks = (days / 7).toFixed();
  const months = (weeks / 4).toFixed();
  const years = (months / 12).toFixed();

    if (seconds === 1) {
      return `${seconds} second ago`
    }  else if (seconds < 60) {
    return `${seconds} seconds ago`
    } else if (minutes === 1) {
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