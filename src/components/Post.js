import React from "react";
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
    <div>  {/* 게시물 정보 표시*/}
      <h4>{postObj.title}</h4>
      <h4>{postObj.text}</h4>
      <img src={postObj.downloadURL}
       alt="db image값" width="280" height="180"/>  {/* 이미지 표시 */}
      <h4>{(postObj.createdAt).toString()} | {postObj.creatorId}</h4>
      {isOwner && ( // 게시물 작성자만 삭제 버튼을 볼 수 있음
        <> 
          <button onClick={onDeleteClick}>삭제</button>
        </>
      )}
      <hr/>
    </div>
  );
};
export default Post;