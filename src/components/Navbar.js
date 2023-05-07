import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/Account">내 정보</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;