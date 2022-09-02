import { useState } from 'react'
import './back-to-top.css'

export const BackToTop = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showGoBack, setShowGoBack] = useState(false)

    const handleButton = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);

        if (scrollPosition > 500) {
            return setShowGoBack(true);
        } else if (scrollPosition < 500){
            return setShowGoBack(false);
        }
    }

    const handleClick = () => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setShowGoBack(false);
        }, 10) 
    }

    window.addEventListener("scroll", handleButton)

    return (
        <>
            <button onClick={handleClick} className={showGoBack ? `back` : 'hidden'}>Back to Top</button>
        </>
    )
}
