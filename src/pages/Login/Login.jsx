import { Link } from 'react-router-dom'
import { useState } from 'react';
import "./Login.css";

function InputHolder({ placeholder, type}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="login-input-wrap">
      <input
        className={`login-input ${inputValue ? "filled" : ""}`} // 값이 있으면 filled 클래스 추가
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder} // 기본 제공 placeholder 사용
      />
    </div>
  );
}

export default function Login() {
    return(
    <div className="login-total-wrap">
      <div className="login-total-contents-wrap">
        <div className="icon-login-input-wrap">
          {/* 아이콘 및 로그인 입력 */}
          <h1 className='logo-design'>
            OutfitMate 
          </h1>
          <form className="login-form-wrap">
            <InputHolder
              placeholder={"전화번호, 사용자 이름 또는 이메일"}
              type={"text"}/>
            <InputHolder
            placeholder={"비밀번호"}
            type={"password"}/>

            {/* 버튼 */}
            <Link to="/Main" className='login-button'>로그인</Link>

          </form>
        </div>

        {/* 가입하기 */}
        <div className="login-sign-up-wrap">
            <p>
            계정이 없으신가요?
            </p>
            <Link to="/signup">가입하기</Link>
        </div>
      </div>
    </div>
    );
}