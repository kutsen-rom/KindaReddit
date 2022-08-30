import './error-page.css'

import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='error-container'>
        <h1>Something went wrong...</h1>
        <div className='error-buttons'>
          <button onClick={() => navigate(-1)}>Go Back</button>
          <button onClick={() => navigate('/')}>To main page</button>
        </div>
    </div>
  )
}