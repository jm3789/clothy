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
        // query를 사용해 firestore의 posts 컬렉션을 가져오고, createdMilli 필드를 기준으로 내림차순으로 정렬
        const q = query(collection(db, "posts"), orderBy("createdMilli", "desc"));
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
                <p style={{textAlign: 'right', marginRight:'50px'}}>현재 로그인되지 않은 상태입니다.</p>
                <div style={{ width: '100%', textAlign: 'right' }}>
                    <button style={{ marginLeft: 'auto', marginRight: '50px' }}>
                        <Link to="/Login" style={{ textDecoration: 'none', color: 'black' }}>로그인</Link>
                    </button>
                </div>
                <hr/>
                <button style={{float:'left', marginLeft:'50px'}}><Link to="/Search" style={{textDecoration: 'none', color: 'black'}}>태그로 검색</Link></button>
                <br/>
                
                <div class="container" id="postList">
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
                <p style={{textAlign: 'right', marginLeft:'auto', marginRight:'50px'}}>안녕하세요, {user?.displayName}님!&#128512;</p>
                <hr/>
                <div>
                <button style={{float:'left', marginLeft:'50px'}}><Link to="/Search" style={{textDecoration: 'none', color: 'black'}}>태그로 검색</Link></button>
                <button style={{float:'left', marginLeft:'20px'}}><Link to="/Form" style={{textDecoration: 'none', color: 'black'}}>글쓰기</Link></button>
                </div>
                {/* 한 줄에 항목 3개씩 들어가도록 grid 시도: 실패*/}
                <div class="container" id="postList">
                    {posts.map((post, index) => (
                        <>
                            {(index % 3 === 0) && <div class="row"></div>}  {/* <div class="row">만 들어가야...*/}
                            <Post
                            key={post.id}
                            postObj={post}         
                            isOwner={post.creatorId === user?.displayName}
                            />
                            {(index % 3 === 2) && <div class="row"></div>}  {/* </div>만 들어가야...*/}
                        </>
                    ))}
                </div>
            </div>
            
        );
    }
};

export default Home;