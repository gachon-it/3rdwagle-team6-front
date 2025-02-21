import "./Main.css";
import TopGallery from "./TopGallery";
import BottomGallery from "./BottomGallery";
import ChatModal from "./ChatModal";
import Weather from "./Weather";
import { useState } from "react";
import { Link } from "react-router-dom";
 // 채팅 모달 컴포넌트 추가

export default function Main() {
    const [isChatOpen, setIsChatOpen] = useState(false); // 채팅 모달 상태

    const handleAddPhoto = () => {
        alert("사진 추가 기능 구현 예정!");
    };

    const handleOpenChat = () => {
        setIsChatOpen(true);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    return (
        <div className="total-main-wrap">
            <div className="total-main-content-wrap">
                
                {/* 상단 로고 */}
                <div style={{ backgroundColor: "#F1ECEA", width: "100%", height: "40px" }}>
                    <div className="main-logo-design">outfitmate</div>
                </div>

                <div className="below-content-wrap">
                    <div className="clothes-weather-wrap">
                        <TopGallery />
                        <Weather />
                    </div>

                    {/* 네비게이터 (좌측 고정) */}
                    <div className="fixed-navigator">
                        <Link to={"/Message"} className='nav-btn'>
                            <div style={{ fontSize: "35px" }}>🏠</div>
                            <div>메인페이지</div>
                        </Link>
                        <button className="nav-btn" onClick={handleOpenChat}>
                            <div style={{ fontSize: "35px" }}>💭</div>
                            <div>패션상담</div>
                        </button>
                        <Link to={"/Search"} className='nav-btn'>
                            <div style={{ fontSize: "35px" }}>📂</div>
                            <div>카테고리</div>
                        </Link>
                    </div>

                    <div className="total-bottom-gallery-wrap">
                        <BottomGallery />
                    </div>

                    {/* 사진 추가 버튼 (우측 하단) */}
                    <button className="add-photo-btn" onClick={handleAddPhoto}>＋</button>
                </div>
            </div>

            {/* 채팅 모달 창 */}
            {isChatOpen && <ChatModal onClose={handleCloseChat} />}
        </div>
    );
}
