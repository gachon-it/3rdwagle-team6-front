import React, { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import "./OutfitModal.css";

function OutfitModal({ onClose, topColor, bottomColor }) {
    const [loading, setLoading] = useState(true);
    const [outfit, setOutfit] = useState({ top: "", bottom: "" });

    useEffect(() => {
        // API 요청 시뮬레이션 (2초 후 응답 받음)
        setTimeout(() => {
            // 실제 topColor와 bottomColor에 맞는 이미지 경로를 지정
            setOutfit({
                top: `${topColor}`,  // 실제 API 응답 이미지 경로
                bottom: `${bottomColor}` // 실제 API 응답 이미지 경로
            });
            setLoading(false);
        }, 2000);
    }, [topColor, bottomColor]);

    return (
        <div className="outfit-modal-overlay" onClick={onClose}>
            <div className="outfit-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>추천 코디</h2>
                {loading ? (
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <p className="loading-text">👕 코디를 추천 중입니다... 잠시만 기다려 주세요! 👖</p>
                        <FadeLoader />
                    </div>
                ) : (
                    <div className="outfit-images">
                        <div className="outfit-item">
                            <p>상의 : {outfit.top}</p>
                        </div>
                        <div className="outfit-item">
                            <p>하의 : {outfit.bottom}</p>
                        </div>
                    </div>
                )}
                <button className="close-btn" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

export default OutfitModal;
