import '../loadingPosts/loading-posts.css'
import './loading-comments.css'

export const LoadingComments = () => {
    return (
        <div className="loading-comments-container">
            <div className='loading-comments'>
                <div className='row-comments header-comments'></div>                
                <div className='content-box-comments'>
                    <div className='row-comments content-comments'></div>
                    <div className='row-comments content-comments'></div>
                    <div className='row-comments content-comments'></div>
                </div>
                <div className='row-comments footer-comments'></div>                
            </div>
            
        </div>
    )
}