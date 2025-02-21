import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 회원가입 요청 함수
  const handleSignup = async () => {
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/member/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
      setErrorMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-total-wrap">
      <div className="signup-total-contents-wrap">
        <h1 className="register-logo-design">OutfitMate</h1>
        <form className="signup-form-wrap" onSubmit={(e) => e.preventDefault()}>
          <input
            className="signup-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="button" className="signup-button" onClick={handleSignup}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
