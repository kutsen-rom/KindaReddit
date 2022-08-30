import './loading-posts.css'

export const LoadingPosts = () => {
    return (
        <div className="loading-posts-container">
            <div className='loading-posts'>
                <div className='row-posts title-posts'></div>
                <div className='content-box-posts'>
                    <div className='row-posts content-posts'></div>
                    <div className='row-posts content-posts'></div>
                    <div className='row-posts content-posts'></div>
                    <div className='row-posts content-posts'></div>
                    <div className='row-posts content-posts'></div>
                    <div className='row-posts content-posts'></div>
                    <div className='row-posts content-posts'></div>
                    <div className='row-posts content-posts'></div>
                </div>
                <div className='row-posts footer-posts'></div>                
            </div>
            
        </div>
    )
}