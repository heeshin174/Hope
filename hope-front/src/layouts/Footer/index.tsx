import './style.css'

export default function Footer() {

    // event handler
    const onInstaIconClick = () => {
        window.open('https://www.instagram.com/');
    }

    // event handler
    const onNaverBlogIconClick = () => {
        window.open('https://blog.naver.com');
    }

    return (
    <footer id="footer">
        <div className="footer-container">
            <div className="footer-top">
                <div className="footer-logo-box">
                    <div className="icon-box">
                        <div className="icon logo-light-icon"></div>
                    </div>
                    <div className="footer-logo-text">{'HOPE'}</div>
                </div>
                <div className="footer-link-box">
                    <div className="footer-email-link">{'heeshin174@gmail.com'}</div>
                    <div className="icon-button">
                        <div className="icon insta-icon" onClick={onInstaIconClick}></div>
                    </div>
                    <div className="icon-button">
                        <div className="icon naver-blog-icon" onClick={onNaverBlogIconClick}></div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-copyright-box">{'Copyright '}</div>
            </div>
        </div>
    </footer>
    );
}