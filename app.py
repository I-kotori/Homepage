import os
import mysql.connector
from flask import Flask, jsonify
from flask_cors import CORS  # CORS 임포트
from dotenv import load_dotenv

# .env 파일에서 환경 변수를 불러옵니다.
load_dotenv()

# Flask 앱 초기화
app = Flask(__name__)

# --- 중요 ---
# 웹페이지(브라우저)에서 이 API 서버로 요청을 보낼 수 있도록 CORS 설정을 해줍니다.
# "origins='*'"는 "모든 도메인에서 오는 요청을 허용한다"는 의미입니다.
CORS(app, resources={r"/api/*": {"origins": "*"}})


# DB 접속 정보를 .env 파일에서 불러옵니다.
db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}

def get_db_connection():
    """DB 연결을 생성하고 반환합니다."""
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to DB: {err}")
        return None

# --- API 엔드포인트: 무작위 단어 1개 가져오기 ---
@app.route('/api/random-word', methods=['GET'])
def get_random_word():
    """
    DB에서 무작위 단어 1개(영어, 뜻)를 조회하여 JSON으로 반환합니다.
    """
    conn = None
    cursor = None
    
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        
        # dictionary=True: 결과를 튜플이 아닌 딕셔너리(JSON과 유사) 형태로 받습니다.
        cursor = conn.cursor(dictionary=True) 
        
        # 우리가 만들었던 쿼리
        query = "SELECT english_word, meaning FROM words ORDER BY RAND() LIMIT 1"
        cursor.execute(query)
        
        word = cursor.fetchone() # 1개의 결과만 가져옵니다.
        
        if word:
            # { "english_word": "apple", "meaning": "사과" } 형태의 JSON 응답
            return jsonify(word)
        else:
            # DB에 단어가 하나도 없는 경우
            return jsonify({"error": "No words found in database"}), 404
            
    except mysql.connector.Error as err:
        # 쿼리 실행 중 에러 발생
        return jsonify({"error": f"Query failed: {err}"}), 500
    finally:
        # 모든 작업이 끝나면 커서와 연결을 반드시 닫아줍니다.
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# --- (선택) 맞춘 횟수 업데이트 API ---
# 나중에 게임 기능을 만들 때 필요할 API 예시입니다.
@app.route('/api/update-correct', methods=['POST'])
def update_correct_count():
    # 이 부분은 나중에 구현 (word_id를 받아서 correct_count를 1 증가시키는 등)
    # 예: UPDATE words SET correct_count = correct_count + 1 WHERE word_id = [ID]
    return jsonify({"message": "Update logic to be implemented"}), 501


# 이 파일을 직접 실행했을 때 Flask 서버가 구동됩니다.
if __name__ == '__main__':
    # host='0.0.0.0' : 라즈베리파이의 IP로 외부에서 접속할 수 있게 합니다.
    # debug=True : 개발 중 코드가 바뀌면 서버가 자동 재시작됩니다.
    app.run(host='0.0.0.0', port=5000, debug=True)
