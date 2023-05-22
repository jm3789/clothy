import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/');
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

  if (user === null) {  // 로그인되어있지 않음
    return (
      <div>
      </div>
    );
  } else {  // 로그인되어 있음
      return (
        <div>
          <h3 style={{textAlign: 'left', marginLeft:'50px'}}>내 정보</h3>
          <div>
            <p style={{textAlign: 'left', marginLeft:'50px'}}>{user?.displayName}님의 계정 페이지입니다.</p>
          </div>
          <button onClick={handleSignOut} style={{textAlign: 'left', marginLeft:'20px'}}>
            로그아웃
          </button>
          <button onClick={() => navigate('/')} style={{float:'left', marginLeft:'50px'}}>홈으로</button>
          <hr/>
        </div>
      );
    }
};

export default Account;