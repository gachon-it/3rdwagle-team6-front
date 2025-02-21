import React, { useEffect, useRef, useState } from "react";
import "./Main.css";

const images = [
    "../assets/1.jpg",
    "../assets/2.png",
    "../assets/3.jpg",
    "../assets/4.png",
    "../assets/5.jpg",
];

function TopGallery() {
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // 앞뒤에 가짜 이미지 추가 (무한 루프 효과)
    const infiniteImages = [images[images.length - 1], ...images, images[0]];

    // 초기 로딩 시 첫 번째 실제 슬라이드로 이동
    useEffect(() => {
        if (sliderRef.current) {
            const slider = sliderRef.current;
            const slideWidth = slider.offsetWidth;
            slider.scrollLeft = slideWidth; // 클론된 첫 번째 이미지(진짜 마지막)에서 시작
        }
    }, []);

    // 슬라이드 이동 함수
    const slide = (direction) => {
        if (!sliderRef.current || isTransitioning) return;

        const slider = sliderRef.current;
        const slideWidth = slider.offsetWidth;
        setIsTransitioning(true);

        if (direction === "next") {
            slider.scrollBy({ left: slideWidth, behavior: "smooth" });
        } else {
            slider.scrollBy({ left: -slideWidth, behavior: "smooth" });
        }

        setTimeout(() => {
            setIsTransitioning(false);
        }, 600);

        setIsPaused(true);
        resumeAutoSlide();
    };

    // 무한 루프: 끝에 도달하면 순간이동
    const handleScroll = () => {
        if (!sliderRef.current) return;

        const slider = sliderRef.current;
        const slideWidth = slider.offsetWidth;

        if (slider.scrollLeft >= slideWidth * (infiniteImages.length - 1)) {
            slider.style.scrollBehavior = "auto"; // 애니메이션 없이 이동
            slider.scrollLeft = slideWidth;
            slider.style.scrollBehavior = "smooth"; // 다시 부드러운 이동 활성화
        } 
        if (slider.scrollLeft <= 0) {
            slider.style.scrollBehavior = "auto";
            slider.scrollLeft = slideWidth * (infiniteImages.length - 2);
            slider.style.scrollBehavior = "smooth";
        }
    };

    // 자동 슬라이드 기능
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            slide("next");
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // 5초 후 자동 슬라이드 다시 시작
    const resumeAutoSlide = () => {
        setTimeout(() => {
            setIsPaused(false);
        }, 5000);
    };

    return (
        <div className="gallery-wrap">
            <ul className="gallery-slider" ref={sliderRef} onScroll={handleScroll}>
                {infiniteImages.map((src, index) => (
                    <li key={index} className="gallery-item">
                        <img src={src} alt={`Slide ${index}`} />
                    </li>
                ))}
            </ul>
            <button className="prev-btn" onClick={() => slide("prev")}>❮</button>
            <button className="next-btn" onClick={() => slide("next")}>❯</button>
        </div>
    );
}

export default TopGallery;
