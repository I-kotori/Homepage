import React, { useState, useEffect, useCallback } from 'react';
import "./wordgame.css";

const Wordgame = () => {
    // 1. 백엔드에서 받아온 단어를 저장할 상태
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState<string>(''); // [추가] 뜻을 저장할 상태
    // 2. 로딩 중이거나 오류 발생 시 메시지를 표시할 상태
    const [message, setMessage] = useState('API 서버에서 단어를 불러오는 중...');

    // 3. 백엔드 API를 호출하는 함수
    // useCallback을 사용하면 이 함수가 불필요하게 재생성되는 것을 방지합니다.
    const fetchWord = useCallback(async () => {
        setMessage('새 단어를 불러오는 중...');
        setWord(''); // 이전 단어 지우기
        setMeaning('');

        try {
            // Flask 서버가 5000번 포트에서 실행 중이라고 가정합니다.
            // app.py에서 설정한 '/api/get-word' 엔드포인트로 요청을 보냅니다.
            const response = await fetch('http://10.147.17.91:5000/api/random-word');
            
            if (!response.ok) {
                // 서버가 200 OK 응답이 아닌 경우 (예: 500 에러)
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // [수정] data.english_word와 data.meaning이 모두 있는지 확인
            if(data.english_word && data.meaning){
                // 4. 성공적으로 데이터를 받아오면 상태를 업데이트합니다.
                setWord(data.english_word);
                setMeaning(data.meaning); // [추가] 뜻 상태 업데이트
                setMessage(''); // 성공 메시지는 비웁니다.
            } else{
                // API가 200 OK는 보냈지만 유효한 데이터가 없는 경우
                setMessage(data.error || '유효한 단어 데이터를 받지 못했습니다.');
            }
        } catch (error) {
            // 5. 네트워크 오류 등 fetch 자체가 실패한 경우
            console.error("Fetch error:", error);
            setMessage('서버에 연결할 수 없습니다. app.py가 실행 중인지 확인하세요.');
        }
    }, []); // 이 함수는 의존성이 없으므로 빈 배열을 전달합니다.

    // 6. 컴포넌트가 처음 마운트될 때(표시될 때) 단어를 한 번 불러옵니다.
    useEffect(() => {
        fetchWord();
    }, [fetchWord]); // fetchWord가 변경될 때 (즉, 맨 처음에 한 번) 실행됩니다.

    return (
        <div className="wordgame-container">
            <h1>Word Game</h1>
            
            {/* 메시지 상태(message)나 단어 상태(word)에 따라 
              다른 내용을 보여줍니다.
            */}
            {message && <p>{message}</p>}
            
            {word && (
                <div className="word-display">
                    <p>단어:</p>
                    <h2>{word}</h2>
                    <p style={{marginTop: '15px'}}>뜻:</p>
                    <h3>{meaning}</h3>
                </div>
            )}

            {/* 7. 버튼을 클릭하면 fetchWord 함수를 다시 호출합니다. */}
            <button 
                onClick={fetchWord} 
                disabled={message.includes('불러오는 중...')}
                style={{marginTop: '20px', padding: '10px 15px', fontSize: '16px', cursor: 'pointer'}}
            >
                새 단어 가져오기
            </button>
        </div>
    );
}

export default Wordgame;