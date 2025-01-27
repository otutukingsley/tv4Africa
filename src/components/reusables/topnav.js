import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import { Weather } from '../weather/Weather';
import './header.css';

import logoImg from 'assets/images/logo white.png';

function TopNav(props) {
  const userContext = useContext(authContext);
  const { user } = userContext;

  // const authContext = useContext(AuthContext);

  useEffect(() => {
    userContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const getDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    let monthString;
    if (month === 1) {
      monthString = 'January';
    } else if (month === 2) {
      monthString = 'February';
    } else if (month === 3) {
      monthString = 'March';
    } else if (month === 4) {
      monthString = 'April';
    } else if (month === 5) {
      monthString = 'May';
    } else if (month === 6) {
      monthString = 'June';
    } else if (month === 7) {
      monthString = 'July';
    } else if (month === 8) {
      monthString = 'August';
    } else if (month === 9) {
      monthString = 'September';
    } else if (month === 10) {
      monthString = 'October';
    } else if (month === 11) {
      monthString = 'November';
    } else if (month === 12) {
      monthString = 'December';
    }
    return `${monthString} ${day}, ${year}`;
  };
  return (
    <div className="top-nav">
      {/* <section className="top-nav-wrap"> */}
      <p className="text-white name-sp" style={{ marginBottom: '0px' }}>
        {' '}
        {user && user ? (
          <>
            <span>
              Welcome {user.firstname} {user.lastname}
            </span>{' '}
            <span className="p-1">{getDate()}</span>
          </>
        ) : (
          <>
            <span>Welcome to TV24 Africa News</span>{' '}
            <span className="p-1">{getDate()}</span>
          </>
        )}{' '}
      </p>
      {/* the weather repost component goes here */}{' '}
      <div>
        <img
          src={logoImg}
          alt="TV24 Africa logo"
          style={{ height: '50px', marginRight: '10px' }}
        />
      </div>
      {/* social links */}
      <ul className="soc-nav mr-" style={{ marginBottom: '0px' }}>
        <li>
          <a href="https://www.facebook.com/tv24africanews">
            <i className="fab fa-facebook"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/tv24africanews">
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/tv24africanews/">
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fab fa-youtube"></i>
          </a>
        </li>
      </ul>
      {/* </section> */}
    </div>
  );
}

export default TopNav;
