import React from "react";
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

const Post = ({ postObj, isOwner }) => {

  const onDeleteClick = async () => {  // 삭제 버튼을 누를 시
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      await deleteDoc(doc(db, "posts", postObj.id));
      await deleteObject(ref(storage, postObj.downloadURL));
    }
  };


  return (
    <div class="nine.columns" style={{textAlign: 'right', marginRight: '50px'}}>  {/* 게시물 정보 표시*/}
      <img src={postObj.downloadURL}
      alt="db image값" width="250" height="250" style={{marginTop:"50px"}}/>  {/* 이미지 표시 */}
      <h5>{postObj.title}</h5>
      <p  style={{lineHeight:"0.2"}}>{postObj.text} #{postObj.clothes1} #{postObj.clothes2}</p>
      <p>{postObj.creatorId} | {(postObj.createdAt).toString()}</p> 
      {isOwner && ( // 게시물 작성자만 삭제 버튼을 볼 수 있음
        <> 
          <button onClick={onDeleteClick}>삭제</button>
        </>
      )}
    </div>
  );
};
export default Post;