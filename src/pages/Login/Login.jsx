import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function InputHolder({ placeholder, type, value, onChange }) {
  return (
    <div className="login-input-wrap">
      <input
        className={`login-input ${value ? "filled" : ""}`} // 값이 있으면 filled 클래스 추가
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  // 로그인 요청 함수
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // 로그인 성공 시, 토큰 저장
        localStorage.setItem("token", data.token); // 서버 응답에 토큰이 포함된다고 가정
        navigate("/Main"); // 메인 페이지로 이동
      } else {
        setErrorMessage(data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      setErrorMessage("서버 오류가 발생했습니다.");
    }
  };

  // Enter 키 입력 시 로그인 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-total-wrap">
      <div className="login-total-contents-wrap">
        <div className="icon-login-input-wrap">
          <h1 className="logo-design">OutfitMate</h1>
          <form className="login-form-wrap" onSubmit={(e) => e.preventDefault()}>
            <InputHolder
              placeholder="이메일"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputHolder
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 에러 메시지 출력 */}

            <button type="button" className="login-button" onClick={handleLogin}>
              로그인
            </button>
          </form>
        </div>

        {/* 가입하기 */}
        <div className="login-sign-up-wrap">
          <p>계정이 없으신가요?</p>
          <Link to="/signup">가입하기</Link>
        </div>
      </div>
    </div>
  );
}
