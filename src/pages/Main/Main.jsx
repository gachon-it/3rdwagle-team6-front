import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import TopGallery from "./TopGallery";
import BottomGallery from "./BottomGallery";
import Weather from "./Weather";
import ChatModal from "./ChatModal";
import OutfitModal from "./OutfitModal"; // 추천 코디 모달 추가
import AddModal from "./AddModal"; // 📸 사진 추가 모달 추가

export default function Main() {
    const [showChatModal, setShowChatModal] = useState(false);
    const [showOutfitModal, setShowOutfitModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false); // 사진 추가 모달 상태 추가

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
                        <Link to={"/Main"} className='nav-btn'>
                            <div style={{ fontSize: "35px" }}>🏠</div>
                            <div>메인페이지</div>
                        </Link>
                        <button className="nav-btn" onClick={() => setShowChatModal(true)}>
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
                </div>
            </div>

            {/* 채팅 모달 */}
            {showChatModal && (
                <ChatModal 
                    onClose={() => setShowChatModal(false)}
                    onEndChat={() => {
                        setShowChatModal(false);  
                        setShowOutfitModal(true); 
                    }}
                />
            )}

            {/* 추천 코디 모달 */}
            {showOutfitModal && <OutfitModal onClose={() => setShowOutfitModal(false)} />}

            {/* 📸 사진 추가 모달 */}
            {showAddModal && <AddModal onClose={() => setShowAddModal(false)} />}

            {/* 📸 사진 추가 버튼 (우측 하단 고정) */}
            <button className="add-photo-btn" onClick={() => setShowAddModal(true)}>＋</button>
        </div>
    );
}
