import React from "react";
const Post = ({ postObj }) => {
  return (
    <div>  {/* 게시물 정보 표시*/}
      <h4>{postObj.text}</h4>
      <h4>{postObj.createdAt}</h4>
      <h4>{postObj.creatorId}</h4>
      <hr/>
    </div>
  );
};
export default Post;