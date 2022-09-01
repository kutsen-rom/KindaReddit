import '../loadingPosts/loading-posts.css'
import './loading-comments.css'

export const LoadingComments = () => {
    return (
        <div className="loading-comments-container">
            <div className='loading-comments'>
                <div className='row-comments header-comments'>
                    <div className='slider s-1'></div>
                </div>                
                <div className='content-box-comments'>
                    <div className='row-comments content-comments'>
                        <div className='slider s-2'></div>
                    </div>
                    <div className='row-comments content-comments'>
                        <div className='slider s-3'></div>
                    </div>
                    <div className='row-comments content-comments'>
                        <div className='slider s-4'></div>
                    </div>
                </div>
                <div className='row-comments footer-comments'>
                    <div className='slider s-5'></div>
                </div>                
            </div>
            
        </div>
    )
}