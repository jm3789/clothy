import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { onSnapshot, collection, orderBy, query } from "firebase/firestore"
import Post from '../components/Post';

const Home = () => {
    const { user } = UserAuth();

    const [posts, setPosts] = useState([]);

    useEffect(() => {  
        // query를 사용해 firestore의 posts 컬렉션을 가져오고, createdAt 필드를 기준으로 내림차순으로 정렬
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        // q 쿼리에 대한 실시간 업데이트 구독
        const unsubscribe = onSnapshot(q, (snapshot) => {
        // 문서 데이터를 객체 배열로 변환
        const postArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(postArray);
        });
        // 컴포넌트가 unmount될 때 Firestore 구독을 해제
        return unsubscribe;
    }, []);

    if (user == null) {  // 로그인되어있지 않음
        return (
            <div>
                <div>
                <h1>Home</h1>
                <p>가장 먼저 보여지는 페이지입니다. 현재 로그인되지 않은 상태입니다.</p>
                </div>
                <div>
                <Link to="/Login">로그인</Link>
                </div>
                <div>
                    <hr/>
                    {posts.map((post) => (
                    <Post
                        key={post.id}
                        postObj={post}         
                        isOwner={post.creatorId === user?.displayName} // boolean 값: 게시물 작성자만 삭제 버튼을 볼 수 있음
                    />
                    ))}
                </div>
            </div>
        );
    } else {  // 로그인되어 있음
        return (
            <div>
                <div>
                    <h1>Home</h1>
                    <p>가장 먼저 보여지는 페이지입니다. 안녕하세요, {user?.displayName}님!</p>
                </div>
                <div>
                    <Link to="/Form">글쓰기</Link>
                </div>
                <div>
                    <hr/>
                    {posts.map((post) => (
                    <Post
                        key={post.id}
                        postObj={post}         
                        isOwner={post.creatorId === user?.displayName} // boolean 값: 게시물 작성자만 삭제 버튼을 볼 수 있음
                    />
                    ))}
                </div>
            </div>
            
        );
    }
};

export default Home;