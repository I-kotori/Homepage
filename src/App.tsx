import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ImageSlide from "./ImageSlide";
import MarkdownViewer from './MarkdownViewer'; // ⬅️ 이 파일이 src에 있는지 확인
import profileContent from './myProfile.md?raw'; // ⬅️ 이 파일도 src에 있는지 확인
import "./Navbar.css"
import "./ImageSlide.css"
import "./context.css"
interface User {
  age: number;
  name: string;
  imageUrl: string[];
  imageSize: number;
}
const user: User = {
  age: 1557,
  name: 'Hanbyul, the Disaster of Codeforce',
  imageUrl: [
    "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/hubble/releases/2020/01/STScI-01EVSV1Y8RASP72TXXP69D3979.tif?w=4291&h=4291&fit=crop&crop=faces%2Cfocalpoint",
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/Nebulosa_testa_di_cavallo_con_SPECULOOS.jpg", 
    "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FudG9yaW5pfGVufDB8fDB8fHww"
  ],
  imageSize: 480,
};
const butterflyjin77 = {
  age: 25,
  name: 'Taeyoon_Kim',
  blogURL : 'https://blog.naver.com/butterflyjin77'
};

export default function Profile() {
  // 1. 현재 보여줄 이미지의 인덱스(순서)를 기억할 상태 변수를 만듭니다. (초기값: 0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. 타이머와 같은 부수 효과(Side Effect)를 처리하기 위해 useEffect를 사용합니다.
  useEffect(() => {
    // 3. 10초(10000ms)마다 코드를 실행하는 타이머를 설정합니다.
    const timer = setInterval(() => {
      // 다음 이미지 인덱스를 계산합니다.
      // (현재 인덱스 + 1)을 전체 이미지 개수로 나눈 나머지를 사용하면 배열의 끝에서 다시 처음으로 돌아갑니다.
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % user.imageUrl.length);
    }, 5000); // 10초

    // 4. 중요: 컴포넌트가 사라질 때 타이머를 정리(clean up)합니다.
    //    이렇게 하지 않으면 메모리 누수가 발생할 수 있습니다.
    return () => {
      clearInterval(timer);
    };
    // user.imageUrl.length가 바뀔 때마다 이 효과를 다시 실행하도록 설정합니다.
  }, [user.imageUrl.length]);
  return (
    <div className="page-context">
      <Navbar />
      <ImageSlide src={user.imageUrl[currentImageIndex]} alt={"nein"}/>
      <main className="main-area">
        <aside className="left-side"></aside>
        <section className="center-content">
          {/*
          <h1>{butterflyjin77.name}</h1>
          <h2>{user.age}</h2>
          <img
            className="avatar"
            src={user.imageUrl}
            alt={'Photo of ' + user.name}
            style={{
              width: user.imageSize,
              height: user.imageSize
            }}
          />
          <p>{butterflyjin77.name}</p>
          <p>{butterflyjin77.blogURL}</p>
          <a href="https://www.acmicpc.net/">boj.kr</a>
          <p></p>
          <a href="https://solved.ac">solved.ac</a>
          */}
          <MarkdownViewer content={profileContent} />
        </section>
        <aside className="right-side"></aside>
      </main>
    </div>
  );
}