import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { onSnapshot, collection, orderBy, query } from "firebase/firestore"
import { Container, Row, Col } from 'react-bootstrap';
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
                <Container fluid>
                    <Row xs={2} sm={4}  md={6} lg={8} xl={10} xxl={12} className="g-4" style={{ gap: '1rem' }}>
                        {posts.map((post, index) => (
                        <Col margin="5px">
                            <Post
                            postObj={post}
                            isOwner={post.creatorId === user?.displayName}
                            />
                        </Col>
                        ))}
                    </Row>
                </Container>
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
                <Container fluid>
                    <Row xs={2} sm={4}  md={6} lg={8} xl={10} xxl={12} className="g-4" style={{ gap: '1rem' }}>
                        {posts.map((post, index) => (
                        <Col margin="5px">
                            <Post
                            postObj={post}
                            isOwner={post.creatorId === user?.displayName}
                            />
                        </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            
        );
    }
};

export default Home;