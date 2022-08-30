import './comment.css'

import { calculateTime } from "../../utils/utilities";
import { decode } from 'html-entities'


export const Comment = ({ comment }) => {
  if (comment.replies) {
    console.log(comment.replies.data.children.length)
  }
  const dateCreated = new Date().getTime();
  const dateCurrent = new Date(comment.created_utc * 1000)
  const content = decode(comment.body_html);

  return (
    <div className="comment">
      <p className='first-line'><b>u/{comment.author}</b> • posted {calculateTime(dateCreated, dateCurrent)}</p>
      <p dangerouslySetInnerHTML={{__html: content}}></p>
      <p className='points'><b>{comment.score} points • {comment.replies && comment.replies.data.children.length} replies</b></p>
    </div>
  )
}