import React, { useState, useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { emailSignIn, googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  // 이메일로 로그인
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChange = (event) => {
    const {
      target: { name, value }  // name은 입력 필드의 name 속성, value는 사용자가 입력한 값
    } = event
    if (name === 'email') {  // name이 'email'이라면, setEmail 함수를 사용하여 email 상태 변수를 value로 업데이트
      setEmail(value)
    } else if (name === 'password') {  // name이 'password'라면, setPassword 함수를 사용하여 password 상태 변수를 value로 업데이트
      setPassword(value)
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    // 이메일로 로그인
    emailSignIn(email, password);
  }

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
      <hr/>
      <h1 style={{textAlign: 'center', marginTop:'50px'}}>Log in</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />
          <input type="submit" value="로그인" />
        </form>
      </div>
      <p style={{textAlign: 'center'}}>또는</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', marginBottom: '50px'}}>
        <GoogleButton onClick={handleGoogleSignIn}/>
      </div>
    </div>
  );
};

export default Login;