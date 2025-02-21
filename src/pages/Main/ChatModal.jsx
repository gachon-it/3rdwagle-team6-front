import React, { useState, useEffect, useRef } from "react";
import "./ChatModal.css";

function ChatModal({ onClose, onEndChat }) {  // `onEndChat` 추가
    const [messages, setMessages] = useState([
        { text: "안녕하세요! 패션 상담 챗봇입니다. 😊 무엇을 도와드릴까요?", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState("");
    const [showEndButton, setShowEndButton] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        console.log("메시지 개수:", messages.length);
        if (messages.length >= 5) {
            setShowEndButton(true);
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        const newMessages = [...messages, { text: inputText, sender: "user" }];
        setMessages(newMessages);
        setInputText("");

        setTimeout(() => {
            setMessages(prev => [...prev, { text: "좋은 질문이에요! 더 구체적으로 말씀해 주세요. 😊", sender: "bot" }]);
        }, 1000);
    };

    const handleEndChat = () => {
        onEndChat(); // 부모 컴포넌트(Main)에서 채팅 모달을 닫고 추천 코디 모달을 띄우는 로직 실행
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
                    />
                    <button onClick={handleSendMessage}>전송</button>
                </div>
            </div>
        </div>
    );
}

export default ChatModal;
