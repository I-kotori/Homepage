import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ImageSlide from "./ImageSlide";
import MarkdownViewer from './MarkdownViewer';
import profileContent from './myProfile.md?raw';
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
  name: 'Taeyoon_Kim',
  imageUrl: [
    "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/hubble/releases/2020/01/STScI-01EVSV1Y8RASP72TXXP69D3979.tif?w=4291&h=4291&fit=crop&crop=faces%2Cfocalpoint",
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/Nebulosa_testa_di_cavallo_con_SPECULOOS.jpg", 
    "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FudG9yaW5pfGVufDB8fDB8fHww"
  ],
  imageSize: 480,
};
const butterflyjin77 = {

};

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % user.imageUrl.length);
    }, 5000); // 10초
    return () => {
      clearInterval(timer);
    };
  }, [user.imageUrl.length]);

  const handleClearClick = () => {
    setIsContentVisible(false);
  };
  
  return (
    <div className="page-context">
      <Navbar onClearClick={handleClearClick} />
      <ImageSlide src={user.imageUrl[currentImageIndex]} alt={"nein"}/>
      <main className="main-area">
        <aside className="left-side"></aside>
        <section 
          className="center-content"
          style={{ visibility: isContentVisible ? 'visible' : 'hidden' }}
          >
          <MarkdownViewer content={profileContent} />
        </section>
        <aside className="right-side"></aside>
      </main>
    </div>
  );
}