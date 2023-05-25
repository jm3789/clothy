import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { onSnapshot, collection, orderBy, query } from "firebase/firestore"
import { Container, Row, Col } from 'react-bootstrap';
import Post from '../components/Post';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const { user } = UserAuth();
    const navigate = useNavigate();

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

    const [clothes1Value, setClothes1Value] = useState("");
    const [clothes2Value, setClothes2Value] = useState("");

    const [filteredPosts, setFilteredPosts] = useState([]);

    const onSearch = async (event) => {  // 검색 버튼을 누를 시
        event.preventDefault();

        if (clothes1Value === "" || clothes2Value === "") {
            alert("옷의 종류를 선택해주세요.");
            return;
        }
        // filteredPosts: posts의 데이터 중 종류선택1 value값 및 종류선택2 value값이 사용자가 선택한 값과 모두 일치하는 데이터만 필터링
        setFilteredPosts(posts.filter((post) => 
            post.clothes1 === clothes1Value && post.clothes2 === clothes2Value));

        // "~의 ~로 검색한 결과입니다" string을 id가 'searchNotice'인 document에 append
        
        const notice = document.getElementById('searchNotice');
        const resultMessage = document.createTextNode(`'${clothes1Value}'의 '${clothes2Value}'(으)로 검색한 결과입니다.`);
        if (notice.lastChild != null) {
            notice.removeChild(notice.lastChild);
          }
        notice.appendChild(resultMessage);

        return;
    }

    const onTag1Change = (event) => {
        const { value } = event.target;
        setClothes1Value(value);
        setClothes2Value("");  // 종류선택2값 초기화
    };
    
    const onTag2Change = (event) => {
        const { value } = event.target;
        setClothes2Value(value);
    };

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
            <div>
            <h2 style={{textAlign: 'left', marginLeft:'50px'}}>Search</h2>
            <p style={{textAlign: 'left', marginLeft:'50px'}}>검색 페이지입니다.</p>
            </div>
            <hr/>
            <div>
                <span style={{textAlign: 'left', marginLeft:'50px'}}/>종류선택1
                <span style={{textAlign: 'left', marginLeft:'80px'}}/>종류선택2{": "+ clothes1Value}
                <br/>
                <select id="clothes1" onChange={onTag1Change} style={{marginTop:'10px', marginLeft:'50px'}}>
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

                <select id="clothes2" onChange={onTag2Change} style={{marginTop:'10px', marginLeft:'30px'}}>
                    <option value="">선택하세요</option>
                </select>
            </div>
                
            <div>
                <h5 style={{textAlign: 'left', marginLeft:'50px'}}>'{clothes1Value}'의 '{clothes2Value}'(으)로 선택하셨습니다.</h5>
                <button onClick={onSearch} style={{float:'left', marginLeft:'50px'}}>검색</button>
            </div>
        
            <div>
                <button onClick={() => navigate('/')} style={{ float: 'left', marginLeft: '20px' }}>뒤로</button>
            </div>
            <br/>
            <hr/>
            <div id="searchNotice" style={{textAlign: 'left', marginLeft:'50px'}}></div>
            <div id="postList" style={{ display: 'flex', marginLeft: '50px', marginBottom: '50px'}}>
                <Container fluid>
                    <Row xs={2} sm={4}  md={6} lg={8} xl={10} xxl={12} className="g-4" style={{ gap: '1rem' }}>
                        {filteredPosts.map((post) => (
                        <Col margin="5px">
                            <Post
                                key={post.id}
                                postObj={post}
                                isOwner={post.creatorId === user?.displayName} // boolean 값: 게시물 작성자만 삭제 버튼을 볼 수 있음
                            />
                        </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Search;