import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import OutfitModal from "./OutfitModal"; // OutfitModal 컴포넌트 임포트
import "./ChatModal.css";

function ChatModal({ onClose, onEndChat }) {
    const [messages, setMessages] = useState([
        { text: "안녕하세요! 패션 상담 챗봇입니다. 😊 무엇을 도와드릴까요?", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState("");
    const [showEndButton, setShowEndButton] = useState(false);
    const [recommendation, setRecommendation] = useState(null);  // 추천 정보 상태 추가
    const [isOutfitModalOpen, setIsOutfitModalOpen] = useState(false);  // OutfitModal 열기/닫기 상태
    const messagesEndRef = useRef(null);

    // ✅ 메시지 추가 후 스크롤 최하단 이동
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (messages.length >= 5) {
            setShowEndButton(true);
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        // ✅ 상태 업데이트를 prev 사용하여 최신 상태 유지
        setMessages(prev => [...prev, { text: inputText, sender: "user" }]);
        const userMessage = inputText; // input 값 백업
        setInputText("");

        try {
            const response = await axios.post("http://localhost:8080/ai/chats", {
                userId: 1, // TODO: 로그인된 사용자 ID로 변경 필요
                message: userMessage,
            });

            // ✅ API 응답을 받은 후에도 최신 상태 유지
            // 챗봇 응답 메시지 추가
            setMessages(prev => [
                ...prev,
                { text: response.data, sender: "bot" }  // 응답 받은 메시지 추가
            ]);
        } catch (error) {
            console.error("API 요청 중 오류 발생:", error);
            setMessages(prev => [
                ...prev,
                { text: "⚠️ 오류 발생! 다시 시도해 주세요.", sender: "bot" }
            ]);
        }
    };

    const handleEndChat = async () => {
        // 대화 종료 시 추천 API 호출
        try {
            const response = await axios.post("http://localhost:8080/ai/recommends/1");  // 실제 userId로 변경 필요
            setRecommendation(response.data);  // 추천 정보 상태 업데이트

            // 추천 정보를 메시지로 표시
            setMessages(prev => [
                ...prev,
                { text: `추천된 상의 색: ${response.data.topColor}`, sender: "bot" },
                { text: `추천된 하의 색: ${response.data.bottomColor}`, sender: "bot" }
            ]);

            // 추천 후 OutfitModal 열기
            setIsOutfitModalOpen(true);

        } catch (error) {
            console.error("추천 API 호출 중 오류 발생:", error);
            setMessages(prev => [
                ...prev,
                { text: "⚠️ 추천을 가져오는 중 오류 발생! 다시 시도해 주세요.", sender: "bot" }
            ]);
        }
    };

    const handleCloseOutfitModal = () => {
        setIsOutfitModalOpen(false); // OutfitModal 닫기
        onEndChat(); // 채팅 종료 후 실행
    };

    return (
        <div className="chat-modal-overlay" onClick={onClose}>
            <div className="chat-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="chat-header">
                    <h3>패션 상담 챗봇 💬</h3>
                    <button className="chat-close-btn" onClick={onClose}>✖</button>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {showEndButton && (
                    <button className="chat-end-btn" onClick={handleEndChat}>대화 종료</button>
                )}

                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>전송</button>
                </div>
            </div>

            {isOutfitModalOpen && recommendation && (
                <OutfitModal
                    onClose={handleCloseOutfitModal}
                    topColor={recommendation.topColor}
                    bottomColor={recommendation.bottomColor}
                />
            )}
        </div>
    );
}

export default ChatModal;
