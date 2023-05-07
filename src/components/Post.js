import React from "react";
import { db } from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";

const Post = ({ postObj, isOwner }) => {
  const onDeleteClick = async () => {  // 삭제 버튼을 누를 시
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      await deleteDoc(doc(db, "posts", postObj.id));
    }
  };
  return (
    <div>  {/* 게시물 정보 표시*/}
      <h4>{postObj.text}</h4>
      <h4>{postObj.createdAt}</h4>
      <h4>{postObj.creatorId}</h4>
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