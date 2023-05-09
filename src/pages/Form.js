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
  const [clothes1Value, setClothes1Value] = useState("");
  const [clothes2Value, setClothes2Value] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (clothes1Value === "" || clothes2Value === "") {
      alert("옷의 종류를 선택해주세요.");
      return;
    }
    
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
      clothes1: clothes1Value, clothes2: clothes2Value,
      createdAt: formattedDate, creatorId: user?.displayName });

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

    newImage.style.width = "25%";
    newImage.style.height = "25%";
    newImage.style.objectFit = "contain";

    // 이미지가 form에서 보이도록 image-show div에 추가
    var container = document.getElementById('image-show');
    while (container.firstChild) {  // image-show div에 이미 이미지가 있으면 제거
      container.removeChild(container.firstChild);
    }
    container.appendChild(newImage);
  };

  const onTag1Change = (event) => {
    const { value } = event.target;
    setClothes1Value(value);
    setClothes2Value("");  // 종류선택2값 초기화
  };

  const onTag2Change = (event) => {
    const { value } = event.target;
    setClothes2Value(value);
  }

  const clothes = {
    "아우터":["자켓", "코트", "점퍼", "패딩", "무스탕/퍼", "가디건", "야상", "기타"], 
    "상의":["티셔츠", "셔츠/남방", "블라우스", "니트/스웨터", "후드", "맨투맨", "나시/민소매", "기타"], 
    "바지":["청바지", "슬랙스", "면바지", "반바지", "트레이닝/조거", "기타"], 
    "원피스":["미니", "미디", "롱", "투피스", "기타"], 
    "스커트":["미니", "미디", "롱", "기타"], 
    "신발":["플랫/로퍼", "샌들/슬리퍼", "힐", "스니커즈", "부츠/워커", "기타"],
    "가방":["크로스백", "토트백", "숄더백", "에코백", "클러치", "백팩", "지갑", "파우치", "기타"],
    "기타":["쥬얼리", "양말", "모자", "스카프", "언더웨어", "장갑", "기타"]
  };
  
  if (clothes1Value) {  // 고른 종류선택1 값이 존재하는 경우

    const select = document.getElementById('clothes2');  // 종류선택2 document를 select에 가져옴
    
    // select에 "선택하세요"만 남기고 비움
    while (select.firstChild !== select.lastChild) {  
      select.removeChild(select.lastChild);
    }

    // 고른 종류선택1 값이 "선택하세요"가 아닐 때에만 진행
    if (clothes1Value !== "선택하세요") {
      clothes[clothes1Value].forEach(item => {  // 종류선택1의 세부항목들을
        const option = document.createElement('option');
        option.value = item;
        option.text = item;
        select.appendChild(option); // select에 추가
      });
    }
    
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
        <p>FILE NAME: </p>
        <p id="fileName"></p>

        <div id="image-show" width="280" height="180"></div>

        <div>
          <h4>종류선택1</h4>
          <select id="clothes1" onChange={onTag1Change}>
            <option value="">선택하세요</option>
            <option value="아우터">아우터</option>
            <option value="상의">상의</option>
            <option value="바지">바지</option>
            <option value="원피스">원피스</option>
            <option value="스커트">스커트</option>
            <option value="신발">신발</option>
            <option value="가방">가방</option>
            <option value="기타">기타</option>
          </select>    
          <h4>종류선택2{": "+ clothes1Value}</h4>
          <select id="clothes2" onChange={onTag2Change} multiple>
            <option value="">선택하세요</option>
          </select>
        </div>
        
        <h4>'{clothes1Value}'의 '{clothes2Value}'(으)로 선택하셨습니다.</h4>
        <button onClick={onSubmit}>등록</button>

      </div>

      <div>
      <Link to="/">뒤로</Link>
      </div>

    </div>
  );

};

export default Form;