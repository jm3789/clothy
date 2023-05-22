import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const onEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    };
    const onPasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
    };
    const onNicknameChange = (event) => {
        const { value } = event.target;
        setNickname(value);
    }


    const onSubmit = async (event) => {
        event.preventDefault();
    
        if (email === "" || password === "" || nickname === "") {
          alert("정보를 모두 입력해주세요.");
          return;
        }

        // 유저 생성
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            
            await updateProfile(user, {
              displayName: nickname
            });
        
            alert("회원가입이 완료되었습니다.");
            navigate('/login')
          } catch (error) {
            if (error.code === "auth/invalid-email") {
                alert("이메일 형식에 맞게 작성해주세요.");
              } else if (error.code === "auth/email-already-in-use") {
                alert("이미 사용중인 이메일입니다.");
              } else {
                console.error(error);
              }
          }
    };

    return (
        <>
            <hr/>
            <h1 style={{textAlign: 'center', marginTop:'50px'}}>회원가입</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={onEmailChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={onPasswordChange}
                        required
                    />
                    <input
                        name="nickname"
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={onNicknameChange}
                        required
                    />
                    <br/>
                    <input type="submit" value="회원가입" />
                    <br/>
                    <button onClick={() => navigate('/login')}>뒤로</button>
                </form>
            </div>
            <br />
            
        </>
    )
};

export default SignUp;