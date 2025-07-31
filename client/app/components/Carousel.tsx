import { useState, useEffect } from "react";

export default function Carousel() {
  const articles = [
    <div style={{ width: 100, height: 100, border: "5px solid black" }} key={0}>
      Sock 0
    </div>,
    <div style={{ width: 100, height: 100, border: "5px solid black" }} key={1}>
      Sock 1
    </div>,
    <div style={{ width: 100, height: 100, border: "5px solid black" }} key={2}>
      Sock 2
    </div>,
    <div style={{ width: 100, height: 100, border: "5px solid black" }} key={3}>
      Sock 3
    </div>,
    <div style={{ width: 100, height: 100, border: "5px solid black" }} key={4}>
      Sock 4
    </div>,
    <div style={{ width: 100, height: 100, border: "5px solid black" }} key={5}>
      Sock 5
    </div>,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex + visibleCount >= articles.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(articles.length - visibleCount);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleArticles = articles.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="flex gap-4 items-center">
        <button
          className="mr-16 transition-colors bg-white/80 hover:bg-white rounded-full h-10 w-10 flex items-center justify-center"
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left w-5 h-5"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>
        {visibleArticles}
        <button
          className="ml-16 transition-colors bg-white/80 hover:bg-white rounded-full h-10 w-10 flex items-center justify-center"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right w-5 h-5"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
