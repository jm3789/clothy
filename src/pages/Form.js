import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { addDoc, collection } from "firebase/firestore";
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const Form = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
      if (user == null) { // 사용자가 로그인되어있지 않으면
      alert("로그인 후 이용 가능합니다.");
      navigate('/login');  // 자동으로 로그인 페이지로 이동
      }
  }, [user]);

  // 폼의 여러 부분을 구분해서 입력을 받을 것임
  const [post, setPost] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");


  
  const onSubmit = async (event) => {
    event.preventDefault();
    
    // firebase storage에 이미지 저장
    var file = document.querySelector('#image').files[0];
    // storage 참조 생성
    var now = new Date();
    var nowMilli = now.getTime()
    const storageRef = ref(storage, `image/${nowMilli}`);
    await uploadBytes(storageRef, file);  // 파일 업로드
    // 업로드된 파일의 다운로드 URL 가져와서 반환
    const downloadURL = await getDownloadURL(storageRef);

    // firestore에 저장
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours()
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedDate 
    = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    await addDoc(collection(db, "posts"), 
    { title: titleValue, text: textValue, downloadURL: downloadURL,
      createdAt: formattedDate,
      creatorId: user?.displayName });
      setPost("");

    

    alert("등록되었습니다!")
    navigate('/');
    return downloadURL;
  };

  
  

  const onTitleChange = (event) => {
    const { value } = event.target;
    setTitleValue(value);
  };
  const onTextChange = (event) => {
    const { value } = event.target;
    setTextValue(value);
  };

  const loadFile = (event) => {
    var file = event.target.files[0];	// 선택된 파일 가져오기

    // div id를 이용해 이미지명 출력
    var name = document.getElementById('fileName');
    name.textContent = file.name;

    // 이미지 source 가져오기
  	const newImage = document.createElement("img");
    const imageURL = window.URL.createObjectURL(file)
    newImage.setAttribute("src", imageURL);
    newImage.setAttribute("class", "img");

    newImage.style.width = "70%";
    newImage.style.height = "70%";
    newImage.style.objectFit = "contain";

    //이미지가 form에서 보이도록 image-show div에 추가
    var container = document.getElementById('image-show');
    while (container.firstChild) {  // image-show div에 이미 이미지가 있으면 제거
      container.removeChild(container.firstChild);
    }
    container.appendChild(newImage);
  };

  return (
    <div>
      <h1>Post</h1>
      <div>
        <p>게시글 작성 페이지입니다.</p>
        <p>작성자: {user?.displayName}님</p>
      </div>

      <div>
          <input
            value={titleValue}
            onChange={onTitleChange}
            type="text"
            placeholder="제목을 입력하세요"
            maxLength={120}
          />
          <input
            value={textValue}
            onChange={onTextChange}
            type="text"
            placeholder="내용을 입력하세요"
            maxLength={120}
          />
          <form method="post" enctype="multipart/form-data">
            <input 
              type="file" 
              id="image" 
              accept="image/*" 
              onChange={loadFile} />
          </form>
          <div>
            <p>FILE NAME: </p>
            <p id="fileName"></p>
          </div>
          <div id="image-show"></div>
          
          <button onClick={onSubmit}>등록</button>

        </div>
      <div>
      <Link to="/">뒤로</Link>
      </div>
    </div>
  );

};

export default Form;