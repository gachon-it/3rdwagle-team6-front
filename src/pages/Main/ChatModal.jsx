import React, { useState, useEffect, useRef } from "react";
import "./ChatModal.css";

function ChatModal({ onClose }) {
    const [messages, setMessages] = useState([
        { text: "안녕하세요! 패션 상담 챗봇입니다. 😊 무엇을 도와드릴까요?", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null); // 스크롤을 위한 ref 추가

    // 새로운 메시지가 추가될 때, 채팅창을 자동으로 스크롤 최하단으로 이동
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const newMessages = [...messages, { text: inputText, sender: "user" }];
        setMessages(newMessages);
        setInputText("");

        // 간단한 챗봇 응답 추가 (1초 후 자동 응답)
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "좋은 질문이에요! 더 구체적으로 말씀해 주세요. 😊", sender: "bot" }]);
        }, 1000);
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
                    <div ref={messagesEndRef} /> {/* 스크롤을 위한 요소 */}
                </div>
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
