import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const emailSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        console.error(error);
        alert("로그인 중에 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    }
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
  };

  const logOut = () => {
      signOut(auth);
  }

  useEffect(() => {  // Firebase 인증 상태의 변경을 구독
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, emailSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {  // 로그인&로그아웃 함수와 현재 로그인된 사용자의 정보를 리턴
  return useContext(AuthContext);
};