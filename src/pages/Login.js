import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {  // 구글 로그인 버튼을 클릭하면
    try {
      await googleSignIn();  // 구글 로그인 팝업이 열림
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/account');  // 사용자가 로그인되어 있으면 자동으로 account 페이지로 이동
    }
  }, [user]);

  return (
    <div>
      <h1>로그인</h1>
      <div>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Login;