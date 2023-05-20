import React, { useState } from "react";
import { db } from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import Card from 'react-bootstrap/Card';

const Post = ({ postObj, isOwner }) => {

  const [showFullText, setShowFullText] = useState(false);

  const onDeleteClick = async () => {  // 삭제 버튼을 누를 시
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      await deleteDoc(doc(db, "posts", postObj.id));
      await deleteObject(ref(storage, postObj.downloadURL));
    }
  };

  const handleShowFullText = () => {
    if (!showFullText) {setShowFullText(true)}
    else {setShowFullText(false)}
  };
 

  return (
    <div>  {/* 게시물 정보 표시: Card 사용*/}
      <Card style={{ display: "flex", alignItems: "stretch", width: "100%", height: "100%"}}>
        <Card.Img variant="top" src={postObj.downloadURL} alt="db image값" width="250" height="250" style={{marginTop:"50px"}}/> {/* 이미지 표시 */}
        <Card.Body>
          <Card.Title>{postObj.title}</Card.Title>
          <Card.Text>
          <p className="overflow-text" 
            style={{ whitespace: "nowrap", overflow: "hidden", textoverflow: "ellipsis" }}>
              {showFullText ? postObj.text : postObj.text.slice(0, 20)} 
              {postObj.text.length > 20 && ( // 텍스트 길이가 일정 이상인 경우에만 ...과 더보기 링크를 추가합니다.
              <span className="read-more-link" style={{ color: "blue", cursor: "pointer" }} onClick={handleShowFullText}>{showFullText ? "닫기" : "...모두 표시"}</span>
            )}<br />#{postObj.clothes1} #{postObj.clothes2}
          </p>
          <p>{postObj.creatorId} | {(postObj.createdAt).toString()}</p> 
          </Card.Text>
        </Card.Body>
      </Card>
      {isOwner && ( // 게시물 작성자만 삭제 버튼을 볼 수 있음
        <> 
          <button onClick={onDeleteClick}>삭제</button>
        </>
      )}
    </div>
  );
};
export default Post;