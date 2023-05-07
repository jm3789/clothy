import React from 'react';
import { Link } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';


const Home = () => {
    const { user } = UserAuth();
    if (user == null) {  // 로그인되어있지 않음
        return (
            <div>
                <div>
                <h1>Home</h1>
                <p>가장 먼저 보여지는 페이지입니다. 현재 로그인되지 않은 상태입니다.</p>
                </div>
                <div>
                <Link to="/Login">로그인</Link>
                </div>
            </div>
        );
    } else {  // 로그인되어 있음
        return (
            <div>
                <div>
                    <h1>Home</h1>
                    <p>가장 먼저 보여지는 페이지입니다. 안녕하세요, {user?.displayName}님!</p>
                </div>
            </div>
        );
    }
};

export default Home;