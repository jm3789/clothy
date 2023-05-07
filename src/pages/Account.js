import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user == null) { // 사용자가 로그인되어있지 않으면
      alert("로그인 후 이용 가능합니다.");
      navigate('/login');  // 자동으로 로그인 페이지로 이동
    }
  }, [user]);

  if (user == null) {  // 로그인되어있지 않음
    return (
      <div>
        <h1>Account</h1>
        <div>
          <p>로그인 이후 이용 가능한 페이지입니다.</p>
        </div>
      </div>
    );
    } else {  // 로그인되어 있음
      return (
        <div>
          <h1>Account</h1>
          <div>
            <p>{user?.displayName}님의 계정 페이지입니다.</p>
          </div>
          <Link to="/" onClick={handleSignOut}>
            Logout
          </Link>
        </div>
      );
    }
};

export default Account;