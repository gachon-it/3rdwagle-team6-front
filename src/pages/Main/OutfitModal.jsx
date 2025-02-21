import React, { useEffect, useState } from "react";
import {FadeLoader} from 'react-spinners';
import "./OutfitModal.css";

function OutfitModal({ onClose }) {
    const [loading, setLoading] = useState(true);
    const [outfit, setOutfit] = useState({ top: "", bottom: "" });

    useEffect(() => {
        // API 요청 시뮬레이션 (2초 후 응답 받음)
        setTimeout(() => {
            setOutfit({
                top: "../assets/1.jpg", // 실제 API 응답 이미지 경로
                bottom: "../assets/8.png" // 실제 API 응답 이미지 경로
            });
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="outfit-modal-overlay" onClick={onClose}>
            <div className="outfit-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>추천 코디</h2>
                {loading ? (
                    <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <p className="loading-text">👕 코디를 추천 중입니다... 잠시만 기다려 주세요! 👖</p>
                        <FadeLoader  />
                    </div>
                    
                ) : (
                    <div className="outfit-images">
                        <div className="outfit-item">
                            <img src={outfit.top} alt="상의" />
                        </div>
                        <div className="outfit-item">
                            <img src={outfit.bottom} alt="하의" />
                        </div>
                    </div>
                )}
                <button className="close-btn" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

export default OutfitModal;
