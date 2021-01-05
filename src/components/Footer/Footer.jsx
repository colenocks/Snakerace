import React from "react";
import "./Footer.scss";

const Footer = () => {
  const date = new Date();
  return (
    <footer className='main__footer'>
      <p className='copyright'>
        Created & Designed by Coleman &copy; {date.getFullYear()}
      </p>
      <div className='footer__icon'>
        <a
          href='https://www.github.com/colenocks'
          target='_blank'
          rel='noreferrer'>
          <i className='fab fa-github fa-2x'></i>
        </a>
        <a
          href='https://www.linkedin.com/in/coleman-enocks'
          target='_blank'
          rel='noreferrer'>
          <i className='fab fa-linkedin fa-2x'></i>
        </a>
        <a
          href='https://www.twitter.com/encole9'
          target='_blank'
          rel='noreferrer'>
          <i className='fab fa-twitter fa-2x'></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
