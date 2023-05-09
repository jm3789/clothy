import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav>
      <ul style={{listStyle: 'none'}}>
        <li>
          <div style={{width: '280px', margin: '0 auto', marginTop: '80px', textAlign: 'center'}}>
            <div style={{paddingTop: '100px'}}>
              <Link to="/" style={{fontSize: '8.0rem', textDecoration: 'none', color: 'black', fontFamily: 'sans-serif'}}>Clothy&#128086;</Link>
            </div>
          </div>
        </li>
        <li>
          <div style={{width: '100px', marginLeft: 'auto', marginRight: '50px', textAlign: 'right', paddingTop: '0px'}}>
            <Link to="/Account" style={{display: 'block', fontSize: '2.2rem', color: 'black', padding: '0'}}>내 정보 {`>>`}</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;