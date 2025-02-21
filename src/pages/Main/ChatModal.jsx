import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatModal.css";

function ChatModal({ onClose, onEndChat }) {
    const [messages, setMessages] = useState([
        { text: "안녕하세요! 패션 상담 챗봇입니다. 😊 무엇을 도와드릴까요?", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState("");
    const [showEndButton, setShowEndButton] = useState(false);
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

    const handleEndChat = () => {
        onEndChat(); // 채팅 종료 후 추천 코디 모달 띄우기
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
        </div>
    );
}

export default ChatModal;
