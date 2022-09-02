import './comment.css'

import { calculateTime, parseNumbers } from "../../utils/utilities";
import { decode } from 'html-entities'

export const Comment = ({ comment }) => {
  const nestedComments = (comment.data.replies ? comment.data.replies.data.children : []).map(comment => {
    return <Comment key={comment.data.id} comment={comment} type="child" />
  })

  const dateCreated = new Date().getTime();
  const dateCurrent = new Date(comment.data.created_utc * 1000)
  const content = decode(comment.data.body_html);

  return (<>
  {comment.data.author &&
  <div className='comment-container'>


    {/* COMMENT DEPTH */}

    <div style={{'marginLeft':1 * comment.data.depth}}  className="comment">
      <div className='box'>
        <div>


          {/* COMMENT AUTHOR */}

          <p className='first-line'><b>u/{comment.data.author}</b> • {calculateTime(dateCreated, dateCurrent)}</p>


          {/* COMMENT CONTENT */}

          <p dangerouslySetInnerHTML={{__html: content}}></p>


          {/* COMMENT UPVOTES AND REPLIES */}

          <p className='points'>
            <b>{parseNumbers(comment.data.score)} {comment.data.score === 1 ? 'point' : 'points'}
            {comment.data.replies && ' • ' + comment.data.replies.data.children.length} 
            {comment.data.replies && comment.data.replies.data.children.length === 1 
            ? 'reply' 
            : !comment.data.replies  
            ? '' 
            : 'replies'}</b></p>
        </div>
      </div>
  {nestedComments}
  </div>
</div>
    }
    
    </>
  )
}