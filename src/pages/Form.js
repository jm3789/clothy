import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { addDoc, collection } from "firebase/firestore"

const Form = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
      if (user == null) { // 사용자가 로그인되어있지 않으면
      alert("로그인 후 이용 가능합니다.");
      navigate('/login');  // 자동으로 로그인 페이지로 이동
      }
  }, [user]);

  const [post, setPost] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();

    // 현재 시각 구하기
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day;
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    var timeString = hours + ':' + minutes  + ':' + seconds;

    await addDoc(collection(db, "posts"), 
    { text: post, createdAt: dateString + " " + timeString, creatorId: user?.displayName });
    setPost("");
    alert("등록되었습니다!")
    navigate('/');
  };
  const onChange = (event) => {
      const {
      target: { value },
      } = event;
      setPost(value);
  };

  return (
    <div>
      <h1>Post</h1>
      <div>
        <p>게시글 작성 페이지입니다.</p>
        <p>작성자: {user?.displayName}님</p>
      </div>
      <div>
        {/*글을 작성하기 위한 폼*/}
        <form onSubmit={onSubmit}>
        <input
        value={post}
        onChange={onChange}
        type="text"
        placeholder="게시글을 입력하세요"
        maxLength={120}
        />
        <input type="submit" value="등록" />
        </form>
      </div>
      <div>
      <Link to="/">뒤로</Link>
      </div>
    </div>
  );

};

export default Form;